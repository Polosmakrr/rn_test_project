import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import { authSignOutUser } from "../../../../../redux/auth/authOperations";

const DefaultSettingScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  return (
    <View style={styles.container}>
      <View style={styles.list}>
        <TouchableOpacity
          style={styles.listItem}
          activeOpacity={0.8}
          onPress={() => navigation.navigate("EditUser")}
        >
          <Text style={styles.itemText}>Edit User</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.listItem}
          activeOpacity={0.8}
          onPress={() => dispatch(authSignOutUser())}
        >
          <Text style={styles.itemText}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  list: {
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  listItem: {
    marginBottom: 10,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#dcdcdc",

    borderRadius: 6,
  },
  itemText: {
    fontSize: 18,
    fontWeight: "700",
    fontFamily: "LatoSemiBold",
    color: "#808080",
  },
});

export default DefaultSettingScreen;
