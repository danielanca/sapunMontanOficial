import React from "react";
import { uniqueId } from "lodash";
import ReviewCard from "./../components/ReviewCard";
import AddReview from "./AddReview";
import styles from "./ReviewField.module.scss";
import { ReviewsProps } from "../utils/ReviewsTypes";

const ReviewField = ({ productData, productIdentification }: ReviewsProps) => {
  let reviewsList = Object.values(productData);
  return (
    <div className={styles.contain}>
      {productData != null && reviewsList.length >= 1 ? (
        <div className={styles.reviewContainer}>
          {reviewsList.map((item) => (
            <ReviewCard key={uniqueId()} testimonials={item} />
          ))}
        </div>
      ) : (
        <div className={styles.noReviewsComponent}>
          <h2>{"Nu exista recenzii"}</h2>
        </div>
      )}

      <AddReview productID={productIdentification} />
    </div>
  );
};

export default ReviewField;
