import React from "react";
import { NavHashLink } from "react-router-hash-link";

import { ProductsFromSessionStorage } from "../../data/constants";
import styles from "./ProductAdded.module.scss";
import images from "./../../data/images";
import strings from "./../../data/strings.json";

interface ProductProps {
  id: string;
  animFin: () => void;
}
const ProductAdded = ({ id, animFin }: ProductProps) => {
  let { MyCart, cart } = strings;
  let sessionData = sessionStorage.getItem(ProductsFromSessionStorage);

  let data = sessionData != null ? JSON.parse(sessionData) : null;

  const animationFinished = () => {
    animFin();
  };
  return (
    <div onAnimationEnd={animationFinished} className={styles.cartCardboard}>
      <div className={styles.cartLogoStyle}>
        <img className={styles.cartIcon} src={images.cartLogo} />
      </div>
      <div className={styles.titleProduct}>{data != null ? data[id].title : ""}</div>
      <div className={styles.confirmMessage}>
        <p className={styles.confirmMessage}>{cart.congratsMessage}</p>
      </div>
      <div className={styles.actionCallOut}>
        <NavHashLink className={styles.hashTransparent} to={cart.link}>
          <button className={styles.chillButton}>{cart.title}</button>
        </NavHashLink>

        <NavHashLink className={styles.hashTransparent} to={MyCart.finishOrder.link}>
          <button className={styles.takeActionButton}>{MyCart.finishOrder.text}</button>
        </NavHashLink>
      </div>
    </div>
  );
};

export default ProductAdded;
