import React from "react";
import parse from "html-react-parser";

import styles from "./../ConstantComponents/DescriptionStyles.module.scss";
import { ProductListType } from "./../../utils/OrderInterfaces";
interface ProductProps {
  productID: string;
  productDescription: ProductListType;
}

const ProductDescription = ({ productDescription, productID }: ProductProps) => {
  return (
    <>
      <h3 className={styles.title}>{"Detalii PRODUS"}</h3>
      <div className={styles.commentsArea}>
        <div className={styles.descriptionContainer}>
          <div className={styles.innerDescription}>
            {productDescription != null && parse(productDescription[productID].jsonContent)}
          </div>
        </div>
      </div>

      {/* <RefundReturn /> */}
    </>
  );
};

export default ProductDescription;
