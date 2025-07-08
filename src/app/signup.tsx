import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  ScrollView,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Image,
} from "react-native";
import React, { useState } from "react";
import { JambiteText, SecondJambiteText } from "../../assets/svg";
import { useRouter } from "expo-router";
import {
  useCreateUserMutation,
  useRequestOtpMutation,
} from "../components/services/userService";
import { setUserInfo } from "../components/redux/slices/userSlice";
import { useAppDispatch, useAppSelector } from "../components/redux/store";
import Toast from "react-native-toast-message";
import DropDownPicker from "react-native-dropdown-picker";
import { useGetAllInstitutionsQuery } from "../components/services/userService";
import HidePassword from "../../assets/images/hidepassword.png";
import VisiblePassword from "../../assets/images/visiblePassword.png";
import { loginUser, updateExpires } from "../components/redux/slices/authSlice";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const signup = () => {
  const [email, setEmail] = useState("");
  const dispatch = useAppDispatch();
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [institution, setInstitution] = useState("");
  const [institutions, setInstitutions] = useState();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isSignUp, setIsSignUp] = useState(true);
  const router = useRouter();
  const [createUser] = useCreateUserMutation();
  const [requestOtp] = useRequestOtpMutation();
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [showSecondStep, setShowSecondStep] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [nameError, setNameError] = useState("");

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhoneNumber = (phone: string) => {
    const phoneRegex = /^(\+?234|0)?[789][01]\d{8}$/;
    return phoneRegex.test(phone.replace(/\s/g, ""));
  };

  const validatePassword = (password: string) => {
    const minLength = password.length >= 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);

    return {
      isValid: minLength && hasUppercase && hasLowercase && hasNumber,
      errors: {
        minLength,
        hasUppercase,
        hasLowercase,
        hasNumber,
      },
    };
  };

  const getPasswordErrorMessage = (password: string) => {
    const validation = validatePassword(password);
    if (validation.isValid) return "";

    const errors = [];
    if (!validation.errors.minLength) errors.push("at least 8 characters");
    if (!validation.errors.hasUppercase) errors.push("one uppercase letter");
    if (!validation.errors.hasLowercase) errors.push("one lowercase letter");
    if (!validation.errors.hasNumber) errors.push("one number");

    return `Password must contain ${errors.join(", ")}`;
  };

  const handleContinue = () => {
    let hasErrors = false;

    if (!name.trim() || name.trim().length < 2) {
      setNameError("Name must be at least 2 characters long");
      hasErrors = true;
    }

    if (!email.trim()) {
      setEmailError("Email is required");
      hasErrors = true;
    } else if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address");
      hasErrors = true;
    }

    if (!number.trim()) {
      setPhoneError("Phone number is required");
      hasErrors = true;
    } else if (!validatePhoneNumber(number)) {
      setPhoneError("Please enter a valid Nigerian phone number");
      hasErrors = true;
    }

    if (hasErrors) {
      Toast.show({
        type: "error",
        text1: "Validation Error",
        text2: "Please fix the errors before continuing",
      });
      return;
    }

    setShowSecondStep(true);
  };

  const { data: institutionsData, isLoading: isInstitutionsLoading } =
    useGetAllInstitutionsQuery();

  const year =
    institutionsData?.levels?.map((institution: any) => ({
      label: institution.name,
      value: institution.id,
    })) || [];

  const handleSignUp = async () => {
    if (!password.trim()) {
      setPasswordError("Password is required");
      Toast.show({
        type: "error",
        text1: "Validation Error",
        text2: "Password is required",
      });
      return;
    }

    const passwordValidation = validatePassword(password);
    if (!passwordValidation.isValid) {
      const errorMessage = getPasswordErrorMessage(password);
      setPasswordError(errorMessage);
      Toast.show({
        type: "error",
        text1: "Invalid Password",
        text2: errorMessage,
      });
      return;
    }

    if (!institution) {
      Toast.show({
        type: "error",
        text1: "Validation Error",
        text2: "Please select an institution",
      });
      return;
    }
    setIsLoading(true);
    try {
      const createUserResponse = await createUser({
        email,
        full_name: name,
        institution_id: institution.toString(),
        password,
        phone_number: number,
        role: "user",
      }).unwrap();

      // const requestOtpResponse = await requestOtp({ email }).unwrap();
      // console.log("OTP Request Success:", requestOtpResponse);
      // Toast.show({
      //   type: "success",
      //   text1: "Success",
      //   text2: "Signup successful",
      // });
      // dispatch(loginUser(createUserResponse.access_token));
      // dispatch(updateExpires(createUserResponse.token_expires));
      // dispatch(
      //   setUserInfo({
      //     full_name: name,
      //     email,
      //     phone_number: number,
      //     password,
      //   })
      // );
      router.push("/signin");
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
      // Clear error states
      setEmailError("");
      setPhoneError("");
      setPasswordError("");
      setNameError("");
    }
  };

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "#FFFFFF", paddingTop: 30 }}
    >
      {/* <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      > */}
      <View style={{ justifyContent: "center", flex: 1, marginTop: 100 }}>
        {/* <ScrollView
            style={styles.container}
            showsVerticalScrollIndicator={false}
          > */}
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
            marginTop: 10,
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
        {!showSecondStep ? (
          <>
            <KeyboardAwareScrollView
              style={{ flex: 1 }}
              contentContainerStyle={{ flexGrow: 1 }}
              showsVerticalScrollIndicator={false}
              enableOnAndroid={true}
              extraScrollHeight={20}
            >
              <Text style={styles.fifthText}>FULL NAME</Text>
              <View style={styles.secondContainer}>
                <TextInput
                  style={{ color: "#000000" }}
                  placeholderTextColor="#000000"
                  placeholder={"Full Name"}
                  onChangeText={(text) => setName(text)}
                  value={name}
                />
              </View>
              {nameError ? (
                <Text style={styles.errorText}>{nameError}</Text>
              ) : null}
              <Text style={styles.fifthText}>EMAIL ADDRESS</Text>
              <View style={styles.secondContainer}>
                <TextInput
                  style={{ color: "#000000" }}
                  placeholderTextColor="#000000"
                  placeholder={"Email address"}
                  onChangeText={(text) => setEmail(text)}
                  value={email}
                  keyboardType="email-address"
                />
              </View>
              {emailError ? (
                <Text style={styles.errorText}>{emailError}</Text>
              ) : null}
              <Text style={styles.fifthText}>PHONE NUMBER</Text>
              <View style={styles.secondContainer}>
                <TextInput
                  style={{ color: "#000000" }}
                  placeholderTextColor="#000000"
                  placeholder={"Your Phone number"}
                  onChangeText={(text) => setNumber(text)}
                  value={number}
                  keyboardType="numeric"
                />
              </View>
              {phoneError ? (
                <Text style={styles.errorText}>{phoneError}</Text>
              ) : null}
              <TouchableOpacity style={styles.button} onPress={handleContinue}>
                <Text style={styles.thirdText}>CONTINUE</Text>
              </TouchableOpacity>
            </KeyboardAwareScrollView>
          </>
        ) : (
          <>
            <View style={{ flex: 1 }}>
              <Text style={[styles.fifthText]}>PASSWORD</Text>
              <View
                style={[
                  styles.secondContainer,
                  {
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  },
                ]}
              >
                <TextInput
                  style={{ color: "#000000" }}
                  placeholderTextColor="#000000"
                  placeholder={"Password"}
                  onChangeText={(text) => setPassword(text)}
                  value={password}
                  secureTextEntry={!isPasswordVisible}
                />
                <TouchableOpacity
                  onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                  style={{}}
                >
                  <Image
                    source={isPasswordVisible ? VisiblePassword : HidePassword}
                  />
                </TouchableOpacity>
              </View>
              {passwordError ? (
                <Text style={styles.errorText}>{passwordError}</Text>
              ) : null}
              <Text style={styles.fifthText}>PREFFERD INSTITUTION</Text>
              <View style={styles.firstContainer}>
                <DropDownPicker
                  open={open}
                  value={institution}
                  items={year}
                  setOpen={setOpen}
                  setValue={(value) => setInstitution(value)}
                  placeholder="Select Institution"
                  style={pickerSelectStyles.inputIOS}
                  dropDownContainerStyle={pickerSelectStyles.dropDownContainer}
                />
              </View>

              <TouchableOpacity style={styles.button} onPress={handleSignUp}>
                {isLoading ? (
                  <ActivityIndicator color="#FFFFFF" size={14} />
                ) : (
                  <Text style={styles.thirdText}>SIGN UP</Text>
                )}
              </TouchableOpacity>
              <Text
                style={[
                  styles.fourthText,
                  { textAlign: "center", marginBottom: 30 },
                ]}
              >
                Powered by Ited Softwares
              </Text>
            </View>
          </>
        )}
        {/* </ScrollView> */}
      </View>
      {/* </KeyboardAvoidingView> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  firstContainer: {
    marginHorizontal: 20,
  },
  errorContainer: {
    borderWidth: 1,
    borderColor: "#FF6B6B",
  },
  errorText: {
    color: "#FF6B6B",
    fontSize: 10,
    marginHorizontal: 20,
    marginTop: 5,
    fontWeight: "500",
    textAlign: "center",
  },
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
    marginHorizontal: 50,
    marginTop: 30,
  },

  secondContainer: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 10,
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
    marginHorizontal: 20,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    borderWidth: 0,
    borderColor: "#0F065E",
    color: "#000000",

    alignSelf: "stretch",
    backgroundColor: "#FFFFFF",

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
  inputAndroid: {
    fontSize: 16,
    paddingVertical: 8,
    borderWidth: 0,
    borderColor: "#0F065E",
    color: "#000000",

    alignSelf: "stretch",
    backgroundColor: "#FFFFFF",

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
  dropDownContainer: {
    borderColor: "#0F065E",
  },
  iconContainer: {
    top: "50%",
    right: 10,
    transform: [{ translateY: -12 }],
    justifyContent: "center",
    alignItems: "center",
  },
});

export default signup;
