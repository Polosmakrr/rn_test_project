import { StatusBar } from "expo-status-bar";
import { useSelector } from "react-redux";
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  Alert,
} from "react-native";
import { useEffect, useState, useRef } from "react";
import { Gallery } from "../../Gallery/Gallery";
import { Input } from "../../Input/Input";
import { fetchByQuerry } from "../../Fetch";
import ModalWindow from "../../Modal/Modal";
import {
  addToRecentlyWatched,
  addToGallery,
  notReadyFunction,
} from "../../requestToServer";

const Search = () => {
  const [imgArray, setImgArray] = useState([]);
  const [totalPages, setTotalPages] = useState("");
  const [querry, setQuerry] = useState("");
  const [page, setPage] = useState(1);
  const [toggleModal, setToggleModal] = useState(false);
  const [itemImg, setItemImg] = useState("");
  const isFirstRender = useRef(true);

  const { userId, Name } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    fetchByQuerry(querry, page, fetchParam);
  }, [querry, page]);

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
    <View style={styles.container}>
      <ScrollView style={styles.containerGallery}>
        <Input setQuerry={changeQuerry} />
        <Gallery
          data={imgArray}
          choseImg={choseImg}
          addTo={addTo}
          download={download}
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
      <ModalWindow
        img={itemImg && itemImg.urls.full}
        toggleModal={toggleModal}
        closeModal={closeModal}
      />
      <StatusBar style="auto" hidden={true} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerGallery: {
    paddingVertical: 20,
    paddingHorizontal: 20,
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

export default Search;
