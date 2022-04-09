import ReviewCard from "./../components/ReviewCard";
import AddReview from "./AddReview";

import styles from "./ReviewField.module.scss";

interface ReviewsProps {
  reviewsAr: any;
}
const ReviewField = (reviewsAr: ReviewsProps) => {
  const listOfReviews = Object.values(reviewsAr);
  console.log("Review Field is teling: ", listOfReviews[0].reviewsList);

  return (
    <div className={styles.contain}>
      <div className={styles.reviewContainer}>
        {Object.values(listOfReviews[0].reviewsList || "").map((item) => (
          <ReviewCard testimonials={item} />
        ))}

        <AddReview />
      </div>
    </div>
  );
};

export default ReviewField;
