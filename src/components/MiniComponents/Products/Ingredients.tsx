import parse from "html-react-parser";
import styles from "./Ingredients.module.scss";
import images from "./../../../data/images";
import strings from "../../../data/strings.json";

const Ingredients = () => {
  return (
    <div className={styles.ingredientsContainer}>
      {Object.values(strings.productDescription).map((item) => (
        <div className={styles.productList}>
          <img className={styles.iconImage} src={images.ingredients[item.image]} />
          <div className={styles.textArea}>
            <p>{parse(item.text)}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Ingredients;
