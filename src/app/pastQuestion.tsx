import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import { BackArrow } from "../../assets/svg";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useRouter } from "expo-router";
import {
  useGetAllSubjectsQuery,
  SubjectResponse1,
} from "../components/services/userService";
import { RootState } from "../components/redux/store";
import { useSelector } from "react-redux";
import Toast from "react-native-toast-message";

const pastQuestion = () => {
  const router = useRouter();
  const token = useSelector((state: RootState) => state.auth.token);
  const [pastQuestionSubjects, setPastQuestionSubjects] = useState<
    SubjectResponse1[]
  >([]);
  const { data, isSuccess, isLoading, isError } = useGetAllSubjectsQuery({
    token: token || "",
  });

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
      setPastQuestionSubjects(Array.isArray(data) ? data : [data]);
    }

    if (isError) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Failed to fetch topics.",
      });
    }
  }, [token, isSuccess, data, isError, router]);
  // const pastQuestionSubjects = [
  //   "MATHEMATICS",
  //   "ENGLISH LANGUAGE",
  //   "CHEMISTRY",
  //   "BIOLOGY",
  //   "PHYSICS",
  //   "LITERATURE IN ENGLISH",
  //   "CIVIC EDUCATION",
  //   "ECONOMICS",
  // ];
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
            <TouchableOpacity onPress={() => router.push("/bottomtab/home")}>
              <BackArrow />
            </TouchableOpacity>
            <Text style={[styles.firstText, { textAlign: "center" }]}>
              PAST QUESTIONS
            </Text>
          </View>

          <Text
            style={[
              styles.secondText,
              { textAlign: "center", paddingHorizontal: 30, marginTop: 10 },
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
                onPress={() => {
                  router.push({
                    pathname: "/pastQuestion2",
                    params: { subjectName: subject.name, id: subject.id },
                  });
                }}
              >
                <Text style={styles.thirdText}>{subject.name}</Text>
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
