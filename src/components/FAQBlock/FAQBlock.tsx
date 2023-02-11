import React, { useEffect, useRef } from "react";
import QuestionCardboard from "./QuestionCardboard";
import { FAQ } from "./../../data/strings.json";
import { uniqueId } from "lodash";
import styles from "./FAQBlock.module.scss";
import { useSenseScreen } from "../hooks/senseHook/useScrollSense";

const FAQBlock = () => {
  const ref = useRef(null);
  useSenseScreen(ref, window.location.pathname);

  return (
    <div ref={ref} className={styles.questionsBlock}>
      <h3 className={styles.bookTextTop}>{FAQ.topText}</h3>
      <h3 className={styles.bookTextDown}>{FAQ.bottomText}</h3>

      <div className={styles.cardsWrapper}>
        {Object.values(FAQ.questionList).map((item: any) => (
          <QuestionCardboard key={uniqueId()} theQuestion={{ question: item.question, answer: item.answer }} />
        ))}
      </div>
    </div>
  );
};

export default FAQBlock;
