import React from "react";
import { HashLink as Link, NavHashLink } from "react-router-hash-link";
import strings from "../../data/strings.json";
import styles from "./OrderDone.module.scss";

const OrderDone = () => {
  let { OrderDone: doneString } = strings;
  return (
    <div role={"contentinfo"} className={"row " + styles.confirmContainer}>
      <div className={styles.horizontalAlign}>
        <p className={styles.text}>{doneString.title}</p>
        <p className={styles.miniText}>{doneString.subtitle}</p>
      </div>
      <div className={styles.horizontalAlign}>
        <NavHashLink className={styles.HashLinkStyle} to="/">
          <button className={styles.buttonToHome}>{doneString.goHome}</button>
        </NavHashLink>
      </div>
    </div>
  );
};

export default OrderDone;
