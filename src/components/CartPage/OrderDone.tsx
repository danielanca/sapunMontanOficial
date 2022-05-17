import { HashLink, HashLink as Link, NavHashLink } from "react-router-hash-link";
import { getOrderByID } from "../../data/productList";
import { useParams } from "react-router-dom";
import styles from "./OrderDone.module.scss";
import { useEffect, useState } from "react";

interface OrderInterface {
  deliveryName: string;
  deliveryAddress: string;
  emailAddress: string;
  lastName: string;
  firstName: string;
  city: string;
  county?: string;
  paymentMethod: string;
  shippingTax: number;
  cartSum: number;
  orderNotes: string;
  phoneNo: string;
}

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
