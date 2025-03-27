import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import {
  BackArrow,
  JambiteText,
  MiniRecta,
  Recta,
  SecondJambiteText,
} from "../../assets/svg";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useRouter } from "expo-router";

const cbtQuestion = () => {
  const router = useRouter();

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
              marginBottom: 30,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-start",
                gap: 2,
                alignItems: "center",
              }}
            >
              <TouchableOpacity onPress={() => router.back()}>
                <BackArrow />
              </TouchableOpacity>
              <Text style={styles.firstText}>CYBER SECURITY</Text>
            </View>
            <TouchableOpacity style={styles.secondContainer}>
              <Text
                style={{ color: "#FFFFFF", fontSize: 15, fontWeight: "600" }}
              >
                2024
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.firstContainer}>
            <Text style={styles.secondText}>Question 1</Text>
            <Text style={styles.thirdText}>
              What is the main aim of Cyber Security Education to
              infrastructure?
            </Text>
          </View>
          <View
            style={{
              marginVertical: 20,
              paddingHorizontal: 10,
            }}
          >
            <View style={styles.thirdContainer}>
              <Text style={styles.fourthText}>A</Text>
              <View style={styles.fourthContainer}></View>
              <Text style={styles.fourthText}>Important and Resillence </Text>
            </View>
            <View style={styles.thirdContainer}>
              <Text style={styles.fourthText}>B</Text>
              <View style={styles.fourthContainer}></View>
              <Text style={styles.fourthText}>Important and Resillence </Text>
            </View>
            <View style={styles.thirdContainer}>
              <Text style={styles.fourthText}>C</Text>
              <View style={styles.fourthContainer}></View>
              <Text style={styles.fourthText}>Important and Resillence </Text>
            </View>
            <View style={styles.thirdContainer}>
              <Text style={styles.fourthText}>D</Text>
              <View style={styles.fourthContainer}></View>
              <Text style={styles.fourthText}>Important and Resillence </Text>
            </View>
          </View>
          <Text style={styles.fifthText}>
            fundatmentals of cyber security 2021
          </Text>

          <Text style={styles.fourthText}>4/50</Text>
          <View
            style={{
              height: 7,
              backgroundColor: "#D9D9D9",
              borderRadius: 30,
              marginBottom: 20,
            }}
          >
            <View
              style={{
                height: 7,
                backgroundColor: "#0F065E",
                borderRadius: 30,
                width: "30%",
              }}
            ></View>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View style={styles.firstButton}>
              <Text
                style={{
                  fontSize: 20,
                  color: "#0F065E",
                  fontWeight: "700",
                }}
              >
                Previous
              </Text>
            </View>
            <View style={styles.secondButton}>
              <Text
                style={{
                  fontSize: 20,
                  color: "#FFFFFF",
                  fontWeight: "700",
                }}
              >
                Next
              </Text>
            </View>
          </View>
          <Text style={styles.sixthText}>Attempted Questions</Text>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "flex-start",
              gap: 2,
              alignItems: "center",
            }}
          >
            {Array.from({ length: 50 }, (_, i) => i + 1).map((number) => (
              <View
                key={number}
                style={
                  number <= 3
                    ? styles.shadedRoundedContainer
                    : styles.roundedContainer
                }
              >
                <Text style={styles.seventhText}>{number}</Text>
              </View>
            ))}
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};
//
const styles = StyleSheet.create({
  roundedContainer: {
    borderWidth: 2,
    borderColor: "#0F065E",
    height: 26,
    width: 26,
    borderRadius: 15,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  shadedRoundedContainer: {
    backgroundColor: "#00052D9C",
    borderWidth: 2,
    borderColor: "#0F065E",
    height: 26,
    width: 26,
    borderRadius: 15,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  firstButton: {
    borderColor: "#0F065E",
    borderWidth: 1,
    height: 44,
    width: "45%",
    borderRadius: 30,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  secondButton: {
    backgroundColor: "#0F065E",
    borderColor: "#0F065E",
    borderWidth: 1,
    height: 44,
    width: "45%",
    borderRadius: 30,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  firstContainer: {
    marginTop: 20,
    backgroundColor: "#0F065E",
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  secondContainer: {
    backgroundColor: "#0F065E",
    borderRadius: 30,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 10,
  },
  thirdContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    gap: 10,
    alignItems: "center",
  },
  fourthContainer: {
    borderWidth: 2,
    borderColor: "#0F065E",
    height: 16,
    width: 16,
    borderRadius: 10,
  },
  firstText: {
    fontSize: 15,
    color: "#0F065E",
    fontWeight: "800",
  },
  secondText: {
    fontSize: 10,
    color: "#FFFFFF",
    fontWeight: "700",
    textAlign: "center",
  },
  thirdText: {
    fontSize: 17,
    color: "#FFFFFF",
    fontWeight: "700",
  },

  fourthText: {
    fontSize: 17,
    color: "#0F065E",
    fontWeight: "700",
  },

  fifthText: {
    fontSize: 10,
    color: "#000000",
    fontWeight: "700",
    textAlign: "right",
    marginBottom: 30,
  },
  sixthText: {
    fontSize: 12,
    color: "#000000",
    fontWeight: "700",
    textAlign: "center",
    marginVertical: 10,
  },
  seventhText: {
    fontSize: 12,
    color: "#000000",
    fontWeight: "700",
    textAlign: "center",
  },
});

export default cbtQuestion;
