import { Tabs } from "expo-router";
import { FontAwesome6 } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { View, StyleSheet } from "react-native";
import {
  CBTIcon,
  NotesIcon,
  PostUtmeIcon,
  SettingsIcon,
} from "../../../assets/svg";

const TabsLayout = () => {
  const router = useRouter();
  return (
    <Tabs screenOptions={({ route }) => ({})}>
      <Tabs.Screen
        name="settings"
        options={{
          //   title: "Home",
          headerShown: false,
          tabBarIcon: ({ size, color }) => <SettingsIcon />,
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
        name="pastQuestion"
        options={{
          //   title: "Edu",

          //   headerTitleAlign: "center",
          headerShown: false,

          tabBarIcon: ({ size, color }) => (
            <FontAwesome6 name="file-circle-question" color="white" size={15} />
          ),
        }}
      />
      <Tabs.Screen
        name="cbt"
        options={{
          //   title: "Calculator",
          headerShown: false,

          tabBarIcon: ({ size, color }) => <CBTIcon />,
        }}
      />
      <Tabs.Screen
        name="postUtme"
        options={{
          //   title: "More",
          headerShown: false,

          tabBarIcon: ({ size, color }) => <PostUtmeIcon />,
        }}
      />
    </Tabs>
  );
};
const styles = StyleSheet.create({});

export default TabsLayout;
