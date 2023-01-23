import React from "react";
import styles from "./HelloAll.module.scss";
import ElasticGallery from "./ElasticGallery";
import { GalleryProps } from "./ElasticTypes";
import strings from "./../data/strings.json";
const HelloAll = () => {
  return (
    <MediaItems />
    // <div className={styles.helloAll}>
    //   <div className={styles.featuredMessage}>
    //     <h3>{"lumea cărbunelui  "}</h3>
    //   </div>
    // </div>
  );
};

const MediaItems = () => {
  let galleryInputList = Object.values(strings.elasticGallery);
  return (
    <div className={styles.helloDarker}>
      <ElasticGallery galleryList={galleryInputList} />
    </div>
  );
};
export default HelloAll;
