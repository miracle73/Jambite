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
import DropDownPicker from "react-native-dropdown-picker";
import { useGetAllInstitutionsQuery } from "../components/services/userService";

const editProfile = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [institution, setInstitution] = useState("");
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleSubmit = () => {
    setLoading(true);
    setFullName("");
    setEmail("");
    setPhoneNumber("");
    setInstitution("");
    setLoading(false);
  };

  const { data: institutionsData, isLoading: isInstitutionsLoading } =
    useGetAllInstitutionsQuery();

  const year =
    institutionsData?.levels?.map((institution: any) => ({
      label: institution.name,
      value: institution.id,
    })) || [];

  console.log(year, 5000);
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
          <View style={{ marginBottom: 50 }}>
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
            <Text style={styles.fourthText}>FULL NAME</Text>
            <View style={styles.secondContainer}>
              <TextInput
                style={{ flex: 1, color: "#000000" }}
                placeholderTextColor="#000000"
                placeholder={""}
                onChangeText={(text) => setFullName(text)}
                value={fullName}
              />
            </View>
            <Text style={[styles.fourthText, { marginTop: 25 }]}>
              EMAIL ADDRESS
            </Text>
            <View style={styles.secondContainer}>
              <TextInput
                style={{ flex: 1, color: "#000000" }}
                placeholderTextColor="#000000"
                placeholder={""}
                onChangeText={(text) => setEmail(text)}
                value={email}
              />
            </View>

            <Text style={[styles.fourthText, { marginTop: 25 }]}>
              PHONE NUMBER
            </Text>
            <View style={styles.secondContainer}>
              <TextInput
                style={{ flex: 1, color: "#000000" }}
                placeholderTextColor="#000000"
                placeholder={""}
                onChangeText={(text) => setPhoneNumber(text)}
                value={phoneNumber}
              />
            </View>

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
                dropDownContainerStyle={pickerSelectStyles.dropDownContainer}
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
  firstContainer: {},
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
