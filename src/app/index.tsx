import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import PIcon from "../../assets/JAMBEE.png";

const index = () => {
  const router = useRouter();
    React.useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/signin");
    }, 5000);
    
    return () => clearTimeout(timer);
  }, []);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <View
        style={{
          paddingHorizontal: 20,
          paddingVertical: 50,
          justifyContent: "space-between",
          flex: 1,
        }}
      >
        <View></View>
        <View style={styles.container}>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <View style={styles.roundedContainer}>
              <Image
                source={PIcon}
                style={{
                  width: 150,
                  height: 150,
                  borderRadius: 90,
                  resizeMode: "contain",
                }}
              />
            </View>
          </View>
          <Text style={styles.firstText}>Welcome to Ited</Text>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <View>

              <Text style={[styles.firstText, { fontSize: 28, fontWeight: "700", color: "#0F065E" }]}>
                Jambee: CBT practice 2026
              </Text>
              <Text style={styles.disclaimerText}>
                DISCLAIMER: This is an independent educational app and is NOT officially affiliated with or endorsed by JAMB (Joint Admissions and Matriculation Board).
              </Text>
            </View>

          </View>
          <Text style={styles.secondText}>
            Where education is simplified to help our student get a smooth and
            succesful educational journey
          </Text>
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            router.push("/signin");
          }}
        >
          <Text style={styles.thirdText}>Next</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#0F065E",
    height: 40,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    borderWidth: 1,
    marginBottom: 50,
    marginHorizontal: 50,
  },
  disclaimerText: {
    fontSize: 10,
    color: "#FF0000",
    fontWeight: "600",
    marginTop: 10,
    marginBottom: 5,
    textAlign: "center",
    fontStyle: "italic",
  },
  container: {},
  roundedContainer: {
    height: 200,
    padding: 25,
    width: 200,
    borderRadius: 100,
    backgroundColor: "#D9D9D9",
  },
  firstText: {
    fontSize: 14,
    color: "#000000",
    fontWeight: "600",
    marginBottom: 10,
    marginTop: 10,
    textAlign: "center",
  },
  secondText: {
    fontSize: 14,
    color: "#000000",
    fontWeight: "600",
    marginTop: 10,
    textAlign: "center",
  },
  thirdText: {
    fontSize: 10,
    color: "#FFFFFF",
    fontWeight: "900",
    textAlign: "center",
  },
});

export default index;
