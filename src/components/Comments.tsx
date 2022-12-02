import React from "react";
import ReviewField from "./ReviewField";
import styles from "./../components/Comments.module.scss";
import { ReviewsInterface } from "../utils/ReviewsTypes";
interface CommentsProps {
  reviewsList: any;
  productID: string;
  productData?: string;
}
const Comments = ({ productData, reviewsList, productID }: CommentsProps) => {
  var productReviews: ReviewsInterface | null = null;

  if (productData != null) {
    productReviews = JSON.parse(productData)[productID].reviews;
  }

  console.log("Comments:", productReviews);

  return (
    <>
      <div className={styles.descriptionContainer}>
        {productReviews != null ? (
          <ReviewField productData={productReviews} productIdentification={productID} />
        ) : (
          "NOTHING HERE - REVIEWS"
        )}
      </div>
    </>
  );
};

export default Comments;
