import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useState } from "react";
import { BackArrow } from "../../../../assets/svg";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useRouter } from "expo-router";
import DropDownPicker from "react-native-dropdown-picker";
import { useGetAllInstitutionsQuery } from "../../../components/services/userService";
import Toast from "react-native-toast-message";
import ProtectedRoute from "../../../components/ProtectedRoute";

const postUtme = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [selectedUniversity, setSelectedUniversity] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const { data: institutionsData, isLoading: isInstitutionsLoading } =
    useGetAllInstitutionsQuery();

  const year = [
    { label: "2020", value: "2020" },
    { label: "2021", value: "2021" },
    { label: "2022", value: "2022" },
    { label: "2023", value: "2023" },
  ];

  const university =
    institutionsData?.levels?.map((institution: any) => ({
      label: institution.name,
      value: institution.id,
    })) || [];

  const faculty = [
    { label: "Faculty of Science", value: "faculty_science" },
    { label: "Faculty of Arts", value: "faculty_arts" },
    { label: "Faculty of Engineering", value: "faculty_engineering" },
  ];
  const time = Array.from({ length: 50 }, (_, i) => ({
    label: `${i + 1}`,
    value: `${i + 1}`,
  }));
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
              POST UTME
            </Text>
            <Text style={[styles.secondText, { textAlign: "center" }]}>
              Study and prepare ahead for
            </Text>
            <View style={styles.firstContainer}>
              <DropDownPicker
                open={open}
                value={selectedUniversity}
                items={university}
                setOpen={setOpen}
                setValue={(value) => setSelectedUniversity(value)}
                placeholder="Select University"
                style={pickerSelectStyles.inputIOS}
                dropDownContainerStyle={pickerSelectStyles.dropDownContainer}
              />

              <View style={[{ marginTop: 30 }, open && { zIndex: -20 }]}>
                <DropDownPicker
                  open={open2}
                  value={selectedTime}
                  items={time}
                  setOpen={setOpen2}
                  setValue={(value) => setSelectedTime(value)}
                  placeholder="Select Question Number"
                  style={pickerSelectStyles.inputIOS}
                  dropDownContainerStyle={pickerSelectStyles.dropDownContainer}
                />
              </View>
            </View>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                if (!selectedUniversity) {
                  Toast.show({
                    type: "error",
                    text1: "Error",
                    text2: "Please select a school",
                  });

                  return;
                }
                if (!selectedTime) {
                  Toast.show({
                    type: "error",
                    text1: "Error",
                    text2: "Please select a question number",
                  });

                  return;
                }
                router.push({
                  pathname: "/cbtQuestions2",
                  params: { id: selectedTime },
                });
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

export default postUtme;
