import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";

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

async function testWrite() {
  console.log("Starting Firebase write test on OFFICIAL PROJECT...");
  try {
    const testDoc = doc(db, "lead_interactions", "test_doc_" + Date.now());
    console.log("Writing to:", testDoc.path);
    await setDoc(testDoc, { action: "TEST", source: "NodeJS", time: new Date().toISOString() });
    console.log("🔥 SUCESSO! Banco de Dados Oficial conectou e gravou a interação de teste!");
    process.exit(0);
  } catch (err) {
    console.error("❌ ERRO! O banco recusou a gravação:", err);
    process.exit(1);
  }
}

testWrite();
