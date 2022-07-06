import firebase from "firebase";
import "firebase/storage";
import md5 from "md5";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGER_SENDING_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMEBT_ID,
};

firebase.initializeApp(firebaseConfig);

const storageRef = firebase.storage().ref();

export const uploadPhoto = async (file: any) => {
  const snap = await storageRef.child(`${md5(file.name)}.jpg`).put(file);
  const url = await snap.ref.getDownloadURL();
  return url;
};

export default firebase;
