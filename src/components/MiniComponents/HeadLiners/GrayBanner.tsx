import React from "react";
import styles from "./GrayBanner.module.scss";
import parse from "html-react-parser";
interface BannerProps {
  text: string;
}

const GrayBanner = ({ text }: BannerProps) => {
  return (
    <div className={styles.grayBanner}>
      <p>{parse(text)}</p>
    </div>
  );
};

export default GrayBanner;
