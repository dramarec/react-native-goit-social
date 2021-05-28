import * as firebase from "firebase";
import "firebase/auth";
import "firebase/storage";
import "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBAGkWCvmCye8-cqPjeZUS25caRXQMm4NQ",
    authDomain: "rn-social-goit.firebaseapp.com",
    projectId: "rn-social-goit",
    storageBucket: "rn-social-goit.appspot.com",
    messagingSenderId: "788981913789",
    appId: "1:788981913789:web:b00b609f3dc6786c56bfd4"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export default firebase;