import images from "./../data/images";

import styles from "./ReviewCard.module.scss";

import StarDisplayer from "./StarDisplayer/StarDisplayer";
interface ReviewerInterface {
  reviewActual: string;
  date: string;
  name: string;
  starsNumber: string;
  email: string;
  reviewProductID: string;
}
interface IProps {
  testimonials: ReviewerInterface;
}

const ReviewCard = ({ testimonials }: IProps) => {
  return (
    <div className={styles.commentBoard}>
      <div className={styles.authorStyle}>
        <p className={styles.name}>{testimonials.name}</p>
        <p className={styles.date}>{testimonials.date}</p>
      </div>
      <div className={styles.reviewStars}>
        <StarDisplayer starScore={testimonials.starsNumber} />
      </div>
      <div className={styles.comment}>
        <p className={styles.actualComment}>{testimonials.reviewActual}</p>
      </div>
    </div>
  );
};
export default ReviewCard;
