import {
  collection,
  doc,
  getFirestore,
  getDoc,
  getDocs,
  DocumentData,
  QueryDocumentSnapshot
} from "firebase/firestore";
import app from "./../firebase";

const db = getFirestore(app);

interface productType {
  ID: string;
  ULbeneficii: [];
  firstDescription: string;
  imageProduct: [];
  jsonContent: string;
  price: string;
  reviews: {};
  shortDescription: string;
  title: string;
}
export const getOrderByID = async (invoiceID: number) => {
  const productData = doc(db, "orders", invoiceID.toString());
  const snap = await getDoc(productData);
  let productsAreHere;
  if (snap.exists()) {
    productsAreHere = snap.data();
  }

  return productsAreHere;
};
export const getAllOrders = async () => {
  const snapShot = await getDocs(collection(db, "orders"));
  let dataProducts = [];

  snapShot.forEach((doc: QueryDocumentSnapshot<DocumentData>) => {
    dataProducts.push(doc.data());
  });

  return dataProducts;
};
export const getData = async () => {
  const snapShot = await getDocs(collection(db, "products"));
  let dataProducts = {};

  snapShot.forEach((doc) => {
    Object.values(doc.data()).forEach((itemData: productType) => {
      dataProducts = {
        ...dataProducts,
        [itemData.ID]: {
          ID: itemData.ID,
          ULbeneficii: itemData.ULbeneficii,
          firstDescription: itemData.firstDescription,
          imageProduct: itemData.imageProduct,
          jsonContent: itemData.jsonContent,
          price: itemData.price,
          reviews: itemData.reviews,
          shortDescription: itemData.shortDescription,
          title: itemData.title
        }
      };
    });
  });
  return dataProducts;
};

export const getProductWithID = async (productID: string) => {
  //here productID might be ''
  const productData = doc(db, "products", "activeProds");
  const snap = await getDoc(productData);
  let productsAreHere;
  if (snap.exists()) {
    Object.values(snap.data()).map((item: productType) => {
      productsAreHere = {
        ...productsAreHere,
        [item.ID]: {
          ID: item.ID,
          ULbeneficii: item.ULbeneficii,
          firstDescription: item.firstDescription,
          imageProduct: item.imageProduct,
          jsonContent: item.jsonContent,
          price: item.price,
          reviews: item.reviews,
          shortDescription: item.shortDescription,
          title: item.title
        }
      };
    });
    // productsAreHere = Object.values(snap.data());
  }
  //Here we need to make the call for a specific ID, not for the whole collection of products.
  //but till then, we will do this way.
  console.log("getProductWithID will return :", productsAreHere);

  return productsAreHere;
};
// const getallPr = async () => {
//   const productData = doc(db, "products", "activeProds");
//   const snap = await getDoc(productData);
//   let productsAreHere: any[] = [];
//   if (snap.exists()) {
//     productsAreHere = Object.values(snap.data());
//   }
//   //Here we need to make the call for a specific ID, not for the whole collection of products.
//   //but till then, we will do this way.
//   console.log("getProductWithID will return :", productsAreHere);

//   return productsAreHere;
// };
