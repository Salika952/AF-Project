import firebase from "firebase/app";
import "firebase/storage"

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA9xXECwhN0MkYZL-rqhOOwpqd2FIG9uCI",
    authDomain: "application-d8249.firebaseapp.com",
    projectId: "application-d8249",
    storageBucket: "application-d8249.appspot.com",
    messagingSenderId: "715204369697",
    appId: "1:715204369697:web:9ee89624ef622080107260",
    measurementId: "G-CXFJD380SX"
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default };

