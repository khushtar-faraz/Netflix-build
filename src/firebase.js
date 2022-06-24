import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD-rcNWSw3ine-5YFDw6pKvt2NtHLGzzJ0",
  authDomain: "netflix-clone-c6622.firebaseapp.com",
  projectId: "netflix-clone-c6622",
  storageBucket: "netflix-clone-c6622.appspot.com",
  messagingSenderId: "150972214297",
  appId: "1:150972214297:web:1829a832ea2682e34f4e88",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();

export { auth };
export default db;
