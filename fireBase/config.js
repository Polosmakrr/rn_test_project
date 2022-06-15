import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDbAmtWD89G_Hw-etJqK-jMO8V-Bvzc21Q",
  authDomain: "user-base-40bba.firebaseapp.com",
  projectId: "user-base-40bba",
  storageBucket: "user-base-40bba.appspot.com",
  messagingSenderId: "633362851295",
  appId: "1:633362851295:web:f9d04d95e94c722f69d06a",
  measurementId: "G-SZNLHBYTNB",
};

export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);

// export const storage = getStorage(app);
