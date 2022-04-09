import images from "./../data/images";
import { collection, doc, setDoc, getFirestore, getDoc, getDocs } from "firebase/firestore";
import app from "./../firebase";

const productList = [
  {
    title: "Sapun Montan Carbune Activ ",
    price: "40",
    shortDescription: " Un sapun dedicat fetei tale si minilor tale pentru o ingrijire in profunzime",
    firstDescription:
      "Pachetul de Scrub si Sapun indragit de toata lumea va garanteaza rasfatul pielii dvs. Săpunul negru ce conține cărbune activat pentru un ten neted  și mătăsos, este cel mai îndrăgit și utilizat de comunitatea Karbonoir. Acesta reprezintă ingrijirea optimă pentru toate tipurile de piele, inclusiv cea problematică, cu afecțuni precum (dermatita, acneea, coșuri, punctele negre și altele), deoarece purifică, detoxifică și absoarbe toxinele adunate in pori, lăsand pielea moale și catifelată.",
    ULbeneficii: ["Revigorează pielea", "Curata in profunzime pielea"],
    productPicture: [images.sapunMontan.image, images.sapunMontan.image2, images.sapunMontan.image3]
  },
  {
    title: "Scrub Montan 200gr",
    price: "35",
    shortDescription: " Un sapun dedicat fetei tale si minilor tale pentru o ingrijire in profunzime",
    firstDescription:
      "Pachetul de Scrub si Sapun indragit de toata lumea va garanteaza rasfatul pielii dvs. Săpunul negru ce conține cărbune activat pentru un ten neted  și mătăsos, este cel mai îndrăgit și utilizat de comunitatea Karbonoir. Acesta reprezintă ingrijirea optimă pentru toate tipurile de piele, inclusiv cea problematică, cu afecțuni precum (dermatita, acneea, coșuri, punctele negre și altele), deoarece purifică, detoxifică și absoarbe toxinele adunate in pori, lăsand pielea moale și catifelată.",
    ULbeneficii: ["Previne imbatranirea pielii", "Ajuta la curatarea pielii"],
    productPicture: [images.cremaScrub.image, images.cremaScrub.image2, images.cremaScrub.image3]
  }
];

const db = getFirestore(app);
export const getData = async () => {
  const snapShot = await getDocs(collection(db, "products"));
  var dataProducts = [];

  snapShot.forEach((doc) => {
    console.log("Retrieveing...", doc.data());
    console.log("Here:", Object.values(doc.data()));
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

export default productList;
