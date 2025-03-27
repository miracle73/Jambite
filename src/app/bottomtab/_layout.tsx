import { Tabs } from "expo-router";
import { FontAwesome6 } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { View, StyleSheet } from "react-native";
import {
  CBTIcon,
  Home,
  NotesIcon,
  PostUtmeIcon,
  SettingsIcon,
} from "../../../assets/svg";

const TabsLayout = () => {
  const router = useRouter();
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false, // Hides the tab titles
        tabBarStyle: {
          backgroundColor: "#0F065E", // Sets bottom navigation background color
        },
        tabBarActiveTintColor: "white", // Sets active icon color
        tabBarInactiveTintColor: "gray", // Sets inactive icon color
      }}
    >
      <Tabs.Screen
        name="pastQuestion"
        options={{
          //   title: "Home",

          headerShown: false,

          tabBarIcon: ({ size, color }) => <Home />,
        }}
      />
      <Tabs.Screen
        name="notes"
        options={{
          //   title: "Notes",

          headerShown: false,
          tabBarIcon: ({ size, color }) => <NotesIcon />,
        }}
      />

      <Tabs.Screen
        name="exam"
        options={{
          //   title: "exam",
          headerShown: false,

          tabBarIcon: ({ size, color }) => <CBTIcon />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          //   title: "Settings",
          headerShown: false,
          tabBarIcon: ({ size, color }) => <SettingsIcon />,
        }}
      />
    </Tabs>
  );
};
const styles = StyleSheet.create({});

export default TabsLayout;
