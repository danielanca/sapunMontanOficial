import styles from "./../components/ProduseleNoastre.module.scss";
import { getData } from "../data/productList";
import { uniqueId } from "lodash";
import HeadlineTitle from "./HeadlineTitle";
import ProductItem from "./ProductItem";
import React, { useContext } from "react";
import { ProductsContext } from "../App";
import { useEffect, useState } from "react";

const ProduseleNoastre = () => {
  const [products, setProducts] = useState(null);
  var productsFetched = sessionStorage.getItem("productsFetched");

  useEffect(() => {
    if (productsFetched != null) {
      setProducts(JSON.parse(productsFetched));
    } else {
      getData().then((finalData) => {
        setProducts(JSON.parse(JSON.stringify(finalData)));
      });
    }
  }, [productsFetched]);

  return (
    <>
      <HeadlineTitle title={"Produsele Noastre"} />
      <div className={styles.blockContainer}>
        <div className={styles.productList}>
          {products != null
            ? products.map((item) => <ProductItem key={uniqueId()} productObject={item} />)
            : "loading data..."}
        </div>
      </div>
    </>
  );
};
export default ProduseleNoastre;
