import React from "react";
import styles from "./ProductsGallery.module.scss";
import ProductItem from "./../ProductItem";
import { uniqueId } from "lodash";

interface ProductsGalleryProps {
  productsToShow: { [key: string]: any } | null;
}

const ProductsGallery = ({ productsToShow }: ProductsGalleryProps) => {
  return (
    <div className={styles.blockContainer}>
      <div className={styles.productList}>
        {productsToShow
          ? Object.values(productsToShow).map((item) => <ProductItem key={uniqueId()} productObject={item} />)
          : "LOADING Data..."}
      </div>
    </div>
  );
};

export default ProductsGallery;
