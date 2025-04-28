import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import { BackArrow } from "../../assets/svg";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useRouter } from "expo-router";
import { useLocalSearchParams } from "expo-router";
import {
  useGetTopicContentDetailsQuery,
  TopicContent,
} from "../components/services/userService";
import { RootState } from "../components/redux/store";
import { useSelector } from "react-redux";
import Toast from "react-native-toast-message";

const subjectNote = () => {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const { subjectName, id } = useLocalSearchParams();
  const token = useSelector((state: RootState) => state.auth.token);
  const { data, isSuccess, isLoading, isError } =
    useGetTopicContentDetailsQuery({
      topic_id: Number(id),
      token: token || "",
    });

  const [topic, setTopic] = useState<TopicContent | undefined>();

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
      setTopic(data);
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
            paddingHorizontal: 20,
            justifyContent: "flex-start",
            flex: 1,
          }}
        >
          <View
            style={{
              marginBottom: 10,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <TouchableOpacity onPress={() => router.back()}>
              <BackArrow />
            </TouchableOpacity>
            <Text style={styles.firstText}>Note On {subjectName}</Text>

            <TouchableOpacity
              style={styles.secondContainer}
              onPress={() => setShowModal(!showModal)}
            >
              <Text
                style={{ color: "#00052D", fontSize: 15, fontWeight: "600" }}
              >
                Study Objectives
              </Text>
            </TouchableOpacity>
          </View>
          {showModal && (
            <View style={styles.firstContainer}>
              <Text style={[styles.fourthText, { marginBottom: 5 }]}>
                {/* By the end of this topic, you should be able to: */}
              </Text>
            </View>
          )}
          <View>
            <Text style={styles.secondText}>{topic?.topic_content.title}</Text>
            <Text style={styles.secondText}>
              {topic?.topic_content.description}
            </Text>
            <Text style={styles.secondText}>
              {topic?.topic_content.content}
            </Text>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};
//
const styles = StyleSheet.create({
  secondContainer: {
    backgroundColor: "#FFFFFF",
    borderWidth: 2,
    borderColor: "#00052D",
    borderRadius: 10,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    paddingHorizontal: 5,
    paddingVertical: 10,
  },
  firstContainer: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 5,
    borderRadius: 15,
    elevation: 20,
    shadowOffset: {
      height: 20,
      width: 20,
    },
    shadowOpacity: 0.6,
    shadowRadius: 4,
    shadowColor: "#333333",
    marginBottom: 10,
  },
  firstText: {
    fontSize: 15,
    color: "#0F065E",
    fontWeight: "800",
  },
  secondText: {
    fontSize: 15,
    color: "#000000",
    fontWeight: "600",
    textAlign: "justify",
  },
  thirdText: {
    fontSize: 15,
    color: "#000000",
    fontWeight: "600",
    textDecorationLine: "underline",
  },
  fourthText: {
    fontSize: 9,
    color: "#000000",
    fontWeight: "600",
  },
});

export default subjectNote;
