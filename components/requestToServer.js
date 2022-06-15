import {
  PermissionsAndroid,
  Platform,
  Alert,
  ToastAndroid,
} from "react-native";
import { RNFetchBlob } from "rn-fetch-blob";
import { db } from "../fireBase/config";
import { doc, setDoc, getDoc, updateDoc, onSnapshot } from "firebase/firestore";
import { toastAddSuccess, toastRemoveSuccess, toastError } from "./Toasts";

export const addToRecentlyWatched = async (itemImg, userId, Name) => {
  try {
    const docRecent = await getDoc(doc(db, "recentlyWatched", userId));

    if (docRecent.exists()) {
      const serverData = docRecent.data().item;
      if (serverData.find((item) => item.id === itemImg.id)) {
        return;
      } else {
        await updateDoc(doc(db, "recentlyWatched", userId), {
          item: [...docRecent.data().item, itemImg],
        });
      }
    } else {
      await setDoc(doc(db, "recentlyWatched", userId), {
        item: [itemImg],
        Name,
        userId,
      });
    }
  } catch (error) {
    toastError(error.message);
  }
};

export const addToGallery = async (itemImg, userId, Name) => {
  try {
    const docGall = await getDoc(doc(db, "gallery", userId));
    if (docGall.exists()) {
      const serverData = docGall.data().item;
      if (serverData.find((item) => item.id === itemImg.id)) {
        Alert.alert("Ooops", "Picture already in the gallery!", [
          {
            text: "Ok",
          },
        ]);
        return;
      } else {
        await updateDoc(doc(db, "gallery", userId), {
          item: [...docGall.data().item, itemImg],
        });
        toastAddSuccess();
      }
      return;
    } else {
      await setDoc(doc(db, "gallery", userId), {
        item: [itemImg],
        Name,
        userId,
      });
      toastAddSuccess();
    }
  } catch (error) {
    toastError(error.message);
  }
};

export const removeFromGallery = async (itemImg, userId, Name) => {
  try {
    const docSnap = await getDoc(doc(db, "gallery", userId));
    if (docSnap.exists()) {
      const serverData = docSnap.data().item;
      const final = serverData.filter((item) => item.id !== itemImg.id);

      await setDoc(doc(db, "gallery", userId), {
        item: [...final],
        Name,
        userId,
      });
      toastRemoveSuccess();
    }
  } catch (error) {
    toastError(error.message);
  }
};

export const getGallery = async (userId, setImgArr) => {
  try {
    await onSnapshot(doc(db, "gallery", userId), (doc) => {
      setImgArr(doc.data());
    });
  } catch (error) {
    toastError(error.message);
  }
};

export const getRecently = async (userId, setImgArr) => {
  try {
    await onSnapshot(doc(db, "recentlyWatched", userId), (doc) => {
      setImgArr(doc.data());
    });
  } catch (error) {
    toastError(error.message);
  }
};

const downloadImg = (img) => {
  let date = new Date();
  let image_URl = img;
  console.log("URL:", image_URl);
  let ext = getExtention(image_URl);
  ext = "." + ext[0];

  console.log("EXT:", ext);

  const { config, fs } = RNFetchBlob;
  console.log("BLOBL", RNFetchBlob);
  let PictureDir = fs.dirs.PictureDir;
  console.log("DIR:", PictureDir);
  let options = {
    fileCahe: true,
    addAndroidDownloads: {
      useDownloadManager: true,
      notification: true,
      path:
        PictureDir +
        "/image_" +
        Math.floor(date.getTime() + date.getSeconds() / 2) +
        ext,
      description: "Image",
    },
  };
  config(options)
    .fetch("GET", image_URl)
    .then((res) => {
      console.log("tes=>", JSON.stringify(res));
      alert("Image downloaded Successfuly");
    });
};

const getExtention = (filename) => {
  console.log("FILENAME:", filename);
  return /[.]/.exec(filename) ? /[^.]+$/.exec(filename) : undefined;
};

export const checkPermision = async (img) => {
  if (Platform.OS === "ios") {
    downloadImg(img);
  } else {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: "Storage Permision Required",
          message: "App needs access to your storage to download Photos",
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log(
          "Storage Permision Granted",
          PermissionsAndroid.RESULTS.GRANTED
        );
        downloadImg(img);
      } else {
        alert("Storage Permission Not Granted");
      }
    } catch (error) {
      console.log("error:", error);
      console.log("error.message:", error.message);
    }
  }
};

export const notReadyFunction = () => {
  Alert.alert("Ooops", "This function not ready yet.", [
    {
      text: "Ok",
    },
  ]);
};
