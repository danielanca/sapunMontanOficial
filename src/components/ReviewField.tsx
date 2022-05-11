import ReviewCard from "./../components/ReviewCard";
import AddReview from "./AddReview";

import styles from "./ReviewField.module.scss";

interface ReviewsProps {
  reviewsAr?: any;
  productIdentification: number;
}
const ReviewField = ({ reviewsAr, productIdentification }: ReviewsProps) => {
  var listOfReviews = [];
  if (reviewsAr != undefined) {
    listOfReviews = Object.values(reviewsAr);
    console.log("Review Field is teling: ", listOfReviews[0].reviewsList);
  } else {
    listOfReviews[0] = 1;
  }

  return (
    <div className={styles.contain}>
      <div className={styles.reviewContainer}>
        {Object.values(listOfReviews[0].reviewsList || "").map((item) => (
          <ReviewCard testimonials={item} />
        ))}

        <AddReview productID={productIdentification} />
      </div>
    </div>
  );
};

export default ReviewField;
