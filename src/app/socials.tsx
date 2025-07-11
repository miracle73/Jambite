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
  FacebookSocials,
  InstagramSocials,
  TelegramSocials,
  TiktokSocials,
} from "../../assets/svg";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useRouter } from "expo-router";
import ProtectedRoute from "../components/ProtectedRoute";

const socials = () => {
  const router = useRouter();
  return (
    <ProtectedRoute>
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
            <View style={{ marginBottom: 70 }}>
              <TouchableOpacity onPress={() => router.back()}>
                <BackArrow />
              </TouchableOpacity>
            </View>
            <Text style={[styles.firstText, { textAlign: "center" }]}>
              Our Socials
            </Text>
            <Text style={[styles.secondText, { textAlign: "center" }]}>
              Follow us on our social media handles
            </Text>

            <TouchableOpacity
              style={[styles.fourthContainer, { marginTop: 50 }]}
              onPress={() => {
                // Open Facebook profile in browser
                import("react-native").then(({ Linking }) => {
                  Linking.openURL(
                    "https://www.facebook.com/profile.php?id=61566071536017"
                  );
                });
              }}
            >
              <FacebookSocials />
              <TouchableOpacity>
                <Text style={styles.thirdText}>
                  itededucationalsoftwares@facebook.com
                </Text>
              </TouchableOpacity>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.fourthContainer}
              onPress={() => {
                import("react-native").then(({ Linking }) => {
                  Linking.openURL("https://www.instagram.com/itedsoftwares/");
                });
              }}
            >
              <InstagramSocials />
              <TouchableOpacity>
                <Text style={styles.thirdText}>
                  itedsoftwares@instagram.com
                </Text>
              </TouchableOpacity>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.fourthContainer}
              onPress={() => {
                import("react-native").then(({ Linking }) => {
                  Linking.openURL(
                    "https://www.tiktok.com/@itedsoftwares?_t=ZM-8vkLwsxovSh&_r=1"
                  );
                });
              }}
            >
              <TiktokSocials />
              <TouchableOpacity>
                <Text style={styles.thirdText}>itedsoftwares@tiktok.com</Text>
              </TouchableOpacity>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.fourthContainer}
              onPress={() => {
                import("react-native").then(({ Linking }) => {
                  Linking.openURL("https://t.me/itedsoftwares");
                });
              }}
            >
              <TelegramSocials />
              <TouchableOpacity>
                <Text style={styles.thirdText}>
                  itedsoftwares@telegtram.com
                </Text>
              </TouchableOpacity>
            </TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </ProtectedRoute>
  );
};

const styles = StyleSheet.create({
  fourthContainer: {
    backgroundColor: "#FFFFFF",
    padding: 10,
    marginTop: 10,
    borderRadius: 15,
    elevation: 10,
    flexDirection: "row",
    justifyContent: "flex-start",
    gap: 2,
    alignItems: "center",
    shadowOffset: {
      height: 10,
      width: 10,
    },
    shadowOpacity: 0.6,
    shadowRadius: 4,
    shadowColor: "#333333",
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
    fontSize: 10,
    color: "#000000",
    fontWeight: "600",
  },

  fourthText: {
    fontSize: 15,
    color: "#B5B2B2",
    fontWeight: "600",
    marginTop: 20,
  },
});

export default socials;
