import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { B, BackArrow, M } from "../../assets/svg";
import RNPickerSelect from "react-native-picker-select";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const notes = () => {
  const router = useRouter();
  const [selectedText, setSelectedText] = useState("Subjects");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("");
  const subjects = [
    { label: "Mathematics", value: "mathematics" },
    { label: "Biology", value: "biology" },
    { label: "Chemistry", value: "chemistry" },
    { label: "Physics", value: "physics" },
  ];
  const topics = [
    { label: "Number and Numeration", value: "number_and_numeration" },
    { label: "Introduction to Algebra", value: "introduction_to_algebra" },
    { label: "Calculus & Statistics", value: "calculus_statistics" },
    { label: "Geometry/Trigonometry", value: "geometry_trigonometry" },
  ];
  const pastQuestionSubjects = [
    "MATHEMATICS",
    "ENGLISH LANGUAGE",
    "CHEMISTRY",
    "BIOLOGY",
    "PHYSICS",
    "LITERATURE IN ENGLISH",
    "CIVIC EDUCATION",
    "ECONOMICS",
  ];

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#FFFFFF",
      }}
    >
      <View
        style={{
          paddingBottom: 30,
        }}
      >
        <View
          style={{
            backgroundColor: "#0AA2D30F",
            paddingHorizontal: 20,
            paddingTop: 40,
            paddingBottom: 20,
          }}
        >
          <BackArrow />
          <Text
            style={{
              fontSize: 15,
              fontWeight: "600",
              marginTop: 15,
              color: "#0F065E",
              paddingLeft: 10,
            }}
          >
            Study your JAMB combinatioin subjects
          </Text>
          <View style={styles.firstContainer}>
            <View
              style={
                selectedText === "Subjects"
                  ? styles.smallContainer
                  : {
                      backgroundColor: "#FFFFFF",
                      paddingHorizontal: 10,
                      paddingVertical: 10,
                    }
              }
            >
              <TouchableOpacity onPress={() => setSelectedText("Subjects")}>
                <Text style={styles.firstText}>Subjects</Text>
              </TouchableOpacity>
            </View>
            <View
              style={
                selectedText === "Exercises"
                  ? styles.smallContainer
                  : {
                      backgroundColor: "#FFFFFF",
                      paddingHorizontal: 10,
                      paddingVertical: 10,
                    }
              }
            >
              <TouchableOpacity onPress={() => setSelectedText("Exercises")}>
                <Text style={styles.firstText}>Exercises</Text>
              </TouchableOpacity>
            </View>
            <View
              style={
                selectedText === "Past Questions"
                  ? styles.smallContainer
                  : {
                      backgroundColor: "#FFFFFF",
                      paddingHorizontal: 10,
                      paddingVertical: 10,
                    }
              }
            >
              <TouchableOpacity
                onPress={() => setSelectedText("Past Questions")}
              >
                <Text style={styles.firstText}>Past Questions</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {selectedText === "Subjects" && (
          <>
            <View style={styles.secondContainer}>
              <View style={styles.secondSmallContainer}>
                <M />
              </View>
              <View style={{ width: "60%" }}>
                <Text style={styles.secondText}>MATHEMATICS</Text>
                <Text style={styles.thirdText}>Number and Numeration</Text>
                <Text style={styles.thirdText}>Introduction to Algebra</Text>
                <Text style={styles.thirdText}>Calculus & Statistics</Text>
                <Text style={styles.thirdText}>Geometry/Trigonometry</Text>
              </View>
            </View>
            <View style={styles.secondContainer}>
              <View style={styles.secondSmallContainer}>
                <B />
              </View>
              <View style={{ width: "60%" }}>
                <Text style={styles.secondText}>BIOLOGY</Text>
                <Text style={styles.thirdText}>Variety of Organisms</Text>
                <Text style={styles.thirdText}>Heredity and Variations</Text>
                <Text style={styles.thirdText}>Form and Functions</Text>
                <Text style={styles.thirdText}>Ecology</Text>
              </View>
            </View>
          </>
        )}
        {selectedText === "Exercises" && (
          <>
            <Text style={styles.fourthText}>Solve Word problem questions</Text>
            <Text style={styles.fifthText}>Solve Word problem questions</Text>
            <View style={styles.thirdContainer}>
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
              <View style={{ marginTop: 20 }} />
              <RNPickerSelect
                onValueChange={(value) => setSelectedTopic(value)}
                items={topics}
                placeholder={{ label: "Select Topic", value: null }}
                useNativeAndroidPickerStyle={false}
                style={pickerSelectStyles}
                value={selectedTopic}
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
          </>
        )}
        {selectedText === "Past Questions" && (
          <>
            <ScrollView style={{}}>
              {pastQuestionSubjects.map((subject, index) => (
                <View
                  key={index}
                  style={[
                    styles.fourthContainer,
                    index === pastQuestionSubjects.length - 1 && {
                      marginBottom: 20,
                    },
                  ]}
                >
                  <Text style={styles.seventhText}>{subject}</Text>
                </View>
              ))}
            </ScrollView>
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  secondSmallContainer: {
    backgroundColor: "#0F065E",
    height: 120,
    width: "40%",
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  firstContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 30,
    height: 60,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    marginTop: 15,
  },
  thirdContainer: {
    marginHorizontal: 30,
  },
  fourthContainer: {
    backgroundColor: "#FFFFFF",
    padding: 10,
    marginHorizontal: 20,
    marginTop: 10,
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
    fontSize: 12,
    color: "#000000",
    fontWeight: "600",
  },
  secondText: {
    fontSize: 18,
    color: "#000000",
    fontWeight: "700",
  },
  thirdText: {
    fontSize: 12,
    color: "#0F065E",
    fontWeight: "600",
    marginTop: 5,
    textDecorationLine: "underline",
  },
  fourthText: {
    fontSize: 20,
    color: "#0F065E",
    fontWeight: "800",
    textAlign: "center",
    marginTop: 30,
  },
  fifthText: {
    fontSize: 12,
    color: "#0F065E",
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 30,
  },
  seventhText: {
    fontSize: 20,
    color: "#0F065E",
    fontWeight: "800",
  },
  smallContainer: {
    backgroundColor: "#0AA2D333",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 30,
    height: 60,
    width: "30%",
  },
  secondContainer: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginTop: 20,
    borderRadius: 10,
    marginHorizontal: 20,
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
    elevation: 10,
    shadowOffset: {
      height: 10,
      width: 10,
    },
    shadowOpacity: 0.6,
    shadowRadius: 4,
    shadowColor: "#333333",
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
export default notes;
