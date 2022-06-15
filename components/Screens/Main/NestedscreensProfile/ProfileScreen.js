import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import DefaultProfile from "./DefaultProfile";
import GalleryScreen from "./GalleryScreen";
import SettingScreen from "./NestedSetting/SettingScreen";

const NestedScreen = createStackNavigator();

const ProfileScreen = () => {
  return (
    <NestedScreen.Navigator>
      <NestedScreen.Screen
        options={{ headerShown: false }}
        name="DefaultProfile"
        component={DefaultProfile}
      />
      <NestedScreen.Screen
        options={{ headerShown: false }}
        name="GalleryScreen"
        component={GalleryScreen}
      />
      <NestedScreen.Screen
        options={{ headerShown: false }}
        name="SettingProfileScreen"
        component={SettingScreen}
      />
    </NestedScreen.Navigator>
  );
};

export default ProfileScreen;
