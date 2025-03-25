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

const cbt = () => {
  const router = useRouter();
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
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
            CBT MODE
          </Text>
          <Text style={[styles.secondText, { textAlign: "center" }]}>
            Select your 4 jamb subjects
          </Text>
          <View style={styles.firstContainer}>
            <RNPickerSelect
              onValueChange={(value) => setSelectedYear(value)}
              items={year}
              placeholder={{ label: "Select Year", value: null }}
              useNativeAndroidPickerStyle={false}
              style={pickerSelectStyles}
              value={selectedYear}
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
              placeholder={{ label: "Select Time(Hours/Minutes)", value: null }}
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
            <View style={{ marginTop: 20 }} />
            <RNPickerSelect
              onValueChange={(value) => setSelectedSubject(value)}
              items={subjects}
              placeholder={{ label: "Select Subject", value: null }}
              useNativeAndroidPickerStyle={false}
              style={pickerSelectStyles}
              value={selectedSubject}
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

export default cbt;
