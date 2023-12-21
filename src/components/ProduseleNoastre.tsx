import React, { useEffect, useState } from "react";
import { uniqueId } from "lodash";
import HelmetHead from "./MiniComponents/HelmetHead/HelmetHead";
import HeadlineTitle from "./HeadlineTitle";
import ProductItem from "./ProductItem";
import strings from "./../data/strings.json";
import technicalStrings from "././../data/technicalStrings.json";
import { getData } from "../data/productList";
import { ProductsFromSessionStorage } from "../data/constants";
import { ProductListType } from "../utils/OrderInterfaces";
import styles from "./../components/ProduseleNoastre.module.scss";

const ProduseleNoastre = () => {
  let { ProduseleNoastre } = strings;
  const [products, setProducts] = useState<ProductListType[] | null>(null);
  let productsFromSession = sessionStorage.getItem(ProductsFromSessionStorage);

  useEffect(() => {
    if (productsFromSession != null) {
      setProducts(JSON.parse(productsFromSession));
    } else {
      getData().then((finalData) => {
        setProducts(JSON.parse(JSON.stringify(finalData)));
      });
    }
  }, [productsFromSession]);

  return (
    <>
      <HelmetHead title={ProduseleNoastre.title} description={ProduseleNoastre.metaDescription} />

      <HeadlineTitle title={ProduseleNoastre.title} />
      <div className={styles.blockContainer}>
        <div className={styles.productList}>
          {products != null
            ? Object.values(products).map((item: ProductListType) => (
                <ProductItem key={uniqueId()} productObject={item} />
              ))
            : technicalStrings.loadingData}
        </div>
      </div>
    </>
  );
};
export default ProduseleNoastre;
