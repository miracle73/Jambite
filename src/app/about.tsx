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

const about = () => {
  const [message, setMessage] = useState("");
  const [topic, setTopic] = useState("");
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
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
          <View
            style={{
              marginBottom: 30,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <BackArrow />
            <TouchableOpacity style={styles.secondContainer}>
              <Text
                style={{ color: "#FFFFFF", fontSize: 15, fontWeight: "600" }}
              >
                Contact Us
              </Text>
            </TouchableOpacity>
          </View>
          <Text style={[styles.firstText, { textAlign: "center" }]}>
            About Us
          </Text>
          <Text style={[styles.secondText, { textAlign: "center" }]}>
            Get to know more about ITed Education Software
          </Text>

          <Text style={styles.thirdText}>The App</Text>
          <Text style={styles.fourthText}>
            Ited Educational Software offers interactive lessons, access to
            e-books, and quizzes to evaluate knowledge. It personalizes learning
            with adaptive lessons, progress tracking, and tailored
            recommendations.
          </Text>
          <Text style={[styles.thirdText, { marginTop: 30 }]}>Mission</Text>
          <Text style={styles.fourthText}>
            Ited Educational Software offers interactive lessons, access to
            e-books, and quizzes to evaluate knowledge. It personalizes learning
            with adaptive lessons, progress tracking, and tailored
            recommendations.
          </Text>
          <Text style={[styles.thirdText, { marginTop: 30 }]}>Vision</Text>
          <Text style={styles.fourthText}>
            Ited Educational Software offers interactive lessons, access to
            e-books, and quizzes to evaluate knowledge. It personalizes learning
            with adaptive lessons, progress tracking, and tailored
            recommendations.
          </Text>
          <View style={styles.firstContainer}>
            <Text style={styles.fifthText}>Leave us a message</Text>
            <View style={styles.thirdContainer}>
              <TextInput
                style={{ flex: 1, color: "#000000" }}
                placeholderTextColor="#000000"
                placeholder={"Full Name:"}
                onChangeText={(text) => setFullName(text)}
                value={fullName}
              />
            </View>

            <View style={styles.thirdContainer}>
              <TextInput
                style={{ flex: 1, color: "#000000" }}
                placeholderTextColor="#000000"
                placeholder={"Email Address:"}
                onChangeText={(text) => setEmail(text)}
                value={email}
              />
            </View>

            <View style={styles.thirdContainer}>
              <TextInput
                style={{ flex: 1, color: "#000000" }}
                placeholderTextColor="#000000"
                placeholder={"Topic:"}
                onChangeText={(text) => setTopic(text)}
                value={topic}
              />
            </View>
            <View style={styles.thirdContainer}>
              <TextInput
                style={{
                  flex: 1,
                  color: "#000000",
                  height: 100,
                  textAlignVertical: "top",
                }}
                placeholderTextColor="#000000"
                placeholder={"Message"}
                onChangeText={(text) => setMessage(text)}
                value={message}
                multiline={true}
              />
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};
//
const styles = StyleSheet.create({
  firstContainer: {
    marginTop: 20,
    backgroundColor: "#BDC1C84D",
    borderRadius: 27,
    padding: 20,
  },
  secondContainer: {
    backgroundColor: "#0F065E",
    borderRadius: 10,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 10,
  },
  thirdContainer: {
    backgroundColor: "#FFFFFF",
    padding: 5,
    paddingHorizontal: 20,
    borderRadius: 25,
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
    textDecorationLine: "underline",
  },

  fourthText: {
    fontSize: 15,
    color: "#000000",
    fontWeight: "500",
  },
  fifthText: {
    fontSize: 15,
    color: "#0F065E",
    fontWeight: "600",
    marginBottom: 20,
    textDecorationLine: "underline",
  },
});

export default about;
