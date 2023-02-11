import React from "react";
import { uniqueId } from "lodash";
import ReviewCard from "./../components/ReviewCard";
import AddReview from "./AddReview";
import styles from "./ReviewField.module.scss";
import { ReviewsProps } from "../utils/ReviewsTypes";

const ReviewField = ({ productData, productIdentification, allReviews }: ReviewsProps) => {
  return (
    <div className={styles.contain}>
      {productData != null && allReviews.length >= 1 ? (
        <div className={styles.reviewContainer}>
          {allReviews.map((item) => (
            <ReviewCard key={uniqueId()} testimonialItem={item} />
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
