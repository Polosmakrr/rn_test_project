import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import DefaultSettingScreen from "./DefaultSettingScreen";
import EditUser from "./EditUser";
const NestedScreen = createStackNavigator();

const SettingScreen = () => {
  return (
    <NestedScreen.Navigator>
      <NestedScreen.Screen
        options={{ headerShown: false }}
        name="DefaultSettingScreen"
        component={DefaultSettingScreen}
      />
      <NestedScreen.Screen
        options={{ headerShown: false }}
        name="EditUser"
        component={EditUser}
      />
    </NestedScreen.Navigator>
  );
};

export default SettingScreen;
