import ProductItem from "../ProductItem";

import { useEffect, useState } from "react";
import styles from "./SuggestionArea.module.scss";

interface SuggestionProps {
  productID: number;
}

const SuggestionArea = ({ productID }: SuggestionProps) => {
  const [products, setProducts] = useState<any[]>();

  useEffect(() => {
    if (products == null) {
      let productSessionStorage = JSON.parse(sessionStorage.getItem("productsFetched"));
      setProducts(productSessionStorage);
    }
  }, [products]);

  return (
    <div className={styles.relatedContainer}>
      <div className={styles.productHead}>
        <h3 className={styles.titleProducts}>{"Alte produse"}</h3>
      </div>

      <div className={styles.productArea}>
        {products != null
          ? products.map((item, index) => <ProductItem size="small" productObject={item} />)
          : "LOADING PRODUCTS"}
      </div>
    </div>
  );
};

export default SuggestionArea;
