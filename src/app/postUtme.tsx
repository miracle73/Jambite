import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import React, { useState } from "react";
import { BackArrow } from "../../assets/svg";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";

const postUtme = () => {
  const router = useRouter();
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
          <View style={{ marginBottom: 70 }}>
            <BackArrow />
          </View>
          <Text style={[styles.firstText, { textAlign: "center" }]}>
            POST UTME
          </Text>
          <Text style={[styles.secondText, { textAlign: "center" }]}>
            Study and prepare ahead for
          </Text>
          <View style={styles.firstContainer}>
            <RNPickerSelect
              onValueChange={(value) => setSelectedUniversity(value)}
              items={university}
              placeholder={{ label: "Select University", value: null }}
              useNativeAndroidPickerStyle={false}
              style={pickerSelectStyles}
              value={selectedUniversity}
              Icon={() => (
                <MaterialIcons
                  name="keyboard-arrow-down"
                  size={24}
                  color="#0F065E"
                  style={{ alignSelf: "center" }}
                />
              )}
            />
            <View style={{ marginTop: 20 }} />
            <RNPickerSelect
              onValueChange={(value) => setSelectedFaculty(value)}
              items={faculty}
              placeholder={{ label: "Select Faculty", value: null }}
              useNativeAndroidPickerStyle={false}
              style={pickerSelectStyles}
              value={selectedFaculty}
              Icon={() => (
                <MaterialIcons
                  name="keyboard-arrow-down"
                  size={24}
                  color="#0F065E"
                  style={{ alignSelf: "center" }}
                />
              )}
            />
            <View style={{ marginTop: 20 }} />
            <RNPickerSelect
              onValueChange={(value) => setSelectedTime(value)}
              items={time}
              placeholder={{ label: "Select Time", value: null }}
              useNativeAndroidPickerStyle={false}
              style={pickerSelectStyles}
              value={selectedTime}
              Icon={() => (
                <MaterialIcons
                  name="keyboard-arrow-down"
                  size={24}
                  color="#0F065E"
                  style={{ alignSelf: "center" }}
                />
              )}
            />
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
      </KeyboardAwareScrollView>
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
