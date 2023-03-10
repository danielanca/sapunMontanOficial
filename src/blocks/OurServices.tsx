import React, { useState } from "react";
import styles from "./OurServices.module.scss";
import images from "../data/images";
const OurServices = () => {
  const [width, setWidth] = useState<number>(window.innerWidth);
  return (
    <div className={styles.servicesBlock}>
      <div className={styles.cardBlock}>
        <h2>Bussines-uri mici</h2>
        <span>Alege din pachetele noastre care ti se potriveste</span>
        <button> Get started</button>
        <img className={styles.arrowStyle} src={images.arrowRiona} />
        <img className={styles.building} src={images.mic} />
      </div>
      {/* <div className={styles.cardBlock}>
        <h2>Bussines medii</h2>
        <span>Alege din pachetele noastre care ti se potriveste</span>
        <button> Get started</button>
        <img className={styles.arrowStyle} src={images.arrowRiona} />
        <img className={styles.building} src={images.medii} />
      </div>
      <div className={styles.cardBlock}>
        <h2>Corporatie</h2>
        <span>Alege din pachetele noastre care ti se potriveste</span>
        <button>Get started</button>
        <img className={styles.arrowStyle} src={images.arrowRiona} />
        <img className={styles.building} src={images.mare} />
      </div> */}
    </div>
  );
};
export default OurServices;
