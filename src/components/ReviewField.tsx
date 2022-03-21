import ReviewCard from './../components/ReviewCard';
import AddReview from './AddReview';

import styles from './ReviewField.module.scss';

const ReviewField = () => {
  return (
    <div className={styles.contain}>
      <div className={styles.reviewContainer}>
        <ReviewCard />
        <ReviewCard />
        <ReviewCard />

        <AddReview />
      </div>
    </div>
  );
};

export default ReviewField;
