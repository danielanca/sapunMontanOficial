// @ts-nocheck
import ProductItem from "../ProductItem";
import { uniqueId } from "lodash";
import { useEffect, useState } from "react";
import styles from "./SuggestionArea.module.scss";

interface SuggestionProps {
  productID: string;
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
        <h3 className={styles.titleProducts}>{"RECOMANDARI"}</h3>
      </div>

      <div className={styles.productArea}>
        {products != null
          ? Object.values(products).map((item, index) => (
              <ProductItem key={uniqueId()} size="small" productObject={item} />
            ))
          : "LOADING PRODUCTS"}
      </div>
    </div>
  );
};

export default SuggestionArea;
