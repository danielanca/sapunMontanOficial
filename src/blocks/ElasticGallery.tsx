import React from "react";
import { GalleryProps } from "./ElasticTypes";
import { NavHashLink } from "react-router-hash-link";
import styles from "./ElasticGallery.module.scss";

interface GalleryItem {
  image: string;
  link: string;
  name: string;
}
const ElasticGallery = ({ galleryList }: GalleryProps) => {
  const goToTop = (_) => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <div className={styles.cards}>
      {galleryList.map((item: GalleryItem, index: number) => (
        <div
          key={index}
          className={styles.cardItem}
          style={{
            backgroundImage: `linear-gradient(rgb(255 255 255 / 0%), rgb(0 0 0 / 17%)), url(${item.image})`
          }}
        >
          <NavHashLink className={styles.inheritAll} onClick={goToTop} to={`/produs/` + item.link} />
          <h2 className={styles.headline}>{item.name}</h2>
        </div>
      ))}
    </div>
  );
};

export default ElasticGallery;
