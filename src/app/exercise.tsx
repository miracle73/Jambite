import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import { BackArrow } from "../../assets/svg";
import {
  useGetQuestionByTopicQuery,
  SubjectResponse,
} from "../components/services/userService";
import { useRouter } from "expo-router";
import { useLocalSearchParams } from "expo-router";
import { RootState } from "../components/redux/store";
import { useSelector } from "react-redux";
import Toast from "react-native-toast-message";
import ProtectedRoute from "../components/ProtectedRoute";

const exercise = () => {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const { name, id, topicId, topicName } = useLocalSearchParams();
  const token = useSelector((state: RootState) => state.auth.token);
  const user = useSelector((state: RootState) => state.user.user);
  const { data, isSuccess, isLoading, isError } = useGetQuestionByTopicQuery({
    topic_id: Number(topicId),
    token: token || "",
  });
  const [questions, setQuestions] = useState<SubjectResponse[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [selectedAnswers, setSelectedAnswers] = useState<
    Record<number, string>
  >({});
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<number>>(
    new Set()
  );
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
          No questions available for this topic.
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
      <View
        style={{
          flex: 1,
          backgroundColor: "#FFFFFF",
        }}
      >
        <ScrollView style={{}} showsVerticalScrollIndicator={false}>
          <View
            style={{
              paddingBottom: 30,
            }}
          >
            {questions && questions.length >= currentQuestion && (
              <>
                <View
                  style={{
                    backgroundColor: "#0AA2D30F",
                    paddingHorizontal: 20,
                    paddingTop: 40,
                    paddingBottom: 20,
                  }}
                >
                  <TouchableOpacity onPress={() => router.back()}>
                    <BackArrow />
                  </TouchableOpacity>

                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: "600",
                      marginTop: 50,
                      color: "#0F065E",
                      paddingLeft: 10,
                    }}
                  >
                    {topicName} Exercise
                  </Text>
                </View>
                <View style={{ paddingHorizontal: 20, marginTop: 40 }}>
                  <Text style={styles.firstText}>
                    Question {currentQuestion}
                  </Text>
                  <Text style={styles.secondText}>
                    {questions[currentQuestion - 1]?.question_text}
                  </Text>
                  <View style={{ marginVertical: 20, paddingHorizontal: 10 }}>
                    {["a", "b", "c", "d", "e"].map((optionKey) => {
                      const optionValue =
                        questions[currentQuestion - 1]?.[
                          optionKey as keyof SubjectResponse
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
                  <TouchableOpacity
                    onPress={() => setShowModal(!showModal)}
                    style={{ marginBottom: 20 }}
                  >
                    <Text style={styles.thirdText}>Show solutions</Text>
                  </TouchableOpacity>
                </View>
                {showModal && (
                  <View style={styles.secondContainer}>
                    <Text style={styles.fourthText}>Answer</Text>
                    <Text style={styles.fifthText}>
                      {questions[currentQuestion - 1]?.correct_answer}
                    </Text>
                  </View>
                )}
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginHorizontal: 20,
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
        </ScrollView>
      </View>
    </ProtectedRoute>
  );
};

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
  firstText: {
    fontSize: 12,
    color: "#0F065E",
    fontWeight: "700",
  },
  secondText: {
    fontSize: 17,
    color: "#0F065E",
    fontWeight: "700",
  },
  thirdText: {
    fontSize: 10,
    color: "#000000",
    fontWeight: "700",
    textAlign: "right",
  },
  fourthText: {
    fontSize: 10,
    color: "#000000",
    fontWeight: "700",
    textAlign: "center",
  },
  fifthText: {
    fontSize: 17,
    color: "#0F065E",
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 5,
  },

  secondContainer: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    paddingVertical: 5,
    marginHorizontal: 20,
    marginTop: 10,
    marginBottom: 20,
    borderRadius: 15,
    elevation: 20,
    shadowOffset: {
      height: 20,
      width: 20,
    },
    shadowOpacity: 0.6,
    shadowRadius: 4,
    shadowColor: "#333333",
  },
  thirdContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    gap: 10,
    alignItems: "center",
    marginBottom: 10,
  },
  fourthContainer: {
    borderWidth: 2,
    borderColor: "#0F065E",
    height: 16,
    width: 16,
    borderRadius: 10,
  },

  sixthText: {
    fontSize: 14,
    color: "#FFFFFF",
    fontWeight: "900",
    textAlign: "center",
  },
});

export default exercise;
