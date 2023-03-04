import React, { useEffect, useState } from "react";
// import { GalleryProps } from "./ElasticTypes";
import { NavHashLink } from "react-router-hash-link";

import styles from "./ElasticGallery.module.scss";
import skeleton from "./../components/MiniComponents/LoadingSkeleton/LoadingSkeleton.module.scss";

import { HereInterface } from "../components/AdminArea/EditStrings/TableTypes";
interface GalleryType {
  [key: string]: {
    name: string;
    link: string;
    image: string;
    text: string;
  };
}
export interface GalleryProps {
  galleryList: GalleryType[];
}

const ElasticGallery = ({ galleryList }: HereInterface) => {
  const goToTop = (_) => window.scrollTo({ top: 0, behavior: "smooth" });
  const [categoriesList, setCategoriesList] = useState<any | null>(null);

  useEffect(() => {
    if (galleryList) {
      setCategoriesList(Object.values(galleryList));
    }
  }, [galleryList]);

  return (
    <div className={styles.cards}>
      {!categoriesList ? (
        <>
          <div className={skeleton.cardSkeletonLine}>
            <div className={skeleton.isloading} />
          </div>
          <div className={skeleton.cardTest}>
            <div className={skeleton.isloading} />
          </div>
        </>
      ) : (
        categoriesList.map((item: any, index: number) => (
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
        ))
      )}
    </div>
  );
};

export default ElasticGallery;
