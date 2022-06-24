import ReviewCard from "./../components/ReviewCard";
import AddReview from "./AddReview";
import { uniqueId } from "lodash";
import styles from "./ReviewField.module.scss";

interface ReviewsInterface {
  actualComment: string;
  date: string;
  name: string;
  starsNumber: string;
}
interface ReviewsProps {
  productIdentification: number;
  productData?: ReviewsInterface;
}
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
