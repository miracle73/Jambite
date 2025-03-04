import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import React from "react";
import { BackButton, EditBioIcon, PenEditIcon } from "../../assets/svg";

const settings = () => {
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "#FFFFFF", paddingTop: 70 }}
    >
      <View
        style={{
          flexDirection: "row",
          gap: 4,
          marginHorizontal: 20,
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <BackButton />
        <Text style={styles.firstText}>Profile</Text>
      </View>
      <View style={styles.firstContainer}>
        <View
          style={{
            flexDirection: "row",
            gap: 6,
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <View style={styles.circularContainer}></View>
          <View>
            <Text style={styles.secondText}>Ogbonnaya Daniel Kalu</Text>
            <Text style={styles.secondText}>@8762333</Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <PenEditIcon />
        </View>
      </View>
      <View style={styles.secondContainer}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-start",
            gap: 2,
            alignItems: "center",
          }}
        >
          <EditBioIcon />
          <View>
            <Text style={styles.thirdText}>Edit My Bio</Text>
            <Text
              style={[styles.thirdText, { fontSize: 15, fontWeight: "500" }]}
            >
              Update the personal profile
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  firstText: {
    fontSize: 20,
    color: "#181D27",
    fontWeight: "700",
  },
  secondText: {
    fontSize: 15,
    color: "#FFFFFF",
    fontWeight: "700",
  },
  thirdText: {
    fontSize: 20,
    color: "#00052D",
    fontWeight: "700",
  },
  firstContainer: {
    height: 300,
    backgroundColor: "#0F065E",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: 40,
  },
  circularContainer: {
    backgroundColor: "#FFFFFF",
    height: 78,
    width: 78,
    borderRadius: 40,
  },
  secondContainer: {
    borderWidth: 1,
    borderColor: "#00052D",
    backgroundColor: "#FFFFFF",
    padding: 20,
    marginHorizontal: 20,
    marginTop: 40,
    borderRadius: 15,
  },
});

export default settings;
