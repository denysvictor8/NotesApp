import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://support.google.com/firebase/answer/7015592
const firebaseConfig = {
  // sua conexao com  firebase
  // your connection with firebase  
};

const app = initializeApp(firebaseConfig); 
const db = getFirestore(app); 
export default db;
