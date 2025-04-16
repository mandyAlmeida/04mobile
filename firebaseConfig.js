import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyA290FK9RedRVIjVChpQbjkf97FBu5JfVg",
    authDomain: "diary-app-69735.firebaseapp.com",
    projectId: "diary-app-69735",
    storageBucket: "diary-app-69735.appspot.com",
    messagingSenderId: "685072447248",
    appId: "1:685072447248:web:db2dc0ff56a8632f0dd795"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);