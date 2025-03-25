import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { JambiteText, SecondJambiteText } from "../../assets/svg";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useRouter } from "expo-router";

const signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignIn, setIsSignIn] = useState(true);
  const router = useRouter();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <KeyboardAwareScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={{ paddingHorizontal: 20, justifyContent: "center", flex: 1 }}
        >
          <View style={styles.container}>
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
              {/* <Text style={styles.secondText}>Sign up</Text>
                            <View style={styles.transitionButton}>
                                <Text style={[styles.secondText, { color: "white" }]}>Sign In</Text>
                            </View> */}
              <TouchableOpacity
                style={[
                  styles.transitionButton,
                  !isSignIn && { backgroundColor: "#FFFFFF" },
                ]}
                onPress={() => {
                  setIsSignIn(true);
                  router.push("/signin");
                }}
              >
                <Text
                  style={[
                    styles.secondText,
                    { color: isSignIn ? "white" : "#0F065E" },
                  ]}
                >
                  Sign In
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.transitionButton,
                  isSignIn && { backgroundColor: "#FFFFFF" },
                ]}
                onPress={() => {
                  setIsSignIn(false);
                  router.push("/signup");
                }}
              >
                <Text
                  style={[
                    styles.secondText,
                    { color: !isSignIn ? "white" : "#0F065E" },
                  ]}
                >
                  Sign up
                </Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.firstText}>
              Get to know more about ITed Education Software
            </Text>

            <View style={styles.secondContainer}>
              <TextInput
                style={{ flex: 1, color: "#000000" }}
                placeholderTextColor="#000000"
                placeholder={"Enter your email address"}
                onChangeText={(text) => setEmail(text)}
                value={email}
              />
            </View>
            <View style={[styles.secondContainer, { marginTop: 25 }]}>
              <TextInput
                style={{ flex: 1, color: "#000000" }}
                placeholderTextColor="#000000"
                placeholder={"Password"}
                onChangeText={(text) => setPassword(text)}
                value={password}
              />
            </View>
            <View>
              <TouchableOpacity onPress={() => router.push("/forgotPassword")}>
                <Text style={[styles.fourthText, { marginTop: 10 }]}>
                  Forgot password
                </Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                router.push("/home");
              }}
            >
              <Text style={styles.thirdText}>Login</Text>
            </TouchableOpacity>
            <Text style={[styles.fourthText, { textAlign: "center" }]}>
              Powered by Ited Softwares
            </Text>
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
    padding: 5,
    paddingHorizontal: 20,
    marginTop: 30,
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
});

export default signin;
