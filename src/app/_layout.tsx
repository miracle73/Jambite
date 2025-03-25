import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";

const RootLayout = () => {
  return (
    <>
      <StatusBar style="dark" />
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
          name="settings"
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
          name="notes"
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
          name="pastQuestion"
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
          name="postUtme"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="cbt"
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
      </Stack>
    </>
  );
};

export default RootLayout;
