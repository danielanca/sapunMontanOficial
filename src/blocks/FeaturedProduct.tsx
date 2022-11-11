import React from "react";
import FeaturedText from "../components/MiniComponents/Products/FeaturedText";
import Ingredients from "../components/MiniComponents/Products/Ingredients";
import ButtonNice from "../components/MiniComponents/Products/ButtonNice";
import styles from "./FeaturedProduct.module.scss";
import images from "../data/images";

interface featuredDataModel {
  bigAnnouncement: {
    background: string;
    title: string;
  };
  subTitle: string;
  title: string;
  text: string;
  featureThings: {
    [key: string]: {
      image: string;
      title: string;
      text: string;
    };
  };
  actionButton: {
    textButton: string;
    link: string;
  };
}

interface contentProps {
  content: featuredDataModel;
}
const FeaturedProduct = ({ content }: contentProps) => {
  return (
    <div className={styles.featuredContainer}>
      <FeaturedText text={{ title: content.bigAnnouncement.background, textSmall: content.bigAnnouncement.title }} />
      <div className={styles.bigPicture}>
        <div className={styles.roundCircle}>
          <img alt="Featured products" className={styles.featuredStyle} src={images.featuredProduct} />
        </div>
        <h3 className={styles.topTextFeatured}>{content.title}</h3>
        <h3 className={styles.bottomTextFeatured}>{content.subTitle}</h3>
        <div className={styles.textDescription}>
          <p>{content.text}</p>
        </div>
        <Ingredients />
        <ButtonNice title={content.actionButton.textButton} urlSufix={content.actionButton.link} />
      </div>
    </div>
  );
};

export default FeaturedProduct;
