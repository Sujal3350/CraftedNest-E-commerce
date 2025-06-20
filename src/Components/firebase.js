
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC09LHyx-tpJVKsTxWrWNseNjwT-t0HeAc",
  authDomain: "craftednest.firebaseapp.com",
  projectId: "craftednest",
  storageBucket: "craftednest.firebasestorage.app",
  messagingSenderId: "814301737341",
  appId: "1:814301737341:web:70e03bbedb82b50911dc14",
  measurementId: "G-QC96M4X5E6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
const db=getFirestore(app);
export default app;
export {db};