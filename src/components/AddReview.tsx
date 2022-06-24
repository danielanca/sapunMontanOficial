import React, { useState } from "react";
import styles from "./AddReview.module.scss";
import { sendReviewToBack } from "./../services/emails";
interface ReviewProps {
  name: string;
  starsNumber: string;
  reviewActual: string;
  email: string;
  reviewProductID: string;
}
interface PassingReview {
  productID: number;
}
const AddReview = ({ productID }: PassingReview) => {
  console.log("We are getting:", productID);
  const [reviewBuffer, setReviewBuffer] = useState<ReviewProps>({
    reviewProductID: productID.toString() || "1994",
    name: "",
    starsNumber: "",
    reviewActual: "",
    email: ""
  });

  const reviewInputer = (data: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = data.target;
    setReviewBuffer((reviewBuffer) => ({
      ...reviewBuffer,
      [name]: value
    }));
  };
  const identificationInserter = (data: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = data.target;
    setReviewBuffer((reviewBuffer) => ({
      ...reviewBuffer,
      [name]: value
    }));
  };
  const submitReviewToServer = () => {
    sendReviewToBack(reviewBuffer);
  };
  return (
    <div className={styles.addSection}>
      <div className={styles.wrapper}>
        <div className={styles.inputContainer}>
          <span>{"Recenzia:"}</span>
          <textarea
            rows={5}
            onChange={reviewInputer}
            className={styles.textarea}
            id="recenzia"
            placeholder="Introduceti mesajul cu privire la experienta dvs. "
          />
          <span>{"Numele dvs:"}</span>
          <input onChange={identificationInserter} name="name" id="name" placeholder="Nume*"></input>
          <span>{"Email:"}</span>
          <input onChange={identificationInserter} name={"email"} id="email" placeholder="Email:*"></input>
        </div>
        <button onClick={submitReviewToServer} className={styles.submitButton}>
          {"TRIMITE"}
        </button>
      </div>
    </div>
  );
};

export default AddReview;
