import firebase from "firebase/app"
import "firebase/firebase-storage"

const firebaseConfig = {
    apiKey: "AIzaSyCZRUs5Zr-yT7tdzxFaVcu8KoWGv7yVZRo",
    authDomain: "image-uploader-bdf5f.firebaseapp.com",
    projectId: "image-uploader-bdf5f",
    storageBucket: "image-uploader-bdf5f.appspot.com",
    messagingSenderId: "436474953633",
    appId: "1:436474953633:web:1f31b3a0063252ecbd15e0",
    measurementId: "G-XMR5LGRQEB"
}

firebase.initializeApp(firebaseConfig)

const storage = firebase.storage()

export default storage