import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { BackArrow } from "../../assets/svg";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useRouter } from "expo-router";
import { useLocalSearchParams } from "expo-router";

const subjectNote = () => {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const { subjectName } = useLocalSearchParams();
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
          <View
            style={{
              marginBottom: 10,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <TouchableOpacity onPress={() => router.back()}>
              <BackArrow />
            </TouchableOpacity>
            <Text style={styles.firstText}>Note On {subjectName}</Text>

            <TouchableOpacity
              style={styles.secondContainer}
              onPress={() => setShowModal(!showModal)}
            >
              <Text
                style={{ color: "#00052D", fontSize: 15, fontWeight: "600" }}
              >
                Study Objectives
              </Text>
            </TouchableOpacity>
          </View>
          {showModal && (
            <View style={styles.firstContainer}>
              <Text style={[styles.fourthText, { marginBottom: 5 }]}>
                By the end of this topic, you should be able to:
              </Text>
              <Text style={styles.fourthText}>
                1. Identify different types of numbers and their properties.
              </Text>
              <Text style={styles.fourthText}>
                2. Convert numbers between different bases.
              </Text>
              <Text style={styles.fourthText}>
                3. Perform operations with indices, surds, and logarithms.
              </Text>
              <Text style={styles.fourthText}>
                4. Apply the laws of indices and logarithms in problem-solving.
              </Text>
              <Text style={styles.fourthText}>
                5.Understand sequences and series, including arithmetic and
                geometric progressions.
              </Text>
            </View>
          )}
          <View>
            <Text style={styles.secondText}>Scalars: A Detailed Overview</Text>
            <Text style={styles.secondText}>Definition</Text>
            <Text style={styles.secondText}>
              A scalar is a quantity that is fully characterized by a single
              numerical value, often accompanied by a unit of measure, and it
              does not have a directional component. Scalars are fundamental in
              various disciplines, including physics, mathematics, engineering,
              and computer science
            </Text>
            <Text style={styles.secondText}>Characteristics of Scalars</Text>
            <Text style={styles.secondText}>
              1. Only: Scalars are defined solely by their magnitude. Unlike
              vectors, scalars do not involve direction.
            </Text>
            <Text style={styles.secondText}>
              2. Addition and Subtraction: Scalars can be added or subtracted by
              simple arithmetic operations. For example, adding two temperatures
              (20°C + 30°C = 50°C) or two masses (5 kg + 10 kg = 15 kg)
            </Text>
            <Text style={styles.secondText}>
              2. Addition and Subtraction: Scalars can be added or subtracted by
              simple arithmetic operations. For example, adding two temperatures
              (20°C + 30°C = 50°C) or two masses (5 kg + 10 kg = 15 kg)
            </Text>
            <Text style={styles.secondText}>
              Multiplication and Division: Scalars can be multiplied or divided,
              yielding another scalar. For instance, dividing a distance by time
              gives speed, a scalar quantity. Invariance under Coordinate
            </Text>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};
//
const styles = StyleSheet.create({
  secondContainer: {
    backgroundColor: "#FFFFFF",
    borderWidth: 2,
    borderColor: "#00052D",
    borderRadius: 10,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    paddingHorizontal: 5,
    paddingVertical: 10,
  },
  firstContainer: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 5,
    borderRadius: 15,
    elevation: 20,
    shadowOffset: {
      height: 20,
      width: 20,
    },
    shadowOpacity: 0.6,
    shadowRadius: 4,
    shadowColor: "#333333",
    marginBottom: 10,
  },
  firstText: {
    fontSize: 15,
    color: "#0F065E",
    fontWeight: "800",
  },
  secondText: {
    fontSize: 15,
    color: "#000000",
    fontWeight: "600",
    textAlign: "justify",
  },
  thirdText: {
    fontSize: 15,
    color: "#000000",
    fontWeight: "600",
    textDecorationLine: "underline",
  },
  fourthText: {
    fontSize: 9,
    color: "#000000",
    fontWeight: "600",
  },
});

export default subjectNote;
