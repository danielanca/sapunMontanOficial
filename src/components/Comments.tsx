// @ts-nocheck
import { useState } from "react";

import ProductDescription from "./ConstantComponents/ProductDescription";
import ReviewField from "./ReviewField";
import styles from "./../components/Comments.module.scss";

interface CommentsProps {
  reviewsList: any;
  productID: string;
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
      <div className={styles.descriptionContainer}>
        <ReviewField productData={productReviews} reviewsAr={reviewsList} productIdentification={productID} />
      </div>
    </>
  );
};

export default Comments;
