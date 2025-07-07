import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Image,
  ActivityIndicator,
} from "react-native";
import React, { useState, useRef } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useRouter } from "expo-router";
import FirstImage from "../../assets/images/OneTimePassword.png";
import {
  useVerifyOtpMutation,
  useRequestOtpMutation,
} from "../components/services/userService";
import { RootState } from "../components/redux/store";
import { useSelector } from "react-redux";
import Toast from "react-native-toast-message";
import ForgotPasswordVerificationModal from "../components/modals/ForgotPasswordVerificationModal";

const forgotPasswordVerification = () => {
  const [code, setCode] = useState(["", "", "", "", ""]);
  const router = useRouter();
  const [modal, setModal] = useState(false);
  const [verifyOtp] = useVerifyOtpMutation();
  const inputRefs = useRef<(TextInput | null)[]>([]);
  const user = useSelector((state: RootState) => state.user.user);
  const [isLoading, setIsLoading] = useState(false);
  const [requestOtp] = useRequestOtpMutation();

  const handleChange = (text: any, index: number) => {
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    if (text.length === 1 && index < code.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleResend = async () => {
    setIsLoading(true);
    try {
      const requestOtpResponse = await requestOtp({
        email: user.email,
      }).unwrap();
      console.log("OTP Request Success:", requestOtpResponse);
      Toast.show({
        type: "success",
        text1: "Success",
        text2: requestOtpResponse.message,
      });
      router.push("/verification");
    } catch (error) {
      console.error("Error sending otp", error);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "There was an error sending otp",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      if (code && code.join("")) {
        router.push({
          pathname: "/resetPassword",
          params: { verificationCode: code.join("") },
        });
      }
    } catch (error) {
      console.error("Please provide the code");
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Please provide the code",
      });
    } finally {
      setCode(["", "", "", "", ""]);
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <KeyboardAwareScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={{
            paddingHorizontal: 20,
            justifyContent: "space-between",
            flex: 1,
            paddingTop: 50,
          }}
        >
          <View></View>
          <View style={styles.container}>
            <Text style={styles.secondText}>Verification</Text>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
                paddingHorizontal: 20,
                gap: 8,
                marginTop: 50,
              }}
            >
              <Image source={FirstImage} />
            </View>
            <Text style={styles.firstText}>
              We have sent the verification code to your email address
            </Text>
            <View style={styles.horizontalContainer}>
              {code.map((digit, index) => (
                <View key={index} style={styles.innerContainer}>
                  <TextInput
                    ref={(ref) => (inputRefs.current[index] = ref)}
                    style={{ flex: 1, color: "#000000" }}
                    placeholderTextColor="#000000"
                    placeholder={""}
                    onChangeText={(text) => handleChange(text, index)}
                    value={digit}
                    keyboardType="numeric"
                    maxLength={1}
                    returnKeyType="next"
                    onSubmitEditing={() => {
                      if (index < code.length - 1) {
                        inputRefs.current[index + 1]?.focus();
                      }
                    }}
                  />
                </View>
              ))}
            </View>
          </View>
          <View>
            <TouchableOpacity
              style={styles.secondButton}
              onPress={handleResend}
            >
              {isLoading ? (
                <ActivityIndicator color="#FFFFFF" size={14} />
              ) : (
                <Text style={[styles.thirdText, { color: "#B5B2B2" }]}>
                  Resend
                </Text>
              )}
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              {isLoading ? (
                <ActivityIndicator color="#FFFFFF" size={14} />
              ) : (
                <Text style={styles.thirdText}>Submit</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
      {modal && (
        <ForgotPasswordVerificationModal modal={modal} setModal={setModal} />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  horizontalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 40,
    marginBottom: 15,
  },
  innerContainer: {
    borderColor: "#0F065E",
    backgroundColor: "#AABDE42B",
    borderWidth: 2,
    borderRadius: 10,
    height: 50,
    width: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#0F065E",
    height: 50,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 50,
    marginTop: 10,
    marginHorizontal: 50,
  },
  secondButton: {
    backgroundColor: "#FFFFFF",
    height: 50,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#0F065E",
    marginBottom: 10,
    marginTop: 40,
    marginHorizontal: 80,
  },
  container: {},
  firstText: {
    fontSize: 15,
    color: "#B5B2B2",
    fontWeight: "600",
    marginBottom: 10,
    marginTop: 20,
    textAlign: "center",
  },
  secondText: {
    fontSize: 30,
    color: "#0F065E",
    fontWeight: "900",
    textAlign: "center",
  },
  thirdText: {
    fontSize: 16,
    color: "#FFFFFF",
    fontWeight: "900",
    textAlign: "center",
  },
  fourthText: {
    fontSize: 9,
    color: "#000000",
    fontWeight: "500",
    textAlign: "right",
  },
});

export default forgotPasswordVerification;
