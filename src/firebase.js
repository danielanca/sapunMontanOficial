import { initializeApp } from "firebase/app";

import { getAnalytics } from "firebase/analytics";
import "firebase/storage";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDxmbqzBXpIUoYCevqizlncQ80CH9b8--s",
  authDomain: "diniubire-89ce0.firebaseapp.com",
  projectId: "diniubire-89ce0",
  storageBucket: "diniubire-89ce0.appspot.com",
  messagingSenderId: "207405173084",
  appId: "1:207405173084:web:1bfdc7d5f35678d9789999",
  measurementId: "G-WFWYP44Z7L"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app);

export { storage };
export default app;
