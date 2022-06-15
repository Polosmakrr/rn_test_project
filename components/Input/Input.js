import { useState } from "react";
import {
  Text,
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
  Alert,
} from "react-native";

export const Input = ({ setQuerry }) => {
  const [value, setValue] = useState("");

  const onPress = () => {
    if (value.trim().length === 0) {
      Alert.alert("Ooops", "This line can't be an empty!", [
        {
          text: "Ok",
        },
      ]);
      return;
    }
    setQuerry(value);
    setValue("");
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Let's serch image"
        placeholderTextColor={"#778899"}
        onChangeText={setValue}
        value={value}
        style={styles.input}
      />
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.containerBtn}
        onPress={onPress}
      >
        <Text style={styles.btnTitle}>Go!</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 40,
  },
  input: {
    paddingLeft: 10,
    marginRight: 20,
    fontSize: 18,
    fontWeight: "400",
    fontFamily: "LatoRegular",
    width: "60%",
    height: 40,
    color: "#778899",
    borderStyle: "solid",
    borderBottomWidth: 2,
    borderBottomColor: "#ff6347",
  },
  containerBtn: {
    height: 40,
    width: 40,
    borderRadius: 6,
    backgroundColor: "#4169e1",
    borderColor: "#dcdcdc",
    justifyContent: "center",
    alignItems: "center",
  },
  btnTitle: {
    fontSize: 18,
    fontWeight: "700",
    fontFamily: "LatoSemiBold",
    color: "#fff",
  },
});
