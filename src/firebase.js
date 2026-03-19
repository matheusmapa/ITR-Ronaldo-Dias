import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDHKkG05Ou9OHLXCbeND3k8wgwU2j6q5Y4",
  authDomain: "metodoitr-4249f.firebaseapp.com",
  projectId: "metodoitr-4249f",
  storageBucket: "metodoitr-4249f.firebasestorage.app",
  messagingSenderId: "755730416442",
  appId: "1:755730416442:web:46265d524c47508fbf8603"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, db, storage };
