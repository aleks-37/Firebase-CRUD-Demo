import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBYJJy0v9_wSHgfuOpmnvgDyv0eNSAibmiM",
  authDomain: "webdevfinal-9ec36.firebaseapp.com",
  projectId: "webdevfinal-9ec36",
  storageBucket: "webdevfinal-9ec36.appspot.com",
  messagingSenderId: "826736259121",
  appId: "1:826736259121:web:b2a60470ffe3bca5a6510",
  measurementId: "G-JNE59WS3M1"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
