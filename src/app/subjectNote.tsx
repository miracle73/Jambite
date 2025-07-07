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
import Markdown from "react-native-markdown-display";
import ProtectedRoute from "../components/ProtectedRoute";

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
    <ProtectedRoute>
      <SafeAreaView
        style={{ flex: 1, backgroundColor: "#FFFFFF", paddingTop: 50 }}
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
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
              >
                <TouchableOpacity onPress={() => router.back()}>
                  <BackArrow />
                </TouchableOpacity>
                <Text style={styles.firstText}>Note On {subjectName}</Text>
              </View>
              <TouchableOpacity
                style={styles.secondContainer}
                onPress={() => setShowModal(!showModal)}
              >
                <Text
                  style={{ color: "#00052D", fontSize: 10, fontWeight: "600" }}
                >
                  Study Objectives
                </Text>
              </TouchableOpacity>
            </View>
            {showModal && (
              <View style={styles.firstContainer}>
                <Text style={[styles.fourthText, { marginBottom: 5 }]}></Text>
              </View>
            )}
            <View>
              <Text style={styles.secondText}>
                {topic?.topic_content.title}
              </Text>

              {topic?.topic_content.description && (
                <Markdown style={markdownStyles}>
                  {topic.topic_content.description}
                </Markdown>
              )}
              {topic?.topic_content.content && (
                <Markdown style={markdownStyles}>
                  {topic.topic_content.content}
                </Markdown>
              )}
            </View>
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </ProtectedRoute>
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
    fontSize: 10,
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

const markdownStyles = StyleSheet.create({
  body: {
    fontSize: 15,
    color: "#000000",
    fontWeight: "400",
    textAlign: "justify",
  },
  heading1: {
    fontSize: 24,
    fontWeight: "700",
    color: "#0F065E",
    marginVertical: 10,
  },
  heading2: {
    fontSize: 20,
    fontWeight: "700",
    color: "#0F065E",
    marginVertical: 8,
  },
  heading3: {
    fontSize: 18,
    fontWeight: "600",
    color: "#0F065E",
    marginVertical: 6,
  },
  heading4: {
    fontSize: 16,
    fontWeight: "600",
    color: "#0F065E",
    marginVertical: 4,
  },
  heading5: {
    fontSize: 15,
    fontWeight: "600",
    color: "#0F065E",
    marginVertical: 2,
  },
  heading6: {
    fontSize: 15,
    fontWeight: "600",
    color: "#0F065E",
    marginVertical: 2,
  },
  paragraph: {
    fontSize: 15,
    marginVertical: 8,
    color: "#000000",
    textAlign: "justify",
  },
  link: {
    color: "#007AFF",
    textDecorationLine: "underline",
  },
  list_item: {
    flexDirection: "row",
    marginVertical: 4,
  },
  bullet_list: {
    marginLeft: 10,
  },
  ordered_list: {
    marginLeft: 10,
  },
  bullet: {
    marginRight: 8,
    fontSize: 15,
  },
  code_block: {
    backgroundColor: "#F5F5F5",
    padding: 10,
    borderRadius: 5,
    fontFamily: "monospace",
    marginVertical: 8,
  },
  blockquote: {
    borderLeftWidth: 4,
    borderLeftColor: "#0F065E",
    paddingLeft: 10,
    marginLeft: 10,
    marginVertical: 8,
    fontStyle: "italic",
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "contain",
    marginVertical: 10,
  },
});

export default subjectNote;
