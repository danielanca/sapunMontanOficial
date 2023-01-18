import React from "react";
import ReviewField from "./ReviewField";
import styles from "./../components/Comments.module.scss";
import { ReviewsInterface } from "../utils/ReviewsTypes";
import { ProductListType, ProductModel } from "../utils/OrderInterfaces";
interface CommentsProps {
  reviewsList: any;
  productID: string;
  productData?: string;
}
const Comments = ({ productData, reviewsList, productID }: CommentsProps) => {
  let productReviews: ReviewsInterface | null = null;
  const allReviews: any = [];

  if (productData != null) {
    productReviews = JSON.parse(productData)[productID].reviews;
    let allRevs: ProductListType = JSON.parse(productData);

    Object.values(allRevs).forEach((item) =>
      Object.values(item.reviews).length >= 1
        ? console.log(Object.values(item.reviews).forEach((item) => allReviews.push(item)))
        : ""
    );
  }

  return (
    <>
      <div className={styles.descriptionContainer}>
        {productReviews != null ? (
          <ReviewField allReviews={allReviews} productData={productReviews} productIdentification={productID} />
        ) : (
          "NOTHING HERE - REVIEWS"
        )}
      </div>
    </>
  );
};

export default Comments;
