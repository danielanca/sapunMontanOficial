import React from "react";
import FeaturedText from "../components/MiniComponents/Products/FeaturedText";
import Ingredients from "../components/MiniComponents/Products/Ingredients";
import ButtonNice from "../components/MiniComponents/Products/ButtonNice";
import styles from "./FeaturedProduct.module.scss";
import images from "../data/images";

const FeaturedProduct = () => {
  return (
    <div className={styles.featuredContainer}>
      <FeaturedText text={{ title: "DinIubire", textSmall: "Produs Nou" }} />
      <div className={styles.bigPicture}>
        <div className={styles.roundCircle}>
          <img className={styles.featuredStyle} src={images.featuredProduct} />
        </div>
        <h3 className={styles.topTextFeatured}>{"MASCA NUTRITIONALA"}</h3>
        <h3 className={styles.bottomTextFeatured}>{"REPARATOARE SI ANTI-PETE"}</h3>
        <div className={styles.textDescription}>
          <p>
            {
              "Oferă un efect vizibil de hidratare și reparare a pielii sensibile, uscate, predispusă la coșuri, acnee și puncte negre."
            }
          </p>
        </div>
        <Ingredients />
        <ButtonNice title="VEZI PRODUSUL" urlSufix="piutzyke" />
      </div>
    </div>
  );
};

export default FeaturedProduct;
