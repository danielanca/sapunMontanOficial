import images from "./../data/images";
import { collection, doc, setDoc, getFirestore, getDoc } from "firebase/firestore";

import app from "./../firebase";
import { firebaseConfig } from "firebase-functions/v1";
import { Item } from "react-html-email";
import { forEach, values } from "lodash";
import { title } from "process";

const db = getFirestore(app);

export const getData = async () => {
  const documentRef = doc(db, "products", "activeProds");
  var fetchedData = null;
  const docSnap = await getDoc(documentRef);

  if (docSnap.exists()) {
    fetchedData = docSnap.data();
    console.log("Data arrived:", fetchedData);
  } else {
    console.log("No documents found");
  }

  return fetchedData;
};
