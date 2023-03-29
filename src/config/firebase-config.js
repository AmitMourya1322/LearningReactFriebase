
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import {getAuth,GoogleAuthProvider} from 'firebase/auth'
import { getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyDghkzOy5liFtDRpKgAXdawwe1YbAtbCzk",
  authDomain: "fir-course-764ec.firebaseapp.com",
  projectId: "fir-course-764ec",
  storageBucket: "fir-course-764ec.appspot.com",
  messagingSenderId: "1035078651221",
  appId: "1:1035078651221:web:91dd20a33995db358173dc",
  measurementId: "G-FQNVPQPG84"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()
export const db = new getFirestore(app)
export const storage = getStorage(app)
