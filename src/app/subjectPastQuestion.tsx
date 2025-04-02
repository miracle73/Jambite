import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import {
  BackArrow,
  JambiteText,
  MiniRecta,
  Recta,
  SecondJambiteText,
} from "../../assets/svg";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useRouter } from "expo-router";

const subjectPastQuestion = () => {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [topic, setTopic] = useState("");
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
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
              <Text style={styles.firstText}>MATHEMATICS </Text>
            </View>

            <TouchableOpacity style={styles.secondContainer}>
              <Text
                style={{ color: "#FFFFFF", fontSize: 15, fontWeight: "600" }}
              >
                2024
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.firstContainer}>
            <Text style={styles.secondText}>Question {currentQuestion}</Text>
            <Text style={styles.thirdText}>
              What is the main aim of Cyber Security Education to
              infrastructure?
            </Text>
          </View>
          <View
            style={{
              marginVertical: 20,
              paddingHorizontal: 10,
            }}
          >
            {["A", "B", "C", "D"].map((option) => (
              <TouchableOpacity
                key={option}
                style={styles.thirdContainer}
                onPress={() => handleOptionSelect(option)}
              >
                <Text style={styles.fourthText}>{option}</Text>
                <View
                  style={[
                    styles.fourthContainer,
                    selectedAnswers[currentQuestion] === option
                      ? styles.selectedOption
                      : {},
                  ]}
                />
                <Text style={styles.fourthText}>Important and Resillence</Text>
              </TouchableOpacity>
            ))}
          </View>
          <Text style={styles.fifthText}>Show solutions</Text>

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
                currentQuestion === 10 ? styles.disabledButton : {},
              ]}
              onPress={handleNext}
              disabled={currentQuestion === 10}
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
            {/* <View style={styles.firstButton}>
              <Text
                style={{
                  fontSize: 20,
                  color: "#0F065E",
                  fontWeight: "700",
                }}
              >
                Previous
              </Text>
            </View>
            <View style={styles.secondButton}>
              <Text
                style={{
                  fontSize: 20,
                  color: "#FFFFFF",
                  fontWeight: "700",
                }}
              >
                Next
              </Text>
            </View> */}
          </View>
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
});

export default subjectPastQuestion;
