import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  TextInput,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { BackArrow } from "../../assets/svg";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useRouter } from "expo-router";
import {
  useGetSubjectTopicQuery,
  SubjectResponse2,
} from "../components/services/userService";
import { RootState } from "../components/redux/store";
import { useSelector } from "react-redux";
import Toast from "react-native-toast-message";

const subject = () => {
  const router = useRouter();

  const token = useSelector((state: RootState) => state.auth.token);
  const { data, isSuccess, isLoading, isError } = useGetSubjectTopicQuery({
    subject_id: 1,
    token: token || "",
  });

  const [topics, setTopics] = useState<SubjectResponse2[] | undefined>([]);

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
      setTopics(data);
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
            justifyContent: "flex-start",
            flex: 1,
          }}
        >
          <View
            style={{
              marginBottom: 20,
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
              MATHEMATICS
            </Text>
          </View>

          <Text
            style={[
              styles.secondText,
              { textAlign: "center", paddingHorizontal: 20 },
            ]}
          >
            Do well to track all courses which are aligned with Jamb syllables
          </Text>

          <ScrollView style={{}}>
            {topics?.map((topic, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.fourthContainer,
                  index === topics.length - 1 && {
                    marginBottom: 20,
                  },
                ]}
                onPress={() => router.push("/subjectNote")}
              >
                <Text style={styles.thirdText}>{topic.title}</Text>
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
    borderRadius: 15,
    marginHorizontal: 20,
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

export default subject;
