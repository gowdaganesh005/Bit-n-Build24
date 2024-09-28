
import { initializeApp } from 'firebase/app'; 
import { getAuth } from 'firebase/auth'; 
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDuzX_wuENVba-I8ht5g3r6UINsVK2Qi5k",
  authDomain: "bitnbuild-56387.firebaseapp.com",
  projectId: "bitnbuild-56387",
  storageBucket: "bitnbuild-56387.appspot.com",
  messagingSenderId: "379606949317",
  appId: "1:379606949317:web:a53d4207c88fe933b6bfac",
  measurementId: "G-FEM4521L8Y"
};


const app = initializeApp(firebaseConfig);


const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db,storage };
