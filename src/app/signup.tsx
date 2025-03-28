import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { JambiteText, SecondJambiteText } from "../../assets/svg";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useRouter } from "expo-router";
import {
  useCreateUserMutation,
  useRequestOtpMutation,
} from "../components/services/userService";
import { setUserInfo } from "../components/redux/slices/userSlice";
import { useAppDispatch, useAppSelector } from "../components/redux/store";
import Toast from "react-native-toast-message";

const signup = () => {
  const [email, setEmail] = useState("");
  const dispatch = useAppDispatch();
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [institution, setInstitution] = useState("");
  const [isSignUp, setIsSignUp] = useState(true);
  const router = useRouter();
  const [createUser] = useCreateUserMutation();
  const [requestOtp] = useRequestOtpMutation();
  const [isLoading, setIsLoading] = useState(false);

  const handleSignUp = async () => {
    setIsLoading(true);
    try {
      const createUserResponse = await createUser({
        email,
        full_name: name,
        institution_id: institution,
        password,
        phone_number: number,
        role: "user",
      }).unwrap();

      dispatch(
        setUserInfo({
          full_name: name,
          email,
          phone_number: number,
          password,
        })
      );

      console.log(createUserResponse);
      if (createUserResponse.access_token) {
        const requestOtpResponse = await requestOtp({ email }).unwrap();
        console.log("OTP Request Success:", requestOtpResponse);
        Toast.show({
          type: "success",
          text1: "Success",
          text2: requestOtpResponse.message,
        });
        router.push("/verification");
      }
    } catch (error) {
      console.error("Error during sign up:", error);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Error during sign up",
      });
    } finally {
      setIsLoading(false);
      setEmail("");
      setName("");
      setInstitution("");
      setNumber("");
      setPassword(" ");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <KeyboardAwareScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={{ paddingHorizontal: 20, justifyContent: "center", flex: 1 }}
        >
          <ScrollView
            style={styles.container}
            showsVerticalScrollIndicator={false}
          >
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <SecondJambiteText />
            </View>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
                paddingHorizontal: 20,
                gap: 8,
                marginTop: 20,
              }}
            >
              <TouchableOpacity
                style={[
                  styles.transitionButton,
                  isSignUp && { backgroundColor: "#FFFFFF" },
                ]}
                onPress={() => {
                  setIsSignUp(false);
                  router.push("/signin");
                }}
              >
                <Text
                  style={[
                    styles.secondText,
                    { color: !isSignUp ? "white" : "#0F065E" },
                  ]}
                >
                  Sign In
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.transitionButton,
                  !isSignUp && { backgroundColor: "#FFFFFF" },
                ]}
                onPress={() => {
                  setIsSignUp(true);
                  router.push("/signup");
                }}
              >
                <Text
                  style={[
                    styles.secondText,
                    { color: isSignUp ? "white" : "#0F065E" },
                  ]}
                >
                  Sign up
                </Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.firstText}>
              Get to know more about ITed Education Software
            </Text>

            <Text style={styles.fifthText}>FULL NAME</Text>
            <View style={styles.secondContainer}>
              <TextInput
                style={{ flex: 1, color: "#000000" }}
                placeholderTextColor="#000000"
                placeholder={"Full Name"}
                onChangeText={(text) => setName(text)}
                value={name}
              />
            </View>
            <Text style={styles.fifthText}>EMAIL ADDRESS</Text>
            <View style={styles.secondContainer}>
              <TextInput
                style={{ flex: 1, color: "#000000" }}
                placeholderTextColor="#000000"
                placeholder={"Email address"}
                onChangeText={(text) => setEmail(text)}
                value={email}
                keyboardType="email-address"
              />
            </View>
            <Text style={styles.fifthText}>PHONE NUMBER</Text>
            <View style={styles.secondContainer}>
              <TextInput
                style={{ flex: 1, color: "#000000" }}
                placeholderTextColor="#000000"
                placeholder={"Your Phone number"}
                onChangeText={(text) => setNumber(text)}
                value={number}
                keyboardType="numeric"
              />
            </View>
            <Text style={styles.fifthText}>PREFFERD INSTITUTION</Text>
            <View style={styles.secondContainer}>
              <TextInput
                style={{ flex: 1, color: "#000000" }}
                placeholderTextColor="#000000"
                placeholder={"Your Institution"}
                onChangeText={(text) => setInstitution(text)}
                value={institution}
              />
            </View>
            <Text style={styles.fifthText}>PASSWORD</Text>
            <View style={styles.secondContainer}>
              <TextInput
                style={{ flex: 1, color: "#000000" }}
                placeholderTextColor="#000000"
                placeholder={"Password"}
                onChangeText={(text) => setPassword(text)}
                value={password}
              />
            </View>
            <TouchableOpacity style={styles.button} onPress={handleSignUp}>
              {isLoading ? (
                <ActivityIndicator color="#FFFFFF" size={14} />
              ) : (
                <Text style={styles.thirdText}>SIGN UP</Text>
              )}
            </TouchableOpacity>
            <Text style={[styles.fourthText, { textAlign: "center" }]}>
              Powered by Ited Softwares
            </Text>
          </ScrollView>
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
    padding: 5,
    paddingHorizontal: 20,
    marginTop: 10,
    borderRadius: 25,
    elevation: 7,
    shadowOffset: {
      height: 5,
      width: 5,
    },
    shadowOpacity: 0.6,
    shadowRadius: 4,
    shadowColor: "#333333",
  },
  container: {
    marginTop: 80,
  },
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
    fontSize: 16,
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
    fontSize: 9,
    color: "#000000",
    fontWeight: "500",
    textAlign: "right",
  },
  fifthText: {
    fontSize: 10,
    color: "#B5B2B2",
    fontWeight: "900",
    textAlign: "left",
    marginTop: 15,
  },
});

export default signup;
