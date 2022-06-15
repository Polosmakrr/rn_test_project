import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
} from "react-native";
import { Gallery } from "../../../Gallery/Gallery";
import ModalWindow from "../../../Modal/Modal";
import {
  getRecently,
  addToGallery,
  notReadyFunction,
} from "../../../requestToServer";

const DefaultProfile = ({ navigation }) => {
  const [imgArr, setImgArr] = useState();
  const [toggleModal, setToggleModal] = useState(false);
  const [itemImg, setItemImg] = useState("");
  const { userId, Name } = useSelector((state) => state.auth);

  useEffect(() => {
    getRecently(userId, setImgArr);
  }, []);

  const choseImg = (index) => {
    setItemImg(imgArr.item[index]);
    setToggleModal(!toggleModal);
  };
  const closeModal = () => {
    setToggleModal(!toggleModal);
  };

  const addTo = (index) => {
    addToGallery(imgArr.item[index], userId, Name);
  };

  const download = (index) => {
    notReadyFunction();
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.navContainer}>
          <TouchableOpacity
            style={styles.navContainerBtn}
            activeOpacity={0.8}
            onPress={() => navigation.navigate("GalleryScreen")}
          >
            <Text style={styles.navBtnTitle}>Gallery</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.navContainerBtn}
            activeOpacity={0.8}
            onPress={() => navigation.navigate("SettingProfileScreen")}
          >
            <Text style={styles.navBtnTitle}>Setting</Text>
          </TouchableOpacity>
        </View>
        {imgArr && (
          <View>
            <Text style={styles.title}>Recently watched</Text>

            <Gallery
              data={imgArr.item.reverse()}
              choseImg={choseImg}
              addTo={addTo}
              download={download}
            />
          </View>
        )}
      </ScrollView>
      <View>
        <ModalWindow
          img={itemImg && itemImg.urls.full}
          toggleModal={toggleModal}
          closeModal={closeModal}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
  },
  navContainer: {
    paddingTop: 40,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  navContainerBtn: {
    height: 40,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 6,
    backgroundColor: "#808080",
    justifyContent: "center",
    alignItems: "center",
  },
  navBtnTitle: {
    fontSize: 18,
    fontWeight: "700",
    fontFamily: "LatoSemiBold",
    color: "#ffffff",
  },
  title: {
    paddingTop: 20,
    paddingBottom: 5,
    fontSize: 24,
    fontWeight: "700",
    fontFamily: "LatoSemiBold",
    textAlign: "center",
    color: "#4169e1",
  },
});

export default DefaultProfile;
