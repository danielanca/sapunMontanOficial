import styles from "./FeaturedProduct.module.scss";
import images from "../data/images";
import Ingredients from "../components/MiniComponents/Products/Ingredients";
import ButtonNice from "../components/MiniComponents/Products/ButtonNice";

const FeaturedProduct = () => {
  return (
    <div className={styles.featuredContainer}>
      <div className={styles.newProductText}>
        <h3 className={styles.backText}>{"MONTANAIR"}</h3>
        <div className={styles.textContainer}>
          <h4 className={styles.newProductTitle}>{"PRODUS NOU"}</h4>
        </div>
      </div>
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
