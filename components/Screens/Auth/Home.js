import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  ImageBackground,
  Alert,
  Dimensions,
} from "react-native";
import { useEffect, useState, useRef } from "react";
import { Gallery } from "../../Gallery/Gallery";
import { Input } from "../../Input/Input";
import { fetchByQuerry } from "../../Fetch";
import ModalWindow from "../../Modal/Modal";

const Home = ({ navigation }) => {
  const [imgArray, setImgArray] = useState([]);
  const [totalPages, setTotalPages] = useState("");
  const [querry, setQuerry] = useState("");
  const [page, setPage] = useState(1);
  const [toggleModal, setToggleModal] = useState(false);
  const [largeImg, setLargeImg] = useState("");
  const [orientation, setOrientation] = useState("");
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    fetchByQuerry(querry, page, fetchParam);
  }, [querry, page]);

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

  const fetchParam = (tPage, imgs) => {
    if (tPage === 0) {
      Alert.alert("Ooops", "Nothing to found, try another word!", [
        {
          text: "Ok",
        },
      ]);
    }
    setTotalPages(tPage);
    setImgArray(imgArray.concat(imgs));
  };

  const changeQuerry = (value) => {
    setQuerry(value);
    setPage(1);
    setImgArray([]);
  };

  const changePage = () => {
    let nextPage = page + 1;
    setPage(nextPage);
  };

  const choseImg = (index) => {
    setLargeImg(imgArray[index].urls.full);
    setToggleModal(!toggleModal);
  };

  const closeModal = () => {
    setToggleModal(!toggleModal);
  };

  const shouldToLogIn = () => {
    Alert.alert("Ooops", "At first should to LogIn", [
      {
        text: "Ok",
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.image}
        source={require("../../../image/background.png")}
      >
        <ScrollView style={styles.containerGallery}>
          <View
            style={{
              ...styles.navigation,
              paddingBottom: orientation === "PORTRAIT" ? "10%" : "3%",
              marginTop: orientation === "PORTRAIT" ? "50%" : 0,
            }}
          >
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.navigationBtnLogin}
              onPress={() => {
                navigation.navigate("Login");
              }}
            >
              <Text style={styles.navigationTitle}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.navigationBtnRegister}
              onPress={() => {
                navigation.navigate("SignUp");
              }}
            >
              <Text style={styles.navigationTitle}>Register</Text>
            </TouchableOpacity>
          </View>
          <Input setQuerry={changeQuerry} />
          <Gallery
            data={imgArray}
            choseImg={choseImg}
            addTo={shouldToLogIn}
            download={shouldToLogIn}
          />
          {page !== totalPages && imgArray.length !== 0 && (
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.containerBtn}
              onPress={changePage}
            >
              <Text style={styles.btnTitle}>Load More</Text>
            </TouchableOpacity>
          )}
        </ScrollView>
        <View>
          <ModalWindow
            img={largeImg}
            toggleModal={toggleModal}
            closeModal={closeModal}
          />
        </View>
      </ImageBackground>
      <StatusBar style="auto" hidden={true} />
    </View>
  );
};

const styles = StyleSheet.create({
  navigation: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  navigationBtnLogin: {
    height: 40,
    width: 100,
    backgroundColor: "#4169e1",
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  navigationBtnRegister: {
    height: 40,
    width: 100,
    backgroundColor: "#ff6347",
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  navigationTitle: {
    fontSize: 18,
    fontWeight: "700",
    fontFamily: "LatoSemiBold",
    color: "#ffffff",
  },
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    resizeMode: "center",
  },
  containerGallery: {
    paddingVertical: "5%",
    paddingHorizontal: "5%",
  },
  containerBtn: {
    height: 40,
    borderRadius: 6,
    marginBottom: "10%",
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

export default Home;
