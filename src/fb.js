// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, set } from "firebase/database"
// import firebase from 'firebase';
import 'firebase/firestore';


//import '@/firebase/firestore'
// import './firebase'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDpSbbbVl6EkKvnnCWZHZ6ABtBHzTMH0nY",
    authDomain: "todo-ninja-2fe69.firebaseapp.com",
    projectId: "todo-ninja-2fe69",
    storageBucket: "todo-ninja-2fe69.appspot.com",
    messagingSenderId: "989415447302",
    appId: "1:989415447302:web:0fdf5d825bb4cf71d79c87",
    measurementId: "G-WFJH7RPJL4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase(app)
//db.settings({timestampsInSnapshots: true})


// function writeData(title, person, due, status, content) {
//     const db = getDatabase()
//     const reference = ref(db, 'projects/')
//     set(reference, {
//         title: title,
//         person: person,
//         due: due,
//         status: status,
//         content: content
//     })
// }




export default db