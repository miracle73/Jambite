import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import {
  Activation,
  AddDocument,
  AskQuestion,
  Facebook,
  HomeSpecialIcon,
  Instagram,
  LaptopWithCursor,
  OpenBookIcon,
  ProfileIcon,
  Scholarship,
  SecondJambiteText,
  SmallerJambiteText,
  Telegram,
  ThirdJambiteText,
  Tiktok,
  UniversityCampus,
} from "../../../assets/svg";
import FirstImage from "../../../assets/images/Uninstalling Updates.png";
import { useRouter } from "expo-router";
import { useSelector } from "react-redux";
import { RootState } from "../../components/redux/store";

const home = () => {
  const router = useRouter();
  const user = useSelector((state: RootState) => state.user.user);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#FFFFFF",
        paddingTop: 50,
      }}
    >
      <ScrollView style={{}} showsVerticalScrollIndicator={false}>
        <View
          style={{
            marginHorizontal: 20,
            paddingBottom: 30,
          }}
        >
          <View
            style={{
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <SmallerJambiteText />
            <View
              style={{
                justifyContent: "flex-end",
                alignItems: "center",
                gap: 2,
                flexDirection: "row",
              }}
            >
              <TouchableOpacity
                onPress={() => router.push("/bottomtab/settings")}
              >
                <ProfileIcon />
              </TouchableOpacity>

              <Text style={styles.secondText}>{user.full_name}</Text>
            </View>
          </View>
          <View
            style={{
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  height: 40,
                  width: 40,
                  borderRadius: 30,
                  borderWidth: 7,
                  borderColor: "#0F065E",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  position: "relative",
                }}
              >
                <Text
                  style={{
                    fontSize: 15,
                    color: "#0F065E",
                    fontWeight: "800",
                  }}
                >
                  18
                </Text>
              </View>
              <View
                style={{
                  height: 11,
                  width: 50,
                  backgroundColor: "#0F065E",
                  borderRadius: 10,
                  position: "absolute",
                  bottom: -5,
                  left: -5,
                }}
              >
                <Text
                  style={{
                    fontSize: 5,
                    color: "#FFFFFF",
                    fontWeight: "600",
                    textAlign: "center",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  Before Examination
                </Text>
              </View>
            </View>
            <View style={styles.firstContainer}>
              <View style={styles.innerContainer}>
                <Text style={styles.firstText}>Study Progress</Text>
                <View style={styles.circularContainer}></View>
              </View>
              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  alignItems: "center",
                }}
              >
                <Text style={styles.firstText}>100/100</Text>
              </View>
            </View>
          </View>
          <Text style={styles.thirdText}>Ready to complete study today</Text>
          <View style={styles.secondContainer}>
            <View
              style={{
                justifyContent: "center",
                alignItems: "flex-end",
                paddingHorizontal: 10,
              }}
            >
              <Text style={styles.fourthText}>ITED</Text>
              {/* <SecondJambiteText /> */}
              <ThirdJambiteText />
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "flex-start",
              marginTop: 20,
            }}
          >
            <View
              style={{
                width: "48%",
              }}
            >
              <TouchableOpacity
                style={styles.smallContainer}
                onPress={() => {
                  router.push("/bottomtab/notes");
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <Text style={styles.fifthText}>Outline Notes</Text>
                  <OpenBookIcon />
                </View>
                <Text style={styles.sixthText}>
                  Read with your outline for each subject
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.smallContainer, { backgroundColor: "#EF0307" }]}
                onPress={() => {
                  router.push("/pastQuestion");
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <Text style={styles.fifthText}>Past Questions</Text>
                  <AskQuestion />
                </View>
                <Text style={styles.sixthText}>
                  Go through past questions and prepare ahead
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.smallContainer,
                  { backgroundColor: "#041C42D1" },
                ]}
                onPress={() => {
                  router.push("/activation");
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <Text style={styles.fifthText}>App Activation </Text>
                  <Activation />
                </View>
                <Text style={styles.sixthText}>
                  Activate your app to enjoy full version of the software
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                width: "48%",
              }}
            >
              <TouchableOpacity
                style={[
                  styles.smallContainer,
                  { backgroundColor: "#041C42B5" },
                ]}
                onPress={() => {
                  router.push("/bottomtab/exam/postUtme");
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <Text style={styles.fifthText}>POST UTME</Text>
                  <AddDocument />
                </View>
                <Text style={styles.sixthText}>
                  Go through your prefferd instifution POST UTME questions
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.smallContainer, { backgroundColor: "#1E1E1E" }]}
                onPress={() => {
                  router.push("/bottomtab/exam/cbt");
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <Text style={styles.fifthText}>CBT MODE</Text>
                  <LaptopWithCursor />
                </View>
                <Text style={styles.sixthText}>
                  If you are proud of yourself give it a try.
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.smallContainer, { backgroundColor: "#0F065E" }]}
                onPress={() => {
                  router.push("/scholarship");
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <Text style={styles.fifthText}>Scholarship</Text>
                  <Scholarship />
                </View>
                <Text style={styles.sixthText}>
                  IRegister and Stand the chance to become our best student.
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.fifthContainer}>
            <View style={styles.fourthContainer}>
              <View style={{ width: "80%" }}>
                <Text style={styles.seventhText}>App Update Available </Text>
                <Text style={styles.eighthText}>
                  Ited Jambite latest software version available .{" "}
                </Text>
              </View>
              <View style={{ width: "20%" }}>
                <Image source={FirstImage} />
              </View>
            </View>
            <TouchableOpacity
              style={styles.fourthContainer}
              onPress={() => {
                router.push("/cutoff");
              }}
            >
              <View style={{ width: "80%" }}>
                <Text style={styles.seventhText}>University/Cut Off Mark </Text>
                <Text style={styles.eighthText}>
                  Check out list of universities, thier cutoff marks and
                  accredited courses they offer .{" "}
                </Text>
              </View>
              <View style={{ width: "20%" }}>
                <UniversityCampus />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.fourthContainer}
              onPress={() => {
                router.push("/socials");
              }}
            >
              <View style={{ width: "50%" }}>
                <Text style={styles.seventhText}>Task/Refund</Text>
                <Text style={styles.eighthText}>
                  Check out simple ways to qualify for our random giveaway.{" "}
                </Text>
              </View>
              <View
                style={{
                  width: "50%",
                  justifyContent: "center",
                  alignItems: "flex-start",
                  flexDirection: "row",
                }}
              >
                <Instagram />
                <Telegram />
                <Facebook />
                <Tiktok />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  smallContainer: {
    backgroundColor: "#0F065E",
    borderRadius: 15,
    height: 90,
    justifyContent: "center",
    alignItems: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 20,
    marginTop: 5,
  },
  thirdContainer: {
    backgroundColor: "#FFFFFF",
    height: 500,
    marginTop: 20,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    elevation: 20,
    shadowOffset: {
      height: 20,
      width: 20,
    },
    shadowOpacity: 0.6,
    shadowRadius: 4,
    shadowColor: "#00000029",
  },
  fifthContainer: {
    backgroundColor: "#FFFFFF",
    height: 280,
    marginTop: 20,
    borderRadius: 20,
    padding: 10,
    elevation: 20,
    shadowOffset: {
      height: 20,
      width: 20,
    },
    shadowOpacity: 0.6,
    shadowRadius: 4,
    shadowColor: "#333333",
  },
  sixthContainer: {
    backgroundColor: "#FFFFFF",
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
  fourthContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderWidth: 1,
    borderColor: "#000000",
    borderRadius: 15,
    marginTop: 10,
  },

  firstContainer: {
    backgroundColor: "#0F065EF2",
    height: 60,
    width: "85%",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  secondContainer: {
    backgroundColor: "#FFFFFF",
    height: 140,
    borderBottomWidth: 4,
    borderTopWidth: 4,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderRadius: 10,
    borderColor: "#0F065E",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  firstText: {
    fontSize: 9,
    color: "#FFFFFF",
    fontWeight: "800",
  },
  secondText: {
    fontSize: 12,
    color: "#0F065E",
    fontWeight: "800",
  },
  thirdText: {
    fontSize: 10,
    color: "#0F065E",
    fontWeight: "600",
    marginTop: 30,
    marginBottom: 10,
    textAlign: "center",
  },
  fourthText: {
    fontSize: 12,
    color: "#0F065E",
    fontWeight: "800",
  },
  fifthText: {
    fontSize: 15,
    color: "#FFFFFF",
    fontWeight: "800",
    textDecorationLine: "underline",
  },
  sixthText: {
    fontSize: 7,
    color: "#FFFFFF",
    fontWeight: "600",
  },
  seventhText: {
    fontSize: 15,
    color: "#0F065E",
    textDecorationLine: "underline",
    fontWeight: "800",
  },
  eighthText: {
    fontSize: 10,
    color: "#0F065E",
    fontWeight: "600",
  },
  innerContainer: {
    borderWidth: 2,
    borderColor: "#FFFFFF",
    borderRadius: 10,
    height: 17,
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  circularContainer: {
    height: 10,
    width: 10,
    backgroundColor: "#FFFFFF",
    borderRadius: 6,
  },
});

export default home;
