import images from "./../data/images";
import { collection, doc, setDoc, getFirestore, getDoc, getDocs } from "firebase/firestore";
import app from "./../firebase";

var productList = [];

const db = getFirestore(app);

export const getOrderByID = async (invoiceID: number) => {
  const productData = doc(db, "orders", invoiceID.toString());
  const snap = await getDoc(productData);
  var productsAreHere;
  if (snap.exists()) {
    productsAreHere = snap.data();
  }

  return productsAreHere;
};
export const getData = async () => {
  const snapShot = await getDocs(collection(db, "products"));
  var dataProducts = [];

  snapShot.forEach((doc) => {
    Object.values(doc.data()).forEach((itemData) => dataProducts.push(itemData));
  });
  console.log("End of ", dataProducts);
  return dataProducts;
};

export const getProductWithID = async (productID: number) => {
  const productData = doc(db, "products", "activeProds");
  const snap = await getDoc(productData);
  var productsAreHere = [];
  if (snap.exists()) {
    productsAreHere = Object.values(snap.data());
  }
  //Here we need to make the call for a specific ID, not for the whole collection of products.
  //but till then, we will do this way.
  console.log("getProductWithID will return :", productsAreHere);

  return productsAreHere;
};
const getallPr = async () => {
  const productData = doc(db, "products", "activeProds");
  const snap = await getDoc(productData);
  var productsAreHere = [];
  if (snap.exists()) {
    productsAreHere = Object.values(snap.data());
  }
  //Here we need to make the call for a specific ID, not for the whole collection of products.
  //but till then, we will do this way.
  console.log("getProductWithID will return :", productsAreHere);

  return productsAreHere;
};

console.log("ProductList is loading...");
getallPr().then((data) => {
  productList = data;
  console.log("Done");
});

export default productList;
