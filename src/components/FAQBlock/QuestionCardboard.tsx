import React, { useState } from "react";
import { uniqueId } from "lodash";
import ReactGA from "react-ga4";

import styles from "./QuestionCardboard.module.scss";
import images from "../../data/images";

interface cardBoardProps {
  theQuestion: QuestionData;
}
interface QuestionData {
  question: string;
  answer: string;
}
const QuestionCardboard = ({ theQuestion }: cardBoardProps) => {
  const [cardboardOpen, setCardOn] = useState<boolean>(false);
  const clickHandler = () => {
    setCardOn(!cardboardOpen);
    ReactGA.event(`user_FAQ_clickedQuestion_${theQuestion.question.substring(0, 16)}`);
  };

  return (
    <div onClick={clickHandler} className={cardboardOpen ? styles.questionCard : styles.collapsed}>
      <div className={styles.primaryLine}>
        <p className={styles.questionText}>{theQuestion.question}</p>
        <div className={styles.detailsPadder}>
          <img className={styles.pinkArrowDown} src={images.arrowDown} />
        </div>
      </div>
      <div className={styles.answerArea}>
        <p className={cardboardOpen ? styles.activePop : styles.inactivePop}>{theQuestion.answer}</p>
      </div>
    </div>
  );
};

export default QuestionCardboard;
