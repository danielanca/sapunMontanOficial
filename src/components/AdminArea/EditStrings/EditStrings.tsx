import React, { useEffect, useState } from "react";
import TableView from "./TableView";
import styles from "./EditStrings.module.scss";

const EditStrings = () => {
  let categoriesListString = "categoriesList";
  let faqList = "FAQ";
  return (
    <div className={styles.editStringsContainer}>
      <div className={styles.editStringsPage}>
        <TableView tableID={categoriesListString} />
        <TableView tableID={faqList} />
      </div>
    </div>
  );
};

export default EditStrings;
