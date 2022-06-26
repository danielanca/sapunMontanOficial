import { useState } from "react";

import ProductDescription from "./ConstantComponents/ProductDescription";
import ReviewField from "./ReviewField";
import styles from "./../components/Comments.module.scss";

interface CommentsProps {
  reviewsList: any;
  productID: number;
  productData?: string;
}
const Comments = ({ productData, reviewsList, productID }: CommentsProps) => {
  var productReviews;

  if (productData != null) {
    productReviews = JSON.parse(productData)[productID].reviews;
  }

  console.log("Comments:", productReviews);

  return (
    <>
      <h3 className={styles.title}>{"Detalii PRODUS"}</h3>
      <div className={styles.commentsArea}>
        <div className={styles.descriptionContainer}>
          <ProductDescription productDescription={productData} productID={productID} />

          <ReviewField productData={productReviews} reviewsAr={reviewsList} productIdentification={productID} />
        </div>
      </div>
    </>
  );
};

export default Comments;
