import React, { useState } from "react";
import StarDisplayer from "./StarDisplayer/StarDisplayer";
import styles from "./ReviewCard.module.scss";
import images from "./../data/images";
import CommContainer from "./../components/MiniComponents/CommContainer";
import ReactGA from "react-ga4";

interface IProps {
  testimonialItem: {
    reviewActual: string;
    date: string;
    name: string;
    starsNumber: string;
    email: string;
    reviewProductID: string;
    mediaLink?: string;
  };
}
//https://extensions.dev/extensions/firebase/storage-resize-images
//Image processing for media upload
const ReviewCard = ({ testimonialItem }: IProps) => {
  const [isOpen, setisOpen] = useState<boolean>(false);
  const openComment = () => {
    ReactGA.event(`User clicked on a review on ${window.location.pathname} `);
    setisOpen(true);
  };

  return (
    <>
      {isOpen && testimonialItem.hasOwnProperty("mediaLink") && (
        <CommContainer reviewItem={testimonialItem} containerHandler={setisOpen} />
      )}
      <div className={styles.commentBoard}>
        <div className={styles.rowInside}>
          <div className={styles.colItem}>
            <div className={styles.authorStyle}>
              <div className={styles.authorLine}>
                <p className={styles.name}>{testimonialItem.name}</p>
                <img className={styles.verifiedIcon} src={images.verifiedPurchase} />
              </div>

              <p className={styles.date}>{testimonialItem.date}</p>
            </div>
            <div className={styles.reviewStars}>
              <StarDisplayer starScore={testimonialItem.starsNumber} />
            </div>
            <div className={styles.comment}>
              <p className={styles.actualComment}>{testimonialItem.reviewActual}</p>
            </div>
          </div>
          {testimonialItem.hasOwnProperty("mediaLink") && (
            <div onClick={openComment} className={styles.colItemRight}>
              <img className={styles.mediaRight} src={testimonialItem.mediaLink} />
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default ReviewCard;
