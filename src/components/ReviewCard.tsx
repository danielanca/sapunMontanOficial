import images from './../data/images';

import styles from './ReviewCard.module.scss';
import stars from './../media/assets/pics/prezentareCarbune/star_review.png';
interface ReviewerInterface {
  authorName: string;
  testimonialText: string;
}
interface IProps {
  styler?: string;
  testimonials?: ReviewerInterface;
}

const ReviewCard = ({ styler, testimonials }: IProps) => {
  return (
    <div className={styles.commentBoard}>
      <div className={styles.authorStyle}>
        <p className={styles.name}>{'Cristina Popescu'}</p>
        <p className={styles.date}>{'25.5.2022'}</p>
      </div>
      <div className={styles.reviewStars}>
        <img className={styles.starIcon} src={stars} />
        <img className={styles.starIcon} src={stars} />
        <img className={styles.starIcon} src={stars} />
        <img className={styles.starIcon} src={stars} />
      </div>
      <div className={styles.comment}>
        <p className={styles.actualComment}>
          {'Produsul exact asa cum speram dar și mai plăcută a fost interacțiunea cu vânzătorul. Foarte profi!'}
        </p>
      </div>
    </div>
  );
};
export default ReviewCard;
