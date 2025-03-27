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
import { BackArrow } from "../../../assets/svg";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useRouter } from "expo-router";
import DropDownPicker from "react-native-dropdown-picker";

const postUtme = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedUniversity, setSelectedUniversity] = useState("");
  const [selectedFaculty, setSelectedFaculty] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const year = [
    { label: "2020", value: "2020" },
    { label: "2021", value: "2021" },
    { label: "2022", value: "2022" },
    { label: "2023", value: "2023" },
  ];

  const university = [
    { label: "University A", value: "university_a" },
    { label: "University B", value: "university_b" },
    { label: "University C", value: "university_c" },
  ];

  const faculty = [
    { label: "Faculty of Science", value: "faculty_science" },
    { label: "Faculty of Arts", value: "faculty_arts" },
    { label: "Faculty of Engineering", value: "faculty_engineering" },
  ];
  const time = [
    { label: "10 minutes", value: "10_minutes" },
    { label: "20 minutes", value: "20_minutes" },
    { label: "30 minutes", value: "30_minutes" },
    { label: "1 hour", value: "1_hour" },
  ];
  return (
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
                value={selectedFaculty}
                items={faculty}
                setOpen={setOpen2}
                setValue={(value) => setSelectedFaculty(value)}
                placeholder="Select Faculty"
                style={pickerSelectStyles.inputIOS}
                dropDownContainerStyle={pickerSelectStyles.dropDownContainer}
              />
            </View>

            <View
              style={[{ marginTop: 30 }, (open || open2) && { zIndex: -20 }]}
            >
              <DropDownPicker
                open={open2}
                value={selectedTime}
                items={time}
                setOpen={setOpen2}
                setValue={(value) => setSelectedTime(value)}
                placeholder="Select Time"
                style={pickerSelectStyles.inputIOS}
                dropDownContainerStyle={pickerSelectStyles.dropDownContainer}
              />
            </View>
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              router.push("/exercise");
            }}
          >
            <Text style={styles.sixthText}>Begin</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
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
