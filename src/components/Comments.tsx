import { useState } from "react";

import ProductDescription from "./ConstantComponents/ProductDescription";
import ReviewField from "./ReviewField";
import styles from "./../components/Comments.module.scss";

interface CommentsProps {
  reviewsList: any;
  productID: number;
}
const Comments = ({ reviewsList, productID }: CommentsProps) => {
  const [tabButton, settabButton] = useState(0);

  const handleTab = (event: number) => {
    settabButton(event);
    console.log("EVENT HERE");
  };
  return (
    <>
      <h3 className={styles.title}>{"Detalii PRODUS"}</h3>
      <div className={styles.commentsArea}>
        <div className={styles.tabs}>
          <div onClick={handleTab.bind(this, 0)} className={tabButton === 1 ? styles.tabButton : styles.activeTab}>
            {"Descriere"}
          </div>
          <div onClick={handleTab.bind(this, 1)} className={tabButton === 0 ? styles.tabButton : styles.activeTab}>
            {"Recenzii"}
          </div>
        </div>
        <div className={styles.descriptionContainer}>
          {tabButton === 0 ? (
            <ProductDescription productID={productID} />
          ) : (
            <ReviewField reviewsAr={reviewsList} productIdentification={productID} />
          )}
        </div>
      </div>
    </>
  );
};

export default Comments;
