import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { BackArrow, JambiteText, SecondJambiteText } from "../../assets/svg";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useRouter } from "expo-router";
import { useRequestOtpMutation } from "../components/services/userService";
import Toast from "react-native-toast-message";

const forgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [requestOtp] = useRequestOtpMutation();

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const requestOtpResponse = await requestOtp({ email }).unwrap();
      console.log("OTP Request Success:", requestOtpResponse);
      Toast.show({
        type: "success",
        text1: "Success",
        text2: requestOtpResponse.message,
      });

      router.push("forgotPasswordVerification");
    } catch (error) {
      console.error("Error during sign up:", error);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Error during sign up",
      });
    } finally {
      setLoading(false);
      setEmail("");
    }
  };

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
          <View style={{ marginBottom: 100 }}>
            <TouchableOpacity onPress={() => router.back()}>
              <BackArrow />
            </TouchableOpacity>
          </View>
          <View style={styles.container}>
            <Text style={styles.secondText}>Forgot Password</Text>
            <Text style={styles.firstText}>Change your password</Text>
            <View style={{ marginTop: 40 }} />
            <Text style={styles.fourthText}>Email Address</Text>
            <View style={styles.secondContainer}>
              <TextInput
                style={{ flex: 1, color: "#000000" }}
                placeholderTextColor="#000000"
                placeholder={""}
                onChangeText={(text) => setEmail(text)}
                value={email}
              />
            </View>

            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              {loading ? (
                <ActivityIndicator color="#FFFFFF" size={14} />
              ) : (
                <Text style={styles.thirdText}>Save</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  transitionButton: {
    backgroundColor: "#0F065E",
    height: 30,
    width: 100,
    borderRadius: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#0F065E",
    height: 40,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    borderWidth: 1,
    marginBottom: 10,
    marginTop: 40,
    marginHorizontal: 50,
  },

  secondContainer: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 15,
    paddingHorizontal: 20,

    borderRadius: 25,
    elevation: 20,
    shadowOffset: {
      height: 20,
      width: 20,
    },
    shadowOpacity: 0.6,
    shadowRadius: 4,
    shadowColor: "#333333",
  },
  container: {},
  roundedContainer: {
    height: 200,
    width: 200,
    borderRadius: 100,
    backgroundColor: "#D9D9D9",
  },
  firstText: {
    fontSize: 10,
    color: "#B5B2B2",
    fontWeight: "600",
    marginBottom: 10,
    marginTop: 10,
    textAlign: "center",
  },
  secondText: {
    fontSize: 30,
    color: "#0F065E",
    fontWeight: "900",
    textAlign: "center",
  },
  thirdText: {
    fontSize: 10,
    color: "#FFFFFF",
    fontWeight: "900",
    textAlign: "center",
  },
  fourthText: {
    fontSize: 10,
    color: "#B5B2B2",
    fontWeight: "600",
    marginBottom: 10,
  },
});

export default forgotPassword;
