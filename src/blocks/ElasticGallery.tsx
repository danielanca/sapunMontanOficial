import React from "react";
import styles from "./ElasticGallery.module.scss";
import { GalleryProps } from "./ElasticTypes";
import { NavHashLink } from "react-router-hash-link";
//input { array of media with links}
// { name ,image, link, text }

const ElasticGallery = ({ galleryList }: GalleryProps) => {
  const goToTop = (_) => window.scrollTo({ top: 0, behavior: "smooth" });
  return (
    <div className={styles.cards}>
      {galleryList.map((item) => (
        <NavHashLink onClick={goToTop} className={styles.cardItem} to={`/produs/` + item.link}>
          <h2 className={styles.headline}>{item.name}</h2>
          <img className={styles.imageContainer} src={item.image}></img>
        </NavHashLink>
      ))}
    </div>
  );
};

export default ElasticGallery;
