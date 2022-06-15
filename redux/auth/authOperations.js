import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth } from "../../fireBase/config";
import { authSlice } from "../auth/authReducer";

export const authSignInUser =
  ({ email, password }) =>
  async (dispatch, getState) => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.log("error:", error);
      console.log("error.message:", error.message);
    }
  };

export const authSignUpUser =
  ({ email, password, name }) =>
  async (dispatch, getState) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);

      const user = await getAuth().currentUser;
      await updateProfile(user, { displayName: name });
      const { uid, displayName } = await getAuth().currentUser;
      dispatch(
        authSlice.actions.updateUserProfile({
          userId: uid,
          Name: displayName,
        })
      );
    } catch (error) {
      console.log("error:", error);
      console.log("error.message:", error.message);
    }
  };

export const authStateChangeUser = () => async (dispatch, getState) => {
  try {
    await onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          authSlice.actions.updateUserProfile({
            userId: user.uid,
            Name: user.displayName,
          })
        );
        dispatch(
          authSlice.actions.authStateChange({
            stateChange: true,
          })
        );
      }
    });
  } catch (error) {
    console.log("error:", error);
    console.log("error.message:", error.message);
  }
};

export const authSignOutUser = () => async (dispatch, getState) => {
  try {
    signOut(auth);
    dispatch(authSlice.actions.authSignOut());
  } catch (error) {
    console.log("error:", error);
    console.log("error.message:", error.message);
  }
};
