import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React, { useEffect } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import TouchableOutside from "./TouchableOutside";

const { width, height } = Dimensions.get("window");
interface VerificationModalProps {
  setModal: (value: boolean) => void;
  modal: boolean;
}
const ForgotPasswordVerificationModal = ({
  setModal,
  modal,
}: VerificationModalProps) => {
  const router = useRouter();

  useEffect(() => {
    if (modal) {
      const timeout = setTimeout(() => {
        setModal(false);
        router.push("/resetPassword");
      }, 3000);

      return () => clearTimeout(timeout);
    }
  }, [modal]);

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
                height: 5,
                width: 200,
                borderRadius: 10,
                backgroundColor: "#FFFFFF",
                marginBottom: 30,
              }}
            ></View>

            <Text style={styles.firstText}>Verified!</Text>

            <Text style={styles.secondText}>
              You can noe create a new password
            </Text>
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
  },

  modalContent: {
    width: width,
    position: "absolute",
    bottom: 0,
    backgroundColor: "#0F065E",
    elevation: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: "center",
    height: height * 0.3,
    paddingHorizontal: 20,
  },
  firstText: {
    fontSize: 24,
    fontWeight: "600",
    fontStyle: "normal",
    color: "#FFFFFF",
    textAlign: "center",
  },
  secondText: {
    fontSize: 15,
    fontWeight: "600",
    fontStyle: "normal",
    color: "#FFFFFF",
    marginTop: 20,
    textAlign: "center",
  },
  thirdText: {
    fontSize: 12,
    fontWeight: "500",
    fontStyle: "normal",
    color: "#FFFFFF",
  },
});

export default ForgotPasswordVerificationModal;
