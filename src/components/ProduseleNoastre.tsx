import styles from "./../components/ProduseleNoastre.module.scss";
import productList from "../data/productList";
import HeadlineTitle from "./HeadlineTitle";
import ProductItem from "./ProductItem";
import { collection, doc, setDoc, getFirestore, getDoc, getDocs } from "firebase/firestore";
import app from "./../firebase";

import { useEffect, useState } from "react";

const db = getFirestore(app);

const getData = async () => {
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
interface YayaData {
  title: string;
  price: number;
}
const ProduseleNoastre = () => {
  const [isFetched, setIsFetched] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState<any[]>();

  useEffect(() => {
    if (products == null) {
      getData().then((finalData) => {
        console.log("In then", finalData);
        setProducts(finalData);
      });
    }
  });

  useEffect(() => {
    console.log("here products:", products);
  }, [products]);

  return (
    <>
      <HeadlineTitle title={"Produsele Noastre"} />
      <div className={styles.blockContainer}>
        <div className={styles.productList}>
          {/* {products != null ? products.map((item) => <span>{item.title}</span>) : "TEEEEEEEEEEEEEEEEEEEEST"} */}
          {products != null ? products.map((item) => <ProductItem productObject={item} />) : "TEEEEEEEEEEEEEEEEEEEEST"}
        </div>
      </div>
    </>
  );
};
export default ProduseleNoastre;
