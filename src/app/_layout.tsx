import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { PersistGate } from "redux-persist/integration/react";
import Toast from "react-native-toast-message";
import { ActivityIndicator, View } from "react-native";
import { Provider } from "react-redux";
import { persistor, store } from "../components/redux/store";
import * as SystemUI from "expo-system-ui";
import * as SplashScreen from "expo-splash-screen";

SystemUI.setBackgroundColorAsync("transparent");

const RootLayout = () => {
  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();

        await new Promise((resolve) => setTimeout(resolve, 1000));
      } catch (e) {
        console.warn(e);
      } finally {
        SplashScreen.hideAsync();
      }
    }

    prepare();
  }, []);
  const LoadingSpinner = () => {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size={"large"} color={"red"} />
      </View>
    );
  };
  return (
    <>
      <StatusBar style="dark" />
      <Provider store={store}>
        <PersistGate loading={<LoadingSpinner />} persistor={persistor}>
          <Stack>
            <Stack.Screen
              name="index"
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="signin"
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="signup"
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="verification"
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="home"
              options={{
                headerShown: false,
              }}
            />

            <Stack.Screen
              name="exercise"
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="forgotPassword"
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="resetPassword"
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="editProfile"
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="activation"
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="scholarship"
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="about"
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="socials"
              options={{
                headerShown: false,
              }}
            />

            <Stack.Screen
              name="pastQuestion2"
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="subject"
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="bottomtab"
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="subjectNote"
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="subjectPastQuestion"
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="cbtQuestions"
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="forgotPasswordVerification"
              options={{
                headerShown: false,
              }}
            />
          </Stack>
          <Toast />
        </PersistGate>
      </Provider>
    </>
  );
};

export default RootLayout;
