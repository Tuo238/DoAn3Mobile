// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
// import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDLrvN__ef7641cjFPzS1BRUg3Ka3Shrms",
  authDomain: "doan3mobile.firebaseapp.com",
  projectId: "doan3mobile",
  storageBucket: "doan3mobile.appspot.com",
  messagingSenderId: "224023836239",
  appId: "1:224023836239:web:f3c8cfe6a14b73e1f55c3a",
};
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
// export const db = getFirestore(app);
