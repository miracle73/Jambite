import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import { BackArrow } from "../../assets/svg";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useRouter } from "expo-router";
import DropDownPicker from "react-native-dropdown-picker";
import Toast from "react-native-toast-message";
import { useLocalSearchParams } from "expo-router";
import {
  useGetSubjectTopicQuery,
  SubjectResponse2,
} from "../components/services/userService";
import { RootState } from "../components/redux/store";
import { useSelector } from "react-redux";
import ProtectedRoute from "../components/ProtectedRoute";

const exerciseTopics = () => {
  const [open, setOpen] = useState(false);
  const [topics, setTopics] = useState<SubjectResponse2[]>([]);
  const router = useRouter();
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const { name, id } = useLocalSearchParams();
  const [subjectId, setSubjectId] = useState("");
  const [subjectname, setSubjectname] = useState("");
  const token = useSelector((state: RootState) => state.auth.token);
  useEffect(() => {
    if (id) {
      setSubjectId(Array.isArray(id) ? id[0] : id);
    }
    if (name) {
      setSubjectname(Array.isArray(name) ? name[0] : name);
    }
  }, [id, name]);
  const { data, isSuccess, isLoading, isError } = useGetSubjectTopicQuery({
    token: token || "",
    subject_id: Number(id),
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
      setTopics(Array.isArray(data) ? data : [data]);
    }

    if (isError) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Failed to fetch topics.",
      });
    }
  }, [token, isSuccess, data, isError, router]);

  const year = [
    { label: "2020", value: "2020" },
    { label: "2021", value: "2021" },
    { label: "2022", value: "2022" },
    { label: "2023", value: "2023" },
  ];

  return (
    <ProtectedRoute>
      <SafeAreaView
        style={{ flex: 1, backgroundColor: "#FFFFFF", paddingVertical: 50 }}
      >
        {/* <KeyboardAwareScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      > */}
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          <View
            style={{
              paddingHorizontal: 20,
              justifyContent: "flex-start",
              flex: 1,
            }}
          >
            <View style={{ marginBottom: 70 }}>
              <TouchableOpacity onPress={() => router.back()}>
                <BackArrow />
              </TouchableOpacity>
            </View>
            <Text style={[styles.firstText, { textAlign: "center" }]}>
              {name} Topics
            </Text>

            <View style={styles.firstContainer}>
              <DropDownPicker
                open={open}
                value={selectedYear}
                items={topics.map((topic) => ({
                  label: topic.title,
                  value: String(topic.id),
                }))}
                setOpen={setOpen}
                setValue={(value) => setSelectedYear(value)}
                placeholder="Select Topic"
                style={pickerSelectStyles.inputIOS}
                dropDownContainerStyle={pickerSelectStyles.dropDownContainer}
              />
            </View>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                if (!selectedYear) {
                  Toast.show({
                    type: "error",
                    text1: "Error",
                    text2: "Please select a topic.",
                  });
                  return;
                }
                const selected = topics.find(
                  (topic) => String(topic.id) === selectedYear
                );
                if (selected) {
                  router.push({
                    pathname: "/exercise",
                    params: {
                      id: subjectId,
                      name: subjectname,
                      topicId: String(selected?.id),
                      topicName: selected?.title,
                    },
                  });
                }
              }}
            >
              <Text style={styles.sixthText}>Begin</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ProtectedRoute>
  );
};

const styles = StyleSheet.create({
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
  firstContainer: {
    marginHorizontal: 10,
    marginTop: 30,
  },
  button: {
    backgroundColor: "#0F065E",
    height: 40,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    borderWidth: 1,
    marginBottom: 10,
    marginTop: 40,
    marginHorizontal: 60,
  },
  sixthText: {
    fontSize: 14,
    color: "#FFFFFF",
    fontWeight: "900",
    textAlign: "center",
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#0F065E",
    color: "#000000",
    paddingRight: 30,
    alignSelf: "stretch",
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#0F065E",
    color: "#000000",
    paddingRight: 30,
    alignSelf: "stretch",
  },
  dropDownContainer: {
    borderColor: "#0F065E",
  },
  iconContainer: {
    top: "50%",
    right: 10,
    transform: [{ translateY: -12 }],
    justifyContent: "center",
    alignItems: "center",
  },
});

export default exerciseTopics;
