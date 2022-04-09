import styles from "./../components/ProduseleNoastre.module.scss";
import { getData } from "../data/productList";
import HeadlineTitle from "./HeadlineTitle";
import ProductItem from "./ProductItem";

import { useEffect, useState } from "react";

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
