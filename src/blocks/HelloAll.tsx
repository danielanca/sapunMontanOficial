import React from "react";
import styles from "./HelloAll.module.scss";

const HelloAll = () => {
  return (
    <div className={styles.helloAll}>
      <div className={styles.featuredMessage}>
        <h3>{"lumea cărbunelui  "}</h3>
      </div>
    </div>
  );
};
export default HelloAll;
