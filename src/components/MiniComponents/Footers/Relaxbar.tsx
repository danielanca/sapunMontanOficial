import React from "react";
import { NavHashLink } from "react-router-hash-link";

import images from "../../../data/images";
import strings from "../../../data/strings.json";
import styles from "./Relaxbar.module.scss";

const Relaxbar = () => {
  const goToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <div className={styles.relaxSpace}>
      <div className={styles.cardobard}>
        <h3>{"Hai sa tinem legatura 😊"}</h3>
        <div className={styles.socialsTop}>
          {Object.values(strings.socialsInfo.socialLinks).map((item) => (
            <a href={item.link}>
              <img className={styles.iconStyle} src={images.socialIcons[item.image]} />
            </a>
          ))}
        </div>
        <div className={styles.inquiries}>
          <p>{"Hai sa colaboram impreuna!"}</p>
          <NavHashLink onClick={goToTop} smooth replace to={"afiliere"}>
            <p>{"Program Afiliere"}</p>
          </NavHashLink>
        </div>
      </div>
    </div>
  );
};

export default Relaxbar;
