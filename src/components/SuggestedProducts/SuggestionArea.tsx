import ProductItem from "../ProductItem";
import { uniqueId } from "lodash";
import React, { useEffect, useState } from "react";
import styles from "./SuggestionArea.module.scss";
import { ProductsFromSessionStorage } from "./../../data/constants";
import { ProductListType } from "./../../utils/OrderInterfaces";
interface SuggestionProps {
  productID: string;
}

const SuggestionArea = ({ productID }: SuggestionProps) => {
  const [products, setProducts] = useState<ProductListType[] | null>(null);

  useEffect(() => {
    let productsSession = sessionStorage.getItem(ProductsFromSessionStorage);
    if (products === null && productsSession !== null) {
      let productSessionStorage = JSON.parse(productsSession);
      setProducts(productSessionStorage);
    }
  }, [products]);

  return (
    <div className={styles.relatedContainer}>
      <div className={styles.productHead}>
        <h3 className={styles.titleProducts}>{"PRODUSE SIMILARE"}</h3>
      </div>

      <div className={styles.productArea}>
        {products !== null
          ? Object.values(products).map((item: any) => {
              if (!productID.includes(item.ID)) {
                return <ProductItem key={uniqueId()} size="small" productObject={item} />;
              }
            })
          : "LOADING PRODUCTS"}
      </div>
    </div>
  );
};

export default SuggestionArea;
