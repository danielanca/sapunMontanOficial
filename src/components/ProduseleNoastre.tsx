import styles from "./../components/ProduseleNoastre.module.scss";
import { getData } from "../data/productList";
import HeadlineTitle from "./HeadlineTitle";
import ProductItem from "./ProductItem";
import React, { useContext } from "react";
import { ProductsContext } from "../App";
import { useEffect, useState } from "react";

interface YayaData {
  title: string;
  price: number;
}
const ProduseleNoastre = () => {
  const ProductsFroMContext = useContext(ProductsContext);

  const [isFetched, setIsFetched] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState<any[]>();

  useEffect(() => {
    if (products == null) {
      // getData().then((finalData) => {
      //   console.log("In then", finalData);
      //   setProducts(finalData);
      // });

      // setProducts(ProductsFroMContext);
      let productSessionStorage = JSON.parse(sessionStorage.getItem("productsFetched"));
      setProducts(productSessionStorage);
    }
  }, [products]);

  return (
    <>
      <HeadlineTitle title={"Produsele Noastre"} />
      <div className={styles.blockContainer}>
        <div className={styles.productList}>
          {products != null ? products.map((item) => <ProductItem productObject={item} />) : "loading data..."}
        </div>
      </div>
    </>
  );
};
export default ProduseleNoastre;
