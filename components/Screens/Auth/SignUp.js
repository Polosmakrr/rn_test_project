import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { AntDesign, Feather } from "@expo/vector-icons";
import { authSignUpUser } from "../../../redux/auth/authOperations";
import { useDispatch } from "react-redux";

const initialState = {
  name: "",
  email: "",
  password: "",
};

const SignUp = ({ navigation }) => {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [isShowPasswordIcon, setIsShowPasswordIcon] = useState("eye");
  const [isShowPassword, setIsShowPassword] = useState(true);
  const [state, setstate] = useState(initialState);
  const [orientation, setOrientation] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    onChangeOrientation();
    const subscription = Dimensions.addEventListener(
      "change",
      onChangeOrientation
    );
    return () => subscription.remove();
  }, []);

  const onChangeOrientation = () => {
    const dim = Dimensions.get("screen");
    if (dim.width > dim.height) {
      setOrientation("LANDSCAPE");
      return;
    }
    setOrientation("PORTRAIT");
  };

  const hideKeyboard = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  const showPassword = () => {
    if (isShowPassword) {
      setIsShowPasswordIcon("eye-off");
      setIsShowPassword(false);
      return;
    }
    setIsShowPasswordIcon("eye");
    setIsShowPassword(true);
  };

  const onSubmit = () => {
    setstate(initialState);
    setIsShowPasswordIcon("eye");
    setIsShowPassword(true);
    hideKeyboard();
    dispatch(authSignUpUser(state));
  };

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={hideKeyboard}>
        <ImageBackground
          style={styles.image}
          source={require("../../../image/background.png")}
        >
          <TouchableWithoutFeedback onPress={hideKeyboard}>
            <KeyboardAvoidingView
              behavior={Platform.OS == "ios" ? "padding" : "padding"}
            >
              <View style={styles.signUpTitleContainer}>
                <Text
                  style={{
                    ...styles.signUpTitle,
                    paddingBottom: orientation === "PORTRAIT" ? "20%" : "5%",
                  }}
                >
                  Register
                </Text>
              </View>
              <View
                style={{
                  ...styles.form,
                  marginBottom:
                    orientation === "PORTRAIT"
                      ? isShowKeyboard
                        ? "20%"
                        : "50%"
                      : isShowKeyboard
                      ? "3%"
                      : "2%",
                  paddingHorizontal: orientation === "PORTRAIT" ? "10%" : "10%",
                }}
              >
                <View style={styles.inputBlock}>
                  <Text style={styles.inputTitle}>NAME:</Text>
                  <AntDesign
                    style={{
                      ...styles.icon,
                      left: orientation === "PORTRAIT" ? "88%" : "93%",
                    }}
                    name="user"
                    size={24}
                    color="#778899"
                  />
                  <TextInput
                    style={styles.input}
                    placeholderTextColor={"#778899"}
                    placeholder="UserName"
                    onFocus={() => setIsShowKeyboard(true)}
                    value={state.name}
                    onChangeText={(value) =>
                      setstate((prevState) => ({ ...prevState, name: value }))
                    }
                  />
                </View>
                <View style={styles.inputBlock}>
                  <Text style={styles.inputTitle}>EMAIL:</Text>
                  <AntDesign
                    style={{
                      ...styles.icon,
                      left: orientation === "PORTRAIT" ? "88%" : "93%",
                    }}
                    name="mail"
                    size={24}
                    color="#778899"
                  />
                  <TextInput
                    style={styles.input}
                    placeholderTextColor={"#778899"}
                    placeholder="Email"
                    onFocus={() => setIsShowKeyboard(true)}
                    value={state.email}
                    onChangeText={(value) =>
                      setstate((prevState) => ({ ...prevState, email: value }))
                    }
                  />
                </View>
                <View style={styles.inputBlock}>
                  <Text style={styles.inputTitle}>PASSWORD:</Text>
                  <TouchableOpacity
                    style={{
                      ...styles.icon,
                      left: orientation === "PORTRAIT" ? "88%" : "93%",
                    }}
                    onPress={showPassword}
                  >
                    <Feather
                      name={isShowPasswordIcon}
                      size={24}
                      color="#778899"
                    />
                  </TouchableOpacity>
                  <TextInput
                    style={styles.input}
                    placeholderTextColor={"#778899"}
                    placeholder="Password"
                    onFocus={() => setIsShowKeyboard(true)}
                    secureTextEntry={isShowPassword}
                    value={state.password}
                    onChangeText={(value) =>
                      setstate((prevState) => ({
                        ...prevState,
                        password: value,
                      }))
                    }
                  />
                </View>
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={styles.containerBtn}
                  onPress={onSubmit}
                >
                  <Text style={styles.btnTitle}>SignUp</Text>
                </TouchableOpacity>
                <View style={styles.goToContainer}>
                  <Text
                    onPress={() => {
                      navigation.navigate("Login");
                    }}
                    style={styles.goTo}
                  >
                    Login
                  </Text>
                </View>
              </View>
              <StatusBar style="auto" hidden={true} />
            </KeyboardAvoidingView>
          </TouchableWithoutFeedback>
        </ImageBackground>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  image: {
    flex: 1,
    resizeMode: "center",
    justifyContent: "flex-end",
  },
  signUpTitleContainer: {
    alignItems: "center",
  },
  signUpTitle: {
    fontSize: 36,
    color: "#4169e1",
    fontWeight: "700",
    fontFamily: "LatoSemiBold",
  },
  form: {},
  inputBlock: {
    marginBottom: 20,
  },
  inputTitle: {
    color: "#778899",
    marginBottom: 5,
    fontSize: 18,
    fontWeight: "600",
    fontFamily: "LatoSemiBold",
  },
  icon: {
    position: "absolute",
    top: 35,
    zIndex: 1,
  },
  input: {
    borderWidth: 2,
    borderColor: "#dcdcdc",
    height: 40,
    borderRadius: 6,
    color: "#778899",
    paddingLeft: 10,
    paddingRight: 50,
    fontSize: 18,
    fontWeight: "400",
    fontFamily: "LatoRegular",
  },
  containerBtn: {
    height: 40,
    borderWidth: 2,
    borderRadius: 6,
    borderColor: "#dcdcdc",
    marginHorizontal: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  btnTitle: {
    fontSize: 18,
    fontWeight: "700",
    fontFamily: "LatoSemiBold",
    color: "#4169e1",
  },
  goToContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  goTo: {
    fontSize: 18,
    fontWeight: "700",
    fontFamily: "LatoSemiBold",
    color: "#ff6347",
  },
});

export default SignUp;
