import React from "react";
import images from "../../data/images";
import styles from "./Homepage.module.scss";
import parse from "html-react-parser";
import OurServices from "../../blocks/OurServices";
const Homepage = () => {
  return (
    <>
      <div className={styles.landingFirst}>
        <div className={styles.elipse} />
        <div className={styles.heroText}>
          <div className={styles.pitchText}>
            <h2>{parse(`Brandingul <span class="blueTheme">ofera</span>`)}</h2>
            <h2>{parse(`<span class="blueTheme">avantaje `)}</h2>
            <h2>{parse(`<span class="blueTheme">competitive `)}</h2>
          </div>
        </div>
        <div className={styles.heroMedia}>
          <img src={images.heroBoy} />
        </div>
      </div>
      <div className={styles.brandingSeparator}>
        <img src={images.logoBrands} />
      </div>
      <OurServices />
    </>
  );
};

export default Homepage;
