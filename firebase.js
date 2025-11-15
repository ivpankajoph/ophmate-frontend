// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC89ClmuO5wu8m9oumoP2f-ERnPnCcVuCM",
  authDomain: "ophmate-b88fe.firebaseapp.com",
  projectId: "ophmate-b88fe",
  storageBucket: "ophmate-b88fe.firebasestorage.app",
  messagingSenderId: "992719640936",
  appId: "1:992719640936:web:c741532c44875829875edd",
  measurementId: "G-CN686811YH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);