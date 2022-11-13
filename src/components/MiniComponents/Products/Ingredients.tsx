import React from "react";
import parse from "html-react-parser";
import styles from "./Ingredients.module.scss";

interface ingredientsProps {
  [key: string]: {
    title: string;
    text: string;
    image: string;
  };
}
interface Proper {
  contentIngredients: ingredientsProps;
}
const Ingredients = ({ contentIngredients }: Proper) => {
  return (
    <div className={styles.ingredientsContainer}>
      {Object.values(contentIngredients).map((item) => (
        <div className={styles.productList}>
          <img className={styles.iconImage} src={item.image} />
          <div className={styles.textArea}>
            <p className={styles.titleText}>{item.title}</p>
            <p>{parse(item.text)}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Ingredients;
