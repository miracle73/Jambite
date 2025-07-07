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
  Question,
} from "../components/services/userService";
import { RootState } from "../components/redux/store";
import { useSelector } from "react-redux";
import Toast from "react-native-toast-message";
import { useLocalSearchParams } from "expo-router";
import ProtectedRoute from "../components/ProtectedRoute";

const subjectPastQuestion = () => {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(1);

  const [showModal, setShowModal] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState<
    Record<number, string>
  >({});
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<number>>(
    new Set()
  );

  const { id, name } = useLocalSearchParams();
  const token = useSelector((state: RootState) => state.auth.token);
  const user = useSelector((state: RootState) => state.user.user);
  const handleOptionSelect = (option: string): void => {
    setSelectedAnswers((prev: Record<number, string>) => ({
      ...prev,
      [currentQuestion]: option,
    }));
    setAnsweredQuestions(
      (prev) => new Set([...(prev as Set<number>), currentQuestion])
    );
  };

  const handlePrevious = () => {
    setCurrentQuestion((prev) => Math.max(1, prev - 1));
  };

  const handleNext = () => {
    setCurrentQuestion((prev) => Math.min(50, prev + 1));
  };

  const { data, isSuccess, isLoading, isError } = useGetQuestionBySubjectQuery({
    subject_id: Number(id),
    token: token || "",
  });

  const [questions, setQuestions] = useState<Question[]>([]);

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
        text2: "Failed to fetch topics.",
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

  if (!isLoading && questions.length === 0) {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#FFFFFF",
        }}
      >
        <Text style={{ fontSize: 16, color: "#0F065E", fontWeight: "600" }}>
          No questions available for this subject.
        </Text>
        <TouchableOpacity
          style={{
            marginTop: 20,
            paddingHorizontal: 20,
            paddingVertical: 10,
            borderRadius: 10,
            backgroundColor: "#0F065E",
          }}
          onPress={() => router.back()}
        >
          <Text style={{ color: "#FFFFFF", fontWeight: "700" }}>Go Back</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  if (!user?.activated) {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#FFFFFF",
        }}
      >
        <Text style={{ fontSize: 16, color: "#0F065E", fontWeight: "600" }}>
          Activate your account to access this resource.
        </Text>
        <TouchableOpacity
          style={{
            marginTop: 20,
            paddingHorizontal: 20,
            paddingVertical: 10,
            borderRadius: 10,
            backgroundColor: "#0F065E",
          }}
          onPress={() => router.push("/activation")}
        >
          <Text style={{ color: "#FFFFFF", fontWeight: "700" }}>activate</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
  return (
    <ProtectedRoute>
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
            {questions && questions.length >= currentQuestion && (
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
                    <Text style={styles.firstText}>{name} </Text>
                  </View>

                  <TouchableOpacity style={styles.secondContainer}>
                    <Text
                      style={{
                        color: "#FFFFFF",
                        fontSize: 15,
                        fontWeight: "600",
                      }}
                    >
                      {questions[currentQuestion - 1]?.year}
                    </Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.firstContainer}>
                  <Text style={styles.secondText}>
                    Question {currentQuestion}
                  </Text>
                  <Text style={styles.thirdText}>
                    {questions[currentQuestion - 1]?.question_text}
                  </Text>
                </View>

                <View style={{ marginVertical: 20, paddingHorizontal: 10 }}>
                  {["a", "b", "c", "d", "e"].map((optionKey) => {
                    const optionValue =
                      questions[currentQuestion - 1]?.[
                        optionKey as keyof Question
                      ];
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
                  <Text style={styles.fifthText}>Show solutions</Text>
                </TouchableOpacity>

                {showModal && (
                  <View style={styles.fifthContainer}>
                    <Text style={[styles.sixthText, { marginBottom: 5 }]}>
                      {questions[currentQuestion - 1]?.correct_answer}
                    </Text>
                  </View>
                )}

                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <TouchableOpacity
                    style={[
                      styles.firstButton,
                      currentQuestion === 1 ? styles.disabledButton : {},
                    ]}
                    onPress={handlePrevious}
                    disabled={currentQuestion === 1}
                  >
                    <Text
                      style={{
                        fontSize: 20,
                        color: currentQuestion === 1 ? "#D9D9D9" : "#0F065E",
                        fontWeight: "700",
                      }}
                    >
                      Previous
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[
                      styles.secondButton,
                      currentQuestion === questions.length
                        ? styles.disabledButton
                        : {},
                    ]}
                    onPress={handleNext}
                    disabled={currentQuestion === questions.length}
                  >
                    <Text
                      style={{
                        fontSize: 20,
                        color: "#FFFFFF",
                        fontWeight: "700",
                      }}
                    >
                      Next
                    </Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </ProtectedRoute>
  );
};
//
const styles = StyleSheet.create({
  selectedOption: {
    backgroundColor: "#0F065E",
  },
  disabledButton: {
    opacity: 0.5,
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
    fontSize: 14,
    color: "#0F065E",
    fontWeight: "700",
  },

  fifthText: {
    fontSize: 10,
    color: "#000000",
    fontWeight: "700",
    textAlign: "right",
    marginBottom: 10,
  },
  sixthText: {
    fontSize: 9,
    color: "#000000",
    fontWeight: "600",
  },
});

export default subjectPastQuestion;
