import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import {
  BackButton,
  EditBioIcon,
  PenEditIcon,
  PasswordReset,
  AppActivation,
  AboutUs,
  DeleteIcon,
  SignOutIcon,
} from "../../../assets/svg";
import LogoutModal from "../../components/modals/LogoutModal";
import { useRouter } from "expo-router";

const settings = () => {
  const router = useRouter();
  const [modal, setModal] = useState(false);
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "#FFFFFF", paddingTop: 70 }}
    >
      <View
        style={{
          flexDirection: "row",
          gap: 8,
          marginHorizontal: 20,
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <TouchableOpacity onPress={() => router.back()}>
          <BackButton />
        </TouchableOpacity>

        <Text style={styles.firstText}>Profile</Text>
      </View>
      <View style={styles.firstContainer}>
        <View
          style={{
            flexDirection: "row",
            gap: 6,
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <View style={styles.circularContainer}></View>
          <View>
            <Text style={styles.secondText}>Ogbonnaya Daniel Kalu</Text>
            <Text style={styles.secondText}>@8762333</Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <PenEditIcon />
        </View>
      </View>
      <View style={styles.secondContainer}>
        <View style={styles.thirdContainer}>
          <EditBioIcon />
          <View>
            <Text style={styles.thirdText}>Edit My Bio</Text>
            <Text
              style={[styles.thirdText, { fontSize: 15, fontWeight: "500" }]}
            >
              Update the personal profile
            </Text>
          </View>
        </View>
        <View style={styles.thirdContainer}>
          <PasswordReset />
          <View>
            <Text style={styles.thirdText}>Password Reset</Text>
            <Text
              style={[styles.thirdText, { fontSize: 15, fontWeight: "500" }]}
            >
              Change your password
            </Text>
          </View>
        </View>
        <View style={styles.thirdContainer}>
          <AppActivation />
          <View>
            <Text style={styles.thirdText}>App Activation</Text>
            <Text
              style={[styles.thirdText, { fontSize: 15, fontWeight: "500" }]}
            >
              Get activated to unlock full access
            </Text>
          </View>
        </View>
        <View style={styles.thirdContainer}>
          <AppActivation />
          <View>
            <Text style={styles.thirdText}>Suggesti0ns/Complain</Text>
            <Text
              style={[styles.thirdText, { fontSize: 15, fontWeight: "500" }]}
            >
              Mission, Vision, Terms and Conditions
            </Text>
          </View>
        </View>
        <View style={styles.thirdContainer}>
          <AboutUs />
          <View>
            <Text style={styles.thirdText}>About Us</Text>
            <Text
              style={[styles.thirdText, { fontSize: 15, fontWeight: "500" }]}
            >
              Mission, Vision, Terms and Conditions
            </Text>
          </View>
        </View>
        <View style={styles.thirdContainer}>
          <DeleteIcon />
          <View>
            <Text style={styles.thirdText}>Delete Account</Text>
            <Text
              style={[styles.thirdText, { fontSize: 15, fontWeight: "500" }]}
            >
              Permanantely delete your account
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.thirdContainer}
          onPress={() => setModal(true)}
        >
          <SignOutIcon />
          <View>
            <Text style={styles.thirdText}>Log out</Text>
            <Text
              style={[styles.thirdText, { fontSize: 15, fontWeight: "500" }]}
            >
              Sign out of your account
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      {modal && <LogoutModal modal={modal} setModal={setModal} />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  firstText: {
    fontSize: 24,
    color: "#181D27",
    fontWeight: "700",
  },
  secondText: {
    fontSize: 15,
    color: "#FFFFFF",
    fontWeight: "700",
  },
  thirdText: {
    fontSize: 15,
    color: "#00052D",
    fontWeight: "700",
  },
  firstContainer: {
    height: 130,
    backgroundColor: "#0F065E",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: 40,
  },
  circularContainer: {
    backgroundColor: "#FFFFFF",
    height: 78,
    width: 78,
    borderRadius: 40,
  },
  secondContainer: {
    borderWidth: 1,
    borderColor: "#00052D",
    backgroundColor: "#FFFFFF",
    padding: 20,
    marginHorizontal: 20,
    marginTop: 40,
    borderRadius: 15,
    elevation: 10,
    shadowOffset: {
      height: 10,
      width: 10,
    },
    shadowOpacity: 0.6,
    shadowRadius: 4,
    shadowColor: "#333333",
  },
  thirdContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    gap: 3,
    alignItems: "center",
    marginTop: 10,
  },
});

export default settings;
