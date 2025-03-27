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

const scholarship = () => {
  const router = useRouter();
  const [regNumber, setRegNumber] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "#FFFFFF", paddingTop: 50 }}
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
          <View style={{ marginBottom: 20 }}>
            <TouchableOpacity onPress={() => router.back()}>
              <BackArrow />
            </TouchableOpacity>
          </View>
          <Text style={[styles.firstText, { textAlign: "center" }]}>
            Jambite Scholarship
          </Text>
          <Text style={[styles.secondText, { textAlign: "center" }]}>
            Get registered today and stand a chance to be among our lucky
            winners
          </Text>

          <Text style={[styles.fourthText]}>Full Name </Text>
          <View style={styles.firstContainer}>
            <TextInput
              style={{ flex: 1, color: "#000000" }}
              placeholderTextColor="#000000"
              placeholder={""}
              onChangeText={(text) => setFullName(text)}
              value={fullName}
            />
          </View>
          <Text style={[styles.fourthText]}>Phone Number</Text>
          <View style={styles.firstContainer}>
            <TextInput
              style={{ flex: 1, color: "#000000" }}
              placeholderTextColor="#000000"
              placeholder={""}
              onChangeText={(text) => setPhoneNumber(text)}
              value={phoneNumber}
            />
          </View>
          <Text style={[styles.fourthText]}>Email Address</Text>
          <View style={styles.firstContainer}>
            <TextInput
              style={{ flex: 1, color: "#000000" }}
              placeholderTextColor="#000000"
              placeholder={""}
              onChangeText={(text) => setEmail(text)}
              value={email}
            />
          </View>
          <Text style={[styles.fourthText]}>Reg. Number </Text>
          <View style={styles.firstContainer}>
            <TextInput
              style={{ flex: 1, color: "#000000" }}
              placeholderTextColor="#000000"
              placeholder={""}
              onChangeText={(text) => setRegNumber(text)}
              value={regNumber}
            />
          </View>

          <Text style={[styles.thirdText, { marginTop: 20 }]}>
            Pay Through Bank Transfer{" "}
          </Text>
          <Text style={[styles.thirdText, { marginTop: 0 }]}>
            Amount: N2000
          </Text>
          <Text style={[styles.thirdText, { marginTop: 0 }]}>
            Bank Name: Opay
          </Text>
          <Text style={[styles.thirdText, { marginTop: 0 }]}>
            Account Number: 8156604439
          </Text>
          <Text style={[styles.thirdText, { marginTop: 0 }]}>
            Account Name: Ogbonnaya Daniel Kalu
          </Text>
          <Text style={[styles.thirdText, { marginTop: 30 }]}>
            After making the payment chat +234 8156604439 on whatsapp stating
            your Name and Screenshot of payment.
          </Text>
          <View>
            <TouchableOpacity style={styles.secondContainer}>
              <Text
                style={{ color: "#FFFFFF", fontSize: 15, fontWeight: "600" }}
              >
                Apply Now !
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  firstContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    backgroundColor: "#D9D9D9",
    borderRadius: 10,
  },
  secondContainer: {
    backgroundColor: "#0F065E",
    borderRadius: 10,
    height: 40,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    marginHorizontal: 50,
    marginVertical: 20,
  },
  thirdContainer: {
    backgroundColor: "#D9D9D9",
    borderRadius: 10,
    height: 55,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
    paddingHorizontal: 20,
  },
  firstText: {
    fontSize: 40,
    color: "#0F065E",
    fontWeight: "900",
  },
  secondText: {
    fontSize: 15,
    color: "#B5B2B2",
    fontWeight: "600",
  },
  thirdText: {
    fontSize: 15,
    color: "#000000",
    fontWeight: "600",
    marginTop: 40,
  },

  fourthText: {
    fontSize: 15,
    color: "#B5B2B2",
    fontWeight: "600",
    marginTop: 20,
  },
  fifthText: {
    fontSize: 15,
    color: "#B5B2B2",
    fontWeight: "600",
    marginTop: 40,
  },
});

export default scholarship;
