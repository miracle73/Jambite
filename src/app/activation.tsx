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

const activation = () => {
  const [code, setCode] = useState("");
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
          <View style={{ marginBottom: 30 }}>
            <BackArrow />
          </View>
          <Text style={[styles.firstText, { marginRight: 5 }]}>
            Activate App
          </Text>
          <Text style={[styles.secondText, { marginRight: 5 }]}>
            Access full app features
          </Text>

          <Text style={styles.thirdText}>
            Enter your 15 digit activation code to access full app features{" "}
          </Text>

          <Text style={[styles.fourthText]}>Activation Code</Text>
          <View style={styles.firstContainer}>
            <TextInput
              style={{ flex: 1, color: "#000000" }}
              placeholderTextColor="#000000"
              placeholder={""}
              onChangeText={(text) => setCode(text)}
              value={code}
            />
          </View>
          <View>
            <TouchableOpacity style={styles.secondContainer}>
              <Text
                style={{ color: "#FFFFFF", fontSize: 15, fontWeight: "600" }}
              >
                Activate
              </Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.thirdText}>To get your activation pin .</Text>
          <View style={styles.thirdContainer}>
            <View style={{ gap: 2 }}>
              <Recta />
              <Recta />
              <Recta />
              <MiniRecta />
            </View>
            <View>
              <Text
                style={[styles.thirdText, { fontWeight: "500", marginTop: 0 }]}
              >
                Pay with Paystack
              </Text>
              <Text
                style={[styles.thirdText, { fontWeight: "500", marginTop: 0 }]}
              >
                {" "}
                N2500
              </Text>
            </View>
          </View>
          <Text
            style={[
              styles.thirdText,
              { marginVertical: 20, textAlign: "center" },
            ]}
          >
            or
          </Text>
          <Text style={[styles.thirdText, { marginTop: 0 }]}>
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
    marginTop: 10,
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
    marginTop: 40,
  },
  fifthText: {
    fontSize: 15,
    color: "#B5B2B2",
    fontWeight: "600",
    marginTop: 40,
  },
});

export default activation;
