import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import React, { useState, useEffect } from "react";
import { BackArrow } from "../../../../assets/svg";
import { useRouter } from "expo-router";
import {
  useGetAllSubjectsQuery,
  SubjectResponse1,
} from "../../../components/services/userService";
import { RootState } from "../../../components/redux/store";
import { useSelector } from "react-redux";
import Toast from "react-native-toast-message";
import ProtectedRoute from "../../../components/ProtectedRoute";

const cbt = () => {
  const router = useRouter();
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [open, setOpen] = useState(false);
  const [secondOpen, setSecondOpen] = useState(false);
  const [thirdOpen, setThirdOpen] = useState(false);
  const [pastQuestionSubjects, setPastQuestionSubjects] = useState<
    SubjectResponse1[]
  >([]);
  const token = useSelector((state: RootState) => state.auth.token);
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
  const year = [
    { label: "2020", value: "2020" },
    { label: "2021", value: "2021" },
    { label: "2022", value: "2022" },
    { label: "2023", value: "2023" },
  ];
  const time = [
    { label: "10 minutes", value: "10_minutes" },
    { label: "20 minutes", value: "20_minutes" },
    { label: "30 minutes", value: "30_minutes" },
    { label: "1 hour", value: "1_hour" },
  ];
  const subjects = [
    { label: "Mathematics", value: "mathematics" },
    { label: "Biology", value: "biology" },
    { label: "Chemistry", value: "chemistry" },
    { label: "Physics", value: "physics" },
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
              <TouchableOpacity onPress={() => router.push("/bottomtab/home")}>
                <BackArrow />
              </TouchableOpacity>
            </View>
            <Text style={[styles.firstText, { textAlign: "center" }]}>
              CBT MODE
            </Text>
            <Text style={[styles.secondText, { textAlign: "center" }]}>
              Select your jamb subject
            </Text>
            <View style={styles.firstContainer}>
              <DropDownPicker
                open={open}
                value={selectedYear}
                items={year}
                setOpen={setOpen}
                setValue={(value) => setSelectedYear(value)}
                placeholder="Select Year"
                style={pickerSelectStyles.inputIOS}
                dropDownContainerStyle={pickerSelectStyles.dropDownContainer}
              />

              <View style={[{ marginTop: 30 }, open && { zIndex: -20 }]}>
                <DropDownPicker
                  open={secondOpen}
                  value={selectedTime}
                  items={time}
                  setOpen={setSecondOpen}
                  setValue={(value) => setSelectedTime(value)}
                  placeholder="Select Time(Hours/Minutes)"
                  style={pickerSelectStyles.inputIOS}
                  dropDownContainerStyle={pickerSelectStyles.dropDownContainer}
                />
              </View>
              <View
                style={[
                  { marginTop: 30 },
                  (secondOpen || open) && { zIndex: -20 },
                ]}
              >
                <DropDownPicker
                  open={thirdOpen}
                  value={selectedSubject}
                  items={pastQuestionSubjects.map((subject) => ({
                    label: subject.name,
                    value: String(subject.id),
                  }))}
                  setOpen={setThirdOpen}
                  setValue={(value) => setSelectedSubject(value)}
                  placeholder="Select Subject"
                  style={pickerSelectStyles.inputIOS}
                  dropDownContainerStyle={pickerSelectStyles.dropDownContainer}
                />
              </View>
            </View>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                if (!selectedYear || !selectedTime || !selectedSubject) {
                  Toast.show({
                    type: "error",
                    text1: "Error",
                    text2: "Please select all fields.",
                  });
                  return;
                }
                const selected = pastQuestionSubjects.find(
                  (subject) => String(subject.id) === selectedSubject
                );

                if (selected) {
                  router.push({
                    pathname: "/cbtQuestions",
                    params: {
                      name: selected.name,
                      id: String(selected.id),
                    },
                  });
                } else {
                  Toast.show({
                    type: "error",
                    text1: "Invalid Selection",
                    text2: "Please select a valid subject.",
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
    marginTop: 40,
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

export default cbt;
