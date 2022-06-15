import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
} from "react-native";
import { useSelector } from "react-redux";
import { fetchPopular } from "../../Fetch";
import { Gallery } from "../../Gallery/Gallery";
import ModalWindow from "../../Modal/Modal";
import {
  addToRecentlyWatched,
  addToGallery,
  notReadyFunction,
} from "../../requestToServer";

const Popular = () => {
  const [imgArray, setImgArray] = useState([]);
  const [querry, setQuerry] = useState("Popular");
  const [page, setPage] = useState(1);
  const [toggleModal, setToggleModal] = useState(false);
  const [itemImg, setItemImg] = useState("");

  const { userId, Name } = useSelector((state) => state.auth);

  useEffect(() => {
    fetchPopular(page, querry, fetchPop);
  }, [page, querry]);

  const fetchPop = (imgs) => {
    setImgArray(imgArray.concat(imgs));
  };

  const newQuerry = (value) => {
    setQuerry(value);
    setImgArray([]);
    setPage(1);
  };

  const changePage = () => {
    let nextPage = page + 1;
    setPage(nextPage);
  };

  const choseImg = (index) => {
    setItemImg(imgArray[index]);
    setToggleModal(!toggleModal);
  };
  const closeModal = () => {
    setToggleModal(!toggleModal);
    addToRecentlyWatched(itemImg, userId, Name);
  };

  const addTo = (index) => {
    addToGallery(imgArray[index], userId, Name);
  };

  const download = (index) => {
    notReadyFunction();
  };
  return (
    <ScrollView style={styles.container}>
      <View style={styles.filter}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.filterBtn}
          onPress={() => newQuerry("popular")}
        >
          <Text style={styles.filterBtnTitle} key="popular" id="popular">
            Popular
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.filterBtn}
          onPress={() => newQuerry("latest")}
        >
          <Text style={styles.filterBtnTitle}>Latest</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.filterBtn}
          onPress={() => newQuerry("oldest")}
        >
          <Text style={styles.filterBtnTitle}>Oldest</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>{querry}</Text>
      <Gallery
        data={imgArray}
        choseImg={choseImg}
        addTo={addTo}
        download={download}
      />
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.containerBtn}
        onPress={changePage}
      >
        <Text style={styles.btnTitle}>Load More</Text>
      </TouchableOpacity>
      <View>
        <ModalWindow
          img={itemImg && itemImg.urls.full}
          toggleModal={toggleModal}
          closeModal={closeModal}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
  },
  filter: {
    paddingTop: 40,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  filterBtn: {
    height: 40,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 6,
    backgroundColor: "#808080",
    justifyContent: "center",
    alignItems: "center",
  },
  filterBtnTitle: {
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
  containerBtn: {
    height: 40,
    marginHorizontal: 60,
    marginBottom: 23,
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

export default Popular;
