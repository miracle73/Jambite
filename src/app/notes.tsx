import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { BackArrow, M } from "../../assets/svg";

const notes = () => {
  const [selectedText, setSelectedText] = useState("Subjects");
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#FFFFFF",
      }}
    >
      <ScrollView style={{}}>
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
                marginTop: 5,
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
        </View>
      </ScrollView>
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
});
export default notes;
