import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import {
    getFirestore,
    collection,
    addDoc,
    doc,
    getDocs,
    getDoc
} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";
import {
    getStorage,
    ref,
    uploadBytes,
    uploadBytesResumable,
    getDownloadURL
} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-storage.js";
import {
    onAuthStateChanged,
    signInWithEmailAndPassword,
    getAuth,
    createUserWithEmailAndPassword,
} from 'https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js'
const firebaseConfig = {
    apiKey: "AIzaSyCYjYAnaTStvu80pw4C_yANDzSnf4Bwrlg",
    authDomain: "blog-web-60c7e.firebaseapp.com",
    projectId: "blog-web-60c7e",
    storageBucket: "blog-web-60c7e.appspot.com",
    messagingSenderId: "492972165134",
    appId: "1:492972165134:web:7d244cb50ae274c74e145f",
    measurementId: "G-SSCG1ZHMSE"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);
const storage = getStorage(app);
const storageRef = ref(storage);



export {
    app,
    auth,
    onAuthStateChanged,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    storage,
    db,
    addDoc,
    collection,
    storageRef,
    uploadBytes,
    ref,
    uploadBytesResumable,
    getDownloadURL,
    doc,
    getDocs,
    getDoc
}