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
import { B, BackArrow, M } from "../../../assets/svg";
import RNPickerSelect from "react-native-picker-select";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import DropDownPicker from "react-native-dropdown-picker";

const notes = () => {
  const router = useRouter();
  const [selectedText, setSelectedText] = useState("Subjects");
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
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
    <View
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
          <TouchableOpacity onPress={() => router.back()}>
            <BackArrow />
          </TouchableOpacity>
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
            <TouchableOpacity
              style={
                selectedText === "Subjects"
                  ? styles.smallContainer
                  : {
                      backgroundColor: "#FFFFFF",
                      paddingHorizontal: 10,
                      paddingVertical: 10,
                    }
              }
              onPress={() => setSelectedText("Subjects")}
            >
              <Text style={styles.firstText}>Subjects</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setSelectedText("Exercises")}
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
              <Text style={styles.firstText}>Exercises</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setSelectedText("Past Questions")}
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
              <Text style={styles.firstText}>Past Questions</Text>
            </TouchableOpacity>
          </View>
        </View>
        {selectedText === "Subjects" && (
          <>
            <TouchableOpacity
              style={styles.secondContainer}
              onPress={() => router.push("/subject")}
            >
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
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.secondContainer}
              onPress={() => router.push("/subject")}
            >
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
            </TouchableOpacity>
          </>
        )}
        {selectedText === "Exercises" && (
          <>
            <Text style={styles.fourthText}>Solve Word problem questions</Text>
            <Text style={styles.fifthText}>Solve Word problem questions</Text>
            <View style={styles.thirdContainer}>
              <DropDownPicker
                open={open}
                value={selectedSubject}
                items={subjects}
                setOpen={setOpen}
                setValue={(value) => setSelectedSubject(value)}
                placeholder="Select Subject"
                style={pickerSelectStyles.inputIOS}
                dropDownContainerStyle={pickerSelectStyles.dropDownContainer}
              />
              <View style={[{ marginTop: 30 }, open && { zIndex: -20 }]}>
                <DropDownPicker
                  open={open2}
                  value={selectedTopic}
                  items={topics}
                  setOpen={setOpen2}
                  setValue={(value) => setSelectedTopic(value)}
                  placeholder="Select Topic"
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
          </>
        )}
        {selectedText === "Past Questions" && (
          <>
            <ScrollView style={{}}>
              {pastQuestionSubjects.map((subject, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.fourthContainer,
                    index === pastQuestionSubjects.length - 1 && {
                      marginBottom: 20,
                    },
                  ]}
                  onPress={() => router.push("/pastQuestion2")}
                >
                  <Text style={styles.seventhText}>{subject}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </>
        )}
      </View>
    </View>
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
