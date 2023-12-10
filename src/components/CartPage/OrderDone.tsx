import React from "react";
import { HashLink as Link, NavHashLink } from "react-router-hash-link";
import strings from "../../data/strings.json";
import styles from "./OrderDone.module.scss";
import parse from "html-react-parser";
import PostOffer from "./PostOffer";

const OrderDone = () => {
  let { OrderDone: doneString } = strings;
  return (
    <>
      <div role={"contentinfo"} className={"row " + styles.confirmContainer}>
        <div className={styles.horizontalAlign}>
          <div className="checkmark-circle">
            <div className="background"></div>
            <div className="checkmark draw"></div>
          </div>
          <p className={styles.text}>{doneString.title}</p>
          <p className={styles.miniText}>{parse(doneString.subtitle)}</p>
        </div>
        <div className={styles.horizontalAlign}>
          {/* <NavHashLink className={styles.HashLinkStyle} to="/">
            <button className={styles.buttonToHome}>{doneString.goHome}</button>
          </NavHashLink> */}
        </div>
      </div>
      <PostOffer />
    </>
  );
};

export default OrderDone;
