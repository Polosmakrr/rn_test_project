import { ToastAndroid } from "react-native";

export const toastAddSuccess = () => {
  ToastAndroid.showWithGravityAndOffset(
    "Was added to gallery!",
    ToastAndroid.LONG,
    ToastAndroid.BOTTOM,
    25,
    50
  );
};

export const toastRemoveSuccess = () => {
  ToastAndroid.showWithGravityAndOffset(
    "Image was deleted!",
    ToastAndroid.LONG,
    ToastAndroid.BOTTOM,
    25,
    50
  );
};

export const toastError = (error) => {
  ToastAndroid.showWithGravityAndOffset(
    error,
    ToastAndroid.LONG,
    ToastAndroid.BOTTOM,
    25,
    50
  );
};
