import {
  View,
  Text,
  Dimensions,
  Modal,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import ModalIcon from "../../../assets/images/Modal Icon.png";
import TouchableOutside from "./TouchableOutside";
import { useRouter } from "expo-router";
import { AlertIcon } from "../../../assets/svg";

const { width, height } = Dimensions.get("window");
interface LogoutModalProps {
  setModal: (value: boolean) => void;
  modal: boolean;
}
const LogoutModal = ({ setModal, modal }: LogoutModalProps) => {
  const router = useRouter();
  return (
    <Modal
      animationType="slide"
      transparent={true}
      style={{
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
      }}
      visible={modal}
      onRequestClose={() => {
        setModal(!modal);
      }}
    >
      <TouchableOutside onPress={() => setModal(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                gap: 4,
              }}
            >
              <AlertIcon />
              <Text style={styles.firstText}>Alert!</Text>
            </View>
            <Text style={styles.secondText}>
              Are you really sure you want to sign out?
            </Text>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                paddingHorizontal: 20,
                width: "100%",
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  setModal(false);
                }}
              >
                <Text style={styles.thirdText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  router.push("/signin");
                  setModal(false);
                }}
              >
                <Text style={styles.buttonText}>Sign out</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableOutside>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    backgroundColor: "#FFFFFF",
    paddingVertical: 15,
    width: "50%",
  },
  buttonText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#00052D",
  },

  modalContent: {
    marginHorizontal: 20,
    position: "absolute",
    bottom: height * 0.3,
    backgroundColor: "#0F065E",
    elevation: 10,
    borderRadius: 20,
    alignItems: "center",
    height: height * 0.25,
    paddingHorizontal: 20,
    paddingVertical: 10,
    justifyContent: "space-between",
    alignContent: "center",
  },
  firstText: {
    fontSize: 24,
    fontWeight: "600",
    fontStyle: "normal",
    color: "#FFFFFF",
  },
  secondText: {
    fontSize: 15,
    fontWeight: "600",
    fontStyle: "normal",
    color: "#FFFFFF",
    marginVertical: 10,
    textAlign: "center",
  },
  thirdText: {
    fontSize: 15,
    fontWeight: "600",
    fontStyle: "normal",
    color: "#FFFFFF",
  },
});

export default LogoutModal;
