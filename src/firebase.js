import { initializeApp } from "firebase/app";

import { getAnalytics } from "firebase/analytics";
import "firebase/storage";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBU-XLXRpmXuGWH8D0XLFRGU4-UA-b_fbg",
  authDomain: "sapunmontan.firebaseapp.com",
  databaseURL: "https://sapunmontan-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "sapunmontan",
  storageBucket: "sapunmontan.appspot.com",
  messagingSenderId: "763434878339",
  appId: "1:763434878339:web:287dd37cd472f368b5a2b6",
  measurementId: "G-71TJGXC0TV"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app);

export { storage };
export default app;
