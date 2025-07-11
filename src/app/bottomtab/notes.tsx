import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import { B, BackArrow, M } from "../../../assets/svg";
import { useRouter } from "expo-router";
import DropDownPicker from "react-native-dropdown-picker";
import {
  useGetAllSubjectsQuery,
  SubjectResponse1,
  SubjectResponse2,
  SubjectResponse3,
  useGetAllSubjectsWithTopicsQuery,
} from "../../components/services/userService";
import { RootState } from "../../components/redux/store";
import { useSelector } from "react-redux";
import Toast from "react-native-toast-message";
import ProtectedRoute from "../../components/ProtectedRoute";

const notes = () => {
  const router = useRouter();
  const [selectedText, setSelectedText] = useState("Subjects");
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("");
  const token = useSelector((state: RootState) => state.auth.token);
  const [Subjects, setSubjects] = useState<SubjectResponse1[]>([]);
  const [Subjects2, setSubjects2] = useState<SubjectResponse3>();
  const [subjectTopics, setSubjectTopics] = useState<
    Record<string, SubjectResponse2[]>
  >({});

  const { data, isSuccess, isLoading, isError } = useGetAllSubjectsQuery({
    token: token || "",
  });
  const {
    data: subjectsWithTopics,
    isSuccess: isTopicsSuccess,
    isLoading: isTopicsLoading,
    isError: isTopicsError,
  } = useGetAllSubjectsWithTopicsQuery({
    token: token || "",
  });
  useEffect(() => {
    if (isTopicsSuccess && subjectsWithTopics) {
      setSubjects2(subjectsWithTopics);
    }
  }, [token, isTopicsSuccess, subjectsWithTopics]);
  useEffect(() => {
    if (isSuccess && data) {
      setSubjects(Array.isArray(data) ? data : [data]);
    }
  }, [token, isSuccess, data]);

  useEffect(() => {
    // if (!token) {
    //   Toast.show({
    //     type: "error",
    //     text1: "Error",
    //     text2: "Access token is invalid, go back and login again",
    //   });
    //   router.push("/signin");
    //   return;
    // }

    if (isSuccess && data) {
      setSubjects(Array.isArray(data) ? data : [data]);
    }

    if (isError) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Failed to fetch topics.",
      });
    }
  }, [token, isSuccess, data, isError, router]);
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

  console.log(subjectTopics);
  if (isLoading || isTopicsLoading) {
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
      <View
        style={{
          flex: 1,
          backgroundColor: "#FFFFFF",
          paddingBottom: 50,
        }}
      >
        <View style={{}}>
          <View
            style={{
              backgroundColor: "#0AA2D30F",
              paddingHorizontal: 20,
              paddingTop: 40,
              paddingBottom: 20,
            }}
          >
            <TouchableOpacity onPress={() => router.push("/bottomtab/home")}>
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
            <ScrollView showsVerticalScrollIndicator={false} style={{}}>
              {/* {Subjects.map((subject, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.secondContainer,
                  index === Subjects.length - 1 && { marginBottom: 170 },
                ]}
                onPress={() =>
                  router.push({
                    pathname: "/subject",
                    params: {
                      subjectName: subject.name,
                      subjectId: subject.id,
                    },
                  })
                }
              >
                <View style={styles.secondSmallContainer}>
                  <Text
                    style={{
                      fontSize: 84,
                      fontWeight: "700",
                      color: "white",
                    }}
                  >
                    {subject.name.charAt(0)}
                  </Text>
                </View>
                <View style={{ width: "60%" }}>
                  <Text style={styles.secondText}>{subject.name}</Text>

                  {subjectTopics &&
                    subjectTopics[subject.id]?.map(
                      (topic: SubjectResponse2, topicIndex: number) => (
                        <Text key={topicIndex + 1} style={styles.thirdText}>
                          {topic.title}
                        </Text>
                      )
                    )}
                </View>
              </TouchableOpacity>
            ))} */}
              {Subjects2 &&
                Subjects2.subjects.map((subject, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.secondContainer,
                      index === Subjects2.subjects.length - 1 && {
                        marginBottom: 170,
                      },
                    ]}
                    onPress={() =>
                      router.push({
                        pathname: "/subject",
                        params: {
                          subjectName: subject.name,
                          subjectId: subject.id,
                        },
                      })
                    }
                  >
                    <View style={styles.secondSmallContainer}>
                      <Text
                        style={{
                          fontSize: 84,
                          fontWeight: "700",
                          color: "white",
                        }}
                      >
                        {subject.name.charAt(0)}
                      </Text>
                    </View>
                    <View style={{ width: "60%" }}>
                      <Text style={styles.secondText}>{subject.name}</Text>

                      {subject.topics.slice(0, 3).map((topic, index) => (
                        <Text key={index} style={styles.thirdText}>
                          {topic}
                        </Text>
                      ))}
                    </View>
                  </TouchableOpacity>
                ))}
            </ScrollView>
          )}
          {selectedText === "Exercises" && (
            <>
              <Text style={styles.fourthText}>
                Solve Word problem questions
              </Text>
              <Text style={styles.fifthText}>Solve Word problem questions</Text>
              <View style={styles.thirdContainer}>
                <DropDownPicker
                  open={open}
                  value={selectedSubject}
                  items={Subjects.map((subject) => ({
                    label: subject.name,
                    value: subject.id.toString(),
                  }))}
                  setOpen={setOpen}
                  setValue={(value) => setSelectedSubject(value)}
                  placeholder="Select Subject"
                  style={pickerSelectStyles.inputIOS}
                  dropDownContainerStyle={pickerSelectStyles.dropDownContainer}
                />
              </View>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  const selected = Subjects.find(
                    (subject) => String(subject.id) === selectedSubject
                  );
                  if (selected) {
                    router.push({
                      pathname: "/exerciseTopics",
                      params: {
                        name: selected.name,
                        id: String(selected.id),
                      },
                    });
                  }
                }}
              >
                <Text style={styles.sixthText}>Begin</Text>
              </TouchableOpacity>
            </>
          )}
          {selectedText === "Past Questions" && (
            <>
              <ScrollView style={{}} showsVerticalScrollIndicator={false}>
                {Subjects.map((subject, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.fourthContainer,
                      index === Subjects.length - 1 && {
                        marginBottom: 170,
                      },
                    ]}
                    onPress={() => {
                      router.push({
                        pathname: "/pastQuestion2",
                        params: { subjectName: subject.name, id: subject.id },
                      });
                    }}
                  >
                    <Text style={styles.seventhText}>{subject.name}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </>
          )}
        </View>
      </View>
    </ProtectedRoute>
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
