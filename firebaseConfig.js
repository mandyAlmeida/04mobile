import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "xxxxxxxxxxxx",
    authDomain: "xxxxxxxxxxxxxxxxxx.firebaseapp.com",
    projectId: "xxxxxxxxxxxxxx",
    storageBucket: "xxxxxxxxx",
    messagingSenderId: "6000000000000",
    appId: "0:00000000000000000000000000000000"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

