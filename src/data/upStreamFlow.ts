import { collection, doc, setDoc, getFirestore, getDoc, getDocs } from "firebase/firestore";
import app from "../firebase";

const db = getFirestore(app);
export const sendReview = async (data: string) => {
  console.log("Preparing to send data");
};