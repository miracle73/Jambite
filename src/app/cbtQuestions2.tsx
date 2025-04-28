import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import { BackArrow } from "../../assets/svg";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useRouter } from "expo-router";
import {
  useGetQuestionBySubjectQuery,
  useGetAQuestionQuery,
  GetAQuestion,
} from "../components/services/userService";
import { RootState } from "../components/redux/store";
import { useSelector } from "react-redux";
import Toast from "react-native-toast-message";
import { useLocalSearchParams } from "expo-router";

const cbtQuestion2 = () => {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(1);

  const [selectedAnswers, setSelectedAnswers] = useState<
    Record<number, string>
  >({});

  const [answeredQuestions, setAnsweredQuestions] = useState<Set<number>>(
    new Set()
  );
  const { id, name } = useLocalSearchParams();

  const token = useSelector((state: RootState) => state.auth.token);

  // Handle option selection
  const handleOptionSelect = (option: string): void => {
    setSelectedAnswers((prev: Record<number, string>) => ({
      ...prev,
      [currentQuestion]: option,
    }));
    setAnsweredQuestions(
      (prev) => new Set([...(prev as Set<number>), currentQuestion])
    );
  };

  const { data, isSuccess, isLoading, isError } = useGetAQuestionQuery({
    q_id: Number(id),
    token: token || "",
  });
  console.log(data, 6788);
  const [questions, setQuestions] = useState<GetAQuestion | null>(null);

  useEffect(() => {
    if (!token) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Access token is invalid, go back and login again",
      });
      router.push("/signin");
      return;
    }

    if (isSuccess && data) {
      setQuestions(data);
    }

    if (isError) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Failed to fetch questions.",
      });
    }
  }, [token, isSuccess, data, isError, router]);

  if (isLoading) {
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
        }}
      >
        <ActivityIndicator color="#000000" size="large" />
      </View>
    );
  }

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "#FFFFFF", paddingVertical: 50 }}
    >
      <KeyboardAwareScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={{
            paddingHorizontal: 20,
            justifyContent: "flex-start",
            flex: 1,
          }}
        >
          {questions && (
            <>
              <View
                style={{
                  marginBottom: 30,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    gap: 2,
                    alignItems: "center",
                  }}
                >
                  <TouchableOpacity onPress={() => router.back()}>
                    <BackArrow />
                  </TouchableOpacity>
                  <Text style={styles.firstText}>{name}</Text>
                </View>
                <TouchableOpacity
                  style={styles.secondContainer}
                  onPress={() => router.back()}
                >
                  <Text
                    style={{
                      color: "#FFFFFF",
                      fontSize: 15,
                      fontWeight: "600",
                    }}
                  >
                    {/* {questions?.year} */}
                    Done
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={styles.firstContainer}>
                <Text style={styles.secondText}>
                  Question {currentQuestion}
                </Text>
                <Text style={styles.thirdText}>{questions?.question_text}</Text>
              </View>

              <View style={{ marginVertical: 20, paddingHorizontal: 10 }}>
                {["a", "b", "c", "d", "e"].map((optionKey) => {
                  const optionValue =
                    questions?.[optionKey as keyof GetAQuestion];
                  if (!optionValue) return null;

                  return (
                    <TouchableOpacity
                      key={optionKey}
                      style={styles.thirdContainer}
                      onPress={() =>
                        handleOptionSelect(optionKey.toUpperCase())
                      }
                    >
                      <Text style={styles.fourthText}>
                        {optionKey.toUpperCase()}
                      </Text>
                      <View
                        style={[
                          styles.fourthContainer,
                          selectedAnswers[currentQuestion] ===
                          optionKey.toUpperCase()
                            ? styles.selectedOption
                            : {},
                        ]}
                      />
                      <Text style={styles.fourthText}>{optionValue}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>

              <TouchableOpacity onPress={() => setShowModal(!showModal)}>
                <Text style={styles.eighthText}>Show solutions</Text>
              </TouchableOpacity>

              {showModal && (
                <View style={styles.fifthContainer}>
                  <Text style={[styles.ninthText, { marginBottom: 5 }]}>
                    {questions?.correct_answer}
                  </Text>
                </View>
              )}
            </>
          )}
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};
//
const styles = StyleSheet.create({
  selectedOption: {
    backgroundColor: "#0F065E",
  },
  roundedContainer: {
    borderWidth: 2,
    borderColor: "#0F065E",
    height: 26,
    width: 26,
    borderRadius: 15,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  disabledButton: {
    opacity: 0.5,
  },
  shadedRoundedContainer: {
    backgroundColor: "#00052D9C",
    borderWidth: 2,
    borderColor: "#0F065E",
    height: 26,
    width: 26,
    borderRadius: 15,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  firstButton: {
    borderColor: "#0F065E",
    borderWidth: 1,
    height: 44,
    width: "45%",
    borderRadius: 30,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  secondButton: {
    backgroundColor: "#0F065E",
    borderColor: "#0F065E",
    borderWidth: 1,
    height: 44,
    width: "45%",
    borderRadius: 30,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  firstContainer: {
    marginTop: 20,
    backgroundColor: "#0F065E",
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  secondContainer: {
    backgroundColor: "#0F065E",
    borderRadius: 30,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 10,
  },
  thirdContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    gap: 10,
    alignItems: "center",
  },
  fourthContainer: {
    borderWidth: 2,
    borderColor: "#0F065E",
    height: 16,
    width: 16,
    borderRadius: 10,
  },
  fifthContainer: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 15,
    elevation: 20,
    shadowOffset: {
      height: 20,
      width: 20,
    },
    shadowOpacity: 0.6,
    shadowRadius: 4,
    shadowColor: "#333333",
    marginBottom: 30,
  },
  firstText: {
    fontSize: 15,
    color: "#0F065E",
    fontWeight: "800",
  },
  secondText: {
    fontSize: 10,
    color: "#FFFFFF",
    fontWeight: "700",
    textAlign: "center",
  },
  thirdText: {
    fontSize: 17,
    color: "#FFFFFF",
    fontWeight: "700",
  },

  fourthText: {
    fontSize: 17,
    color: "#0F065E",
    fontWeight: "700",
  },

  fifthText: {
    fontSize: 10,
    color: "#000000",
    fontWeight: "700",
    textAlign: "right",
    marginBottom: 30,
  },
  sixthText: {
    fontSize: 12,
    color: "#000000",
    fontWeight: "700",
    textAlign: "center",
    marginVertical: 10,
  },
  seventhText: {
    fontSize: 12,
    color: "#000000",
    fontWeight: "700",
    textAlign: "center",
  },
  eighthText: {
    fontSize: 10,
    color: "#000000",
    fontWeight: "700",
    textAlign: "right",
    marginBottom: 10,
  },
  ninthText: {
    fontSize: 9,
    color: "#000000",
    fontWeight: "600",
  },
});

export default cbtQuestion2;
