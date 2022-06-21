import ReviewCard from "./../components/ReviewCard";
import AddReview from "./AddReview";

import styles from "./ReviewField.module.scss";

interface ReviewsInterface {
  actualComment: string;
  date: string;
  name: string;
  starsNumber: string;
}
interface ReviewsProps {
  reviewsAr?: any;
  productIdentification: number;
  productData?: ReviewsInterface;
}
const ReviewField = ({ productData, reviewsAr, productIdentification }: ReviewsProps) => {
  return (
    <div className={styles.contain}>
      <div className={styles.reviewContainer}>
        {productData != null ? Object.values(productData).map((item) => <ReviewCard testimonials={item} />) : ""}

        <AddReview productID={productIdentification} />
      </div>
    </div>
  );
};

export default ReviewField;
