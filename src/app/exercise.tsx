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

const exercise = () => {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#FFFFFF",
      }}
    >
      <ScrollView style={{}} showsVerticalScrollIndicator={false}>
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
                marginTop: 50,
                color: "#0F065E",
                paddingLeft: 10,
              }}
            >
              Mathematics Exercise
            </Text>
          </View>
          <View style={{ paddingHorizontal: 20, marginTop: 40 }}>
            <Text style={styles.firstText}>Question 1</Text>
            <Text style={styles.secondText}>
              What is the main aim of Cyber Security Education to
              infrastructure?
            </Text>
            <TouchableOpacity onPress={() => setShowModal(!showModal)}>
              <Text style={styles.thirdText}>Show solutions</Text>
            </TouchableOpacity>
          </View>
          {showModal && (
            <View style={styles.secondContainer}>
              <Text style={styles.fourthText}>Solutions</Text>
              <Text style={styles.fifthText}>
                What is the main aim of Cyber Security Education to
                infrastructure?
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  thirdContainer: {
    marginHorizontal: 30,
  },
  firstText: {
    fontSize: 12,
    color: "#0F065E",
    fontWeight: "700",
  },
  secondText: {
    fontSize: 17,
    color: "#0F065E",
    fontWeight: "700",
  },
  thirdText: {
    fontSize: 10,
    color: "#000000",
    fontWeight: "700",
    textAlign: "right",
  },
  fourthText: {
    fontSize: 10,
    color: "#000000",
    fontWeight: "700",
    textAlign: "center",
  },
  fifthText: {
    fontSize: 17,
    color: "#0F065E",
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 20,
  },

  secondContainer: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    paddingVertical: 5,
    marginHorizontal: 20,
    marginTop: 10,
    borderRadius: 15,
    elevation: 20,
    shadowOffset: {
      height: 20,
      width: 20,
    },
    shadowOpacity: 0.6,
    shadowRadius: 4,
    shadowColor: "#333333",
  },

  sixthText: {
    fontSize: 14,
    color: "#FFFFFF",
    fontWeight: "900",
    textAlign: "center",
  },
});

export default exercise;
