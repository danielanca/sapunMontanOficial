import styles from "./StarDisplayer.module.scss";

import stars from "./../../media/assets/pics/prezentareCarbune/star_review.png";
// import images from "./../data/images";

interface StarsProps {
  starScore: string;
}

const StarDisplayer = ({ starScore }: StarsProps) => {
  let lastHalf = false;
  if (Number(starScore) % 1 != 0) lastHalf = true;

  return (
    <div className={styles.starVisualizer}>
      {Array.from({ length: starScore }, (item) => {
        return <img className={styles.starIcon} src={stars} />;
      })}
    </div>
  );
};

export default StarDisplayer;
