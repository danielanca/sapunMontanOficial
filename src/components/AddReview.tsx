import React, { useState } from "react";
import styles from "./AddReview.module.scss";

interface ReviewProps {
  name: string;
  starsNumber: string;
  reviewActual: string;
  email: string;
}
const AddReview = () => {
  const [reviewBuffer, setReviewBuffer] = useState<ReviewProps>({
    name: "",
    starsNumber: "5",
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
  const sendToDB = () => {};
  return (
    <div className={styles.addSection}>
      <div className={styles.inputContainer}>
        <span>{Object.values(reviewBuffer)}</span>
        <span>{"Recenzia:"}</span>
        <textarea
          rows={5}
          onChange={reviewInputer}
          className={styles.textarea}
          id="recenzia"
          placeholder="Recenzia*"
        ></textarea>
        <span>{"Numele dvs:"}</span>
        <input onChange={identificationInserter} name="name" id="name" placeholder="Nume*"></input>
        <span>{"Email:"}</span>
        <input onChange={identificationInserter} name={"email"} id="email" placeholder="Email:*"></input>
      </div>
      <button onClick={sendToDB} className={styles.submitButton}>
        {"TRIMITE"}
      </button>
    </div>
  );
};

export default AddReview;
