import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { BackArrow } from "../../../assets/svg";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useRouter } from "expo-router";

const pastQuestion = () => {
  const router = useRouter();
  const pastQuestionSubjects = [
    "MATHEMATICS",
    "ENGLISH LANGUAGE",
    "CHEMISTRY",
    "BIOLOGY",
    "PHYSICS",
    "LITERATURE IN ENGLISH",
    "CIVIC EDUCATION",
    "ECONOMICS",
  ];
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "#FFFFFF", paddingTop: 50 }}
    >
      <KeyboardAwareScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={{
            justifyContent: "flex-start",
            flex: 1,
          }}
        >
          <View
            style={{
              paddingHorizontal: 20,
              justifyContent: "flex-start",
              gap: 4,
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <TouchableOpacity onPress={() => router.back()}>
              <BackArrow />
            </TouchableOpacity>
            <Text style={[styles.firstText, { textAlign: "center" }]}>
              PAST QUESTIONS
            </Text>
          </View>

          <Text
            style={[
              styles.secondText,
              { marginLeft: 10, paddingHorizontal: 20 },
            ]}
          >
            Go through the previous questions to prepare fully for your exams
          </Text>

          <ScrollView style={{}}>
            {pastQuestionSubjects.map((subject, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.fourthContainer,
                  index === pastQuestionSubjects.length - 1 && {
                    marginBottom: 20,
                  },
                ]}
                onPress={() => router.push("/pastQuestion2")}
              >
                <Text style={styles.thirdText}>{subject}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  fourthContainer: {
    backgroundColor: "#FFFFFF",
    padding: 10,
    marginTop: 20,
    marginHorizontal: 20,
    borderRadius: 15,
    elevation: 10,
    shadowOffset: {
      height: 10,
      width: 10,
    },
    shadowOpacity: 0.6,
    shadowRadius: 4,
    shadowColor: "#333333",
  },
  firstText: {
    fontSize: 20,
    color: "#0F065E",
    fontWeight: "800",
  },
  secondText: {
    fontSize: 12,
    color: "#0F065E",
    fontWeight: "700",
  },
  thirdText: {
    fontSize: 20,
    color: "#0F065E",
    fontWeight: "800",
  },

  fourthText: {
    fontSize: 15,
    color: "#B5B2B2",
    fontWeight: "600",
    marginTop: 20,
  },
});

export default pastQuestion;
