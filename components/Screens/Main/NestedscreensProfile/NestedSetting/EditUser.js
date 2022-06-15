import React from "react";
import { StyleSheet, View, Text } from "react-native";

const EditUser = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Edit user</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    fontWeight: "700",
    fontFamily: "LatoSemiBold",
    color: "#808080",
  },
});

export default EditUser;
