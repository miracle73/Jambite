import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import React from "react";
import {
  OpenBookIcon,
  ProfileIcon,
  SecondJambiteText,
  SmallerJambiteText,
} from "../../assets/svg";

const home = () => {
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "#FFFFFF", paddingTop: 50 }}
    >
      <View style={{ marginHorizontal: 20 }}>
        <View
          style={{
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <SmallerJambiteText />
          <View
            style={{
              justifyContent: "flex-end",
              alignItems: "center",
              gap: 2,
              flexDirection: "row",
            }}
          >
            <ProfileIcon />
            <Text style={styles.secondText}>Ogbonnaya Daniel Kalu</Text>
          </View>
        </View>
        <View
          style={{
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <View></View>
          <View style={styles.firstContainer}>
            <View style={styles.innerContainer}>
              <Text style={styles.firstText}>Study Progress</Text>
              <View style={styles.circularContainer}></View>
            </View>
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              <Text style={styles.firstText}>100/100</Text>
            </View>
          </View>
        </View>
        <Text style={styles.thirdText}>Ready to complete study today</Text>
        <View style={styles.secondContainer}>
          <View
            style={{
              justifyContent: "center",
              alignItems: "flex-end",
            }}
          >
            <Text style={styles.fourthText}>ITED</Text>
            <SecondJambiteText />
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 20,
          }}
        >
          <View
            style={{
              width: "48%",
            }}
          >
            <View style={styles.smallContainer}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Text style={styles.fifthText}>Outline Notes</Text>
                <OpenBookIcon />
              </View>
              <Text style={styles.sixthText}>
                Read with your outline for each subject
              </Text>
            </View>
          </View>
          <View
            style={{
              width: "48%",
            }}
          >
            <View
              style={[styles.smallContainer, { backgroundColor: "#041C42B5" }]}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Text style={styles.fifthText}>POST UTME</Text>
              </View>
              <Text style={styles.sixthText}>
                Go through your prefferd instifution POST UTME questions
              </Text>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  smallContainer: {
    backgroundColor: "#0F065E",
    borderRadius: 15,
    height: 90,
    justifyContent: "center",
    alignItems: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  firstContainer: {
    backgroundColor: "#0F065EF2",
    height: 60,
    width: "85%",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  secondContainer: {
    backgroundColor: "#FFFFFF",
    height: 140,
    borderBottomWidth: 4,
    borderTopWidth: 4,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderRadius: 10,
    borderColor: "#0F065E",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  firstText: {
    fontSize: 9,
    color: "#FFFFFF",
    fontWeight: "800",
  },
  secondText: {
    fontSize: 12,
    color: "#0F065E",
    fontWeight: "800",
  },
  thirdText: {
    fontSize: 10,
    color: "#0F065E",
    fontWeight: "600",
    marginTop: 30,
    marginBottom: 10,
    textAlign: "center",
  },
  fourthText: {
    fontSize: 12,
    color: "#0F065E",
    fontWeight: "800",
  },
  fifthText: {
    fontSize: 15,
    color: "#FFFFFF",
    fontWeight: "800",
    textDecorationLine: "underline",
  },
  sixthText: {
    fontSize: 7,
    color: "#FFFFFF",
    fontWeight: "600",
  },
  innerContainer: {
    borderWidth: 2,
    borderColor: "#FFFFFF",
    borderRadius: 10,
    height: 17,
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  circularContainer: {
    height: 10,
    width: 10,
    backgroundColor: "#FFFFFF",
    borderRadius: 6,
  },
});

export default home;
