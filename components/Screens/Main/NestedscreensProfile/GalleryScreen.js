import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import { useRoute } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { Gallery } from "../../../Gallery/Gallery";
import ModalWindow from "../../../Modal/Modal";
import {
  removeFromGallery,
  getGallery,
  notReadyFunction,
} from "../../../requestToServer";

const GalleryScreen = () => {
  const [imgArr, setImgArr] = useState();
  const { userId, Name } = useSelector((state) => state.auth);
  const [toggleModal, setToggleModal] = useState(false);
  const [itemImg, setItemImg] = useState("");

  const route = useRoute();

  useEffect(() => {
    getGallery(userId, setImgArr);
  }, []);

  const choseImg = (index) => {
    setItemImg(imgArr.item[index]);
    setToggleModal(!toggleModal);
  };
  const closeModal = () => {
    setToggleModal(!toggleModal);
  };

  const removeImg = (index) => {
    removeFromGallery(imgArr.item[index], userId, Name);
  };

  const download = (index) => {
    notReadyFunction();
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        {imgArr ? (
          <View>
            <Text style={styles.title}>My Gallery</Text>
            <Gallery
              data={imgArr.item.reverse()}
              choseImg={choseImg}
              remove={removeImg}
              download={download}
              screen={route.name}
            />
          </View>
        ) : (
          <View style={{ paddingVertical: "100%" }}>
            <Text style={styles.title}>Oops, Gallery is Empty!</Text>
          </View>
        )}
      </ScrollView>
      <ModalWindow
        img={itemImg && itemImg.urls.full}
        toggleModal={toggleModal}
        closeModal={closeModal}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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

export default GalleryScreen;
