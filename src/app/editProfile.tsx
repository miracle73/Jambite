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
import { BackArrow } from "../../assets/svg";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useRouter } from "expo-router";
import DropDownPicker from "react-native-dropdown-picker";
import { useGetAllInstitutionsQuery } from "../components/services/userService";
import ProtectedRoute from "../components/ProtectedRoute";
import Toast from "react-native-toast-message";

const editProfile = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [institution, setInstitution] = useState("");
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [showSecondStep, setShowSecondStep] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [fullNameError, setFullNameError] = useState("");

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhoneNumber = (phone: string) => {
    const phoneRegex = /^(\+?234|0)?[789][01]\d{8}$/;
    return phoneRegex.test(phone.replace(/\s/g, ""));
  };

  const handleFullNameChange = (text: string) => {
    setFullName(text);
    if (text.trim().length < 2) {
      setFullNameError("Name must be at least 2 characters long");
    } else {
      setFullNameError("");
    }
  };

  const handleEmailChange = (text: string) => {
    setEmail(text);
    if (text.trim() === "") {
      setEmailError("Email is required");
    } else if (!validateEmail(text)) {
      setEmailError("Please enter a valid email address");
    } else {
      setEmailError("");
    }
  };

  const handlePhoneChange = (text: string) => {
    setPhoneNumber(text);
    if (text.trim() === "") {
      setPhoneError("Phone number is required");
    } else if (!validatePhoneNumber(text)) {
      setPhoneError("Please enter a valid Nigerian phone number");
    } else {
      setPhoneError("");
    }
  };
  const handleContinue = () => {
    let hasErrors = false;

    // Validate full name
    if (!fullName.trim() || fullName.trim().length < 2) {
      setFullNameError("Name must be at least 2 characters long");
      hasErrors = true;
    }

    // Validate email
    if (!email.trim()) {
      setEmailError("Email is required");
      hasErrors = true;
    } else if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address");
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

  const handleSubmit = () => {
    let hasErrors = false;

    if (!phoneNumber.trim()) {
      setPhoneError("Phone number is required");
      hasErrors = true;
    } else if (!validatePhoneNumber(phoneNumber)) {
      setPhoneError("Please enter a valid Nigerian phone number");
      hasErrors = true;
    }

    if (!institution) {
      Toast.show({
        type: "error",
        text1: "Validation Error",
        text2: "Please select an institution",
      });
      return;
    }

    if (hasErrors) {
      Toast.show({
        type: "error",
        text1: "Validation Error",
        text2: "Please fix the errors before saving",
      });
      return;
    }
    setTimeout(() => {
      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Profile updated successfully",
      });

      setFullName("");
      setEmail("");
      setPhoneNumber("");
      setInstitution("");

      setEmailError("");
      setPhoneError("");
      setFullNameError("");

      setLoading(false);

      router.back();
    }, 1500);
  };

  const { data: institutionsData, isLoading: isInstitutionsLoading } =
    useGetAllInstitutionsQuery();

  const year =
    institutionsData?.levels?.map((institution: any) => ({
      label: institution.name,
      value: institution.id,
    })) || [];

  return (
    <ProtectedRoute>
      <SafeAreaView
        style={{ flex: 1, backgroundColor: "#FFFFFF", paddingTop: 50 }}
      >
        {/* <KeyboardAwareScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      > */}
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
          <View style={styles.container}>
            <Text style={styles.secondText}>Edit Profile</Text>
            <Text style={styles.firstText}>
              Update your details and get it saved
            </Text>
            <View style={{ marginTop: 20 }} />
            {!showSecondStep ? (
              <>
                <Text style={styles.fourthText}>FULL NAME</Text>
                <View style={styles.secondContainer}>
                  <TextInput
                    style={{ color: "#000000" }}
                    placeholderTextColor="#000000"
                    placeholder={"Full Name"}
                    onChangeText={(text) => setFullName(text)}
                    value={fullName}
                  />
                </View>
                {fullNameError ? (
                  <Text style={styles.errorText}>{fullNameError}</Text>
                ) : null}
                <Text style={[styles.fourthText, { marginTop: 25 }]}>
                  EMAIL ADDRESS
                </Text>
                <View style={styles.secondContainer}>
                  <TextInput
                    style={{ color: "#000000" }}
                    placeholderTextColor="#000000"
                    placeholder={"Email Address"}
                    onChangeText={(text) => setEmail(text)}
                    value={email}
                  />
                </View>
                {emailError ? (
                  <Text style={styles.errorText}>{emailError}</Text>
                ) : null}
                <TouchableOpacity
                  style={styles.button}
                  onPress={handleContinue}
                >
                  <Text style={styles.thirdText}>CONTINUE</Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <Text style={[styles.fourthText, { marginTop: 25 }]}>
                  PHONE NUMBER
                </Text>
                <View style={styles.secondContainer}>
                  <TextInput
                    style={{ color: "#000000" }}
                    placeholderTextColor="#000000"
                    placeholder={"Phone Number"}
                    onChangeText={(text) => setPhoneNumber(text)}
                    value={phoneNumber}
                    keyboardType="numeric"
                  />
                </View>
                {phoneError ? (
                  <Text style={styles.errorText}>{phoneError}</Text>
                ) : null}
                <Text style={[styles.fourthText, { marginTop: 25 }]}>
                  PREFFERD INSTITUTION
                </Text>
                <View style={styles.firstContainer}>
                  <DropDownPicker
                    open={open}
                    value={institution}
                    items={year}
                    setOpen={setOpen}
                    setValue={(value) => setInstitution(value)}
                    placeholder="Select Institution"
                    style={pickerSelectStyles.inputIOS}
                    dropDownContainerStyle={
                      pickerSelectStyles.dropDownContainer
                    }
                  />
                </View>

                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                  {loading ? (
                    <ActivityIndicator color="#FFFFFF" size={14} />
                  ) : (
                    <Text style={styles.thirdText}>Save</Text>
                  )}
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
        {/* </KeyboardAwareScrollView> */}
      </SafeAreaView>
    </ProtectedRoute>
  );
};

const styles = StyleSheet.create({
  firstContainer: {},
  errorContainer: {
    borderWidth: 1,
    borderColor: "#FF6B6B",
  },
  errorText: {
    color: "#FF6B6B",
    fontSize: 10,
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
    marginTop: 40,
    marginHorizontal: 50,
  },

  secondContainer: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 10,
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

export default editProfile;
