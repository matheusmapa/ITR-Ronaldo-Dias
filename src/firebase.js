import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut,
  updateProfile,
  onAuthStateChanged
} from "firebase/auth";
import { 
  getFirestore, 
  doc, 
  getDoc, 
  setDoc, 
  serverTimestamp,
  collection,
  addDoc,
  query,
  where,
  orderBy,
  onSnapshot,
  runTransaction,
  updateDoc
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDHKkG05Ou9OHLXCbeND3k8wgwU2j6q5Y4",
  authDomain: "metodoitr-4249f.firebaseapp.com",
  projectId: "metodoitr-4249f",
  storageBucket: "metodoitr-4249f.firebasestorage.app",
  messagingSenderId: "755730416442",
  appId: "1:755730416442:web:46265d524c47508fbf8603"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// --- AUTHENTICATION SERVICES ---

export const loginUser = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const registerUser = async (email, password, name, role, pixKey, socialHandle) => {
  try {
    // 1. Auth Creation
    const { user } = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(user, { displayName: name });

    // 2. Database Profile Creation
    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      email: user.email,
      displayName: name,
      role: role, // 'advertiser' | 'clipper'
      pixKey: pixKey,
      socialHandle: socialHandle, // @instagram
      balance: role === 'advertiser' ? 2000 : 0, // Bônus inicial para testes
      reputationScore: 100, // Gamification futuro
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });

    // 3. Welcome Transaction (Bonus)
    if (role === 'advertiser') {
        await addDoc(collection(db, "transactions"), {
            userId: user.uid,
            type: 'deposit',
            amount: 2000,
            description: 'Bônus de Boas Vindas',
            date: serverTimestamp()
        });
    }

    return user;
  } catch (error) {
    console.error("Registration Error:", error);
    throw error;
  }
};

export const logoutUser = () => signOut(auth);

export { auth, db };
