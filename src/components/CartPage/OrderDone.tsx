import React from "react";
import { HashLink as Link, NavHashLink } from "react-router-hash-link";

import styles from "./OrderDone.module.scss";

const OrderDone = () => {
  return (
    <div className={"row " + styles.confirmContainer}>
      <div className={styles.horizontalAlign}>
        <p className={styles.text}>{"Comanda a fost inregistrată!😃"}</p>
        <p className={styles.miniText}>{"Veti fi contactat telefonic pentru confirmarea comenzii"}</p>
      </div>
      <div className={styles.horizontalAlign}>
        <NavHashLink className={styles.HashLinkStyle} to="/">
          <button className={styles.buttonToHome}>{"Spre pagina principala"}</button>
        </NavHashLink>
      </div>
    </div>
  );
};

export default OrderDone;
