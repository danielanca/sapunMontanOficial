import { doc, getFirestore, getDoc } from "firebase/firestore";

import app from "./../firebase";

const db = getFirestore(app);

export const getData = async () => {
  const documentRef = doc(db, "products", "activeProds");
  let fetchedData = null;
  const docSnap = await getDoc(documentRef);

  if (docSnap.exists()) {
    fetchedData = docSnap.data();
    console.log("Data arrived:", fetchedData);
  } else {
    console.log("No documents found");
  }

  return fetchedData;
};
