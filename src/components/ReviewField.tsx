import React from "react";
import { uniqueId } from "lodash";
import ReviewCard from "./../components/ReviewCard";
import AddReview from "./AddReview";
import styles from "./ReviewField.module.scss";
import { ReviewsProps } from "../utils/ReviewsTypes";

const ReviewField = ({ productData, productIdentification }: ReviewsProps) => {
  return (
    <div className={styles.contain}>
      <div className={styles.reviewContainer}>
        {productData != null
          ? Object.values(productData).map((item) => <ReviewCard key={uniqueId()} testimonials={item} />)
          : ""}

        <AddReview productID={productIdentification} />
      </div>
    </div>
  );
};

export default ReviewField;
