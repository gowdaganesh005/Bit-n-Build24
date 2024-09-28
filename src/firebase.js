// firebase.js

// Correct imports for Firebase v9+
import { initializeApp } from 'firebase/app'; // No default import from 'firebase/app'
import { getAuth } from 'firebase/auth'; 
import { getFirestore } from 'firebase/firestore';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDuzX_wuENVba-I8ht5g3r6UINsVK2Qi5k",
  authDomain: "bitnbuild-56387.firebaseapp.com",
  projectId: "bitnbuild-56387",
  storageBucket: "bitnbuild-56387.appspot.com",
  messagingSenderId: "379606949317",
  appId: "1:379606949317:web:a53d4207c88fe933b6bfac",
  measurementId: "G-FEM4521L8Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firebase services
const auth = getAuth(app);
const firestore = getFirestore(app);

export { auth, firestore };
