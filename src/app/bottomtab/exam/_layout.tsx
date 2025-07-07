import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { PersistGate } from "redux-persist/integration/react";
import Toast from "react-native-toast-message";
import { ActivityIndicator, View } from "react-native";

const ExamLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen
          name="cbt"
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
      </Stack>
    </>
  );
};

export default ExamLayout;
