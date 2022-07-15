import React, { useState, useEffect } from "react";
import ReactGA from "react-ga4";
import validator from "validator";
import styles from "./NewsletterPop.module.scss";
import parse from "html-react-parser";
import InputComponent from "./InputComponent";

import { NewsProps, responseProps } from "../../utils/NewsletterInterface";
import { addToNewsletter } from "../../services/emails";
import { newsletter } from "./../../data/componentStrings";
interface EventInsert {
  [key: string]: string;
}
const NewsletterPop = () => {
  const [emailValid, setEmailValid] = useState<"valid" | "notvalid" | "init">("init");
  const [newsletterData, setNewsletterData] = useState<NewsProps>({ firstName: "", lastName: "", email: "" });
  const [userSubscribed, setSubscribed] = useState<"SUBSCRIBED" | "INITSTATE" | "ERROR">("INITSTATE");
  const [eventInsert, setEventInsert] = useState<EventInsert | null>(null);
  const [termsAccepted, setTermsAccepted] = useState<boolean>(false);
  const emailValidate = (email: string) => {
    if (validator.isEmail(email)) return true;
    else return false;
  };
  const sendEvent = (eventLabel: string) => {
    if (eventInsert === null || Object.prototype.hasOwnProperty.call(!eventInsert, eventLabel)) {
      setEventInsert((eventInsert) => ({ ...eventInsert, [eventLabel]: "Triggered" }));
      ReactGA.event(`user_Newsletterinput_${eventLabel}`);
    }
  };

  const inputHandler = (data: React.ChangeEvent<HTMLInputElement>) => {
    sendEvent(data.target.name);
    const { name, value } = data.target;
    setNewsletterData((newsletterData) => ({
      ...newsletterData,
      [name]: value
    }));
  };
  const subscribeToNewsletter = () => {
    addToNewsletter(newsletterData).then((result) => {
      result.json().then((response: responseProps) => {
        setSubscribed(response.subscribeToNewsletter);
        console.log("subscribe response:", JSON.stringify(response));
      });
    });
  };

  useEffect(() => {
    if (emailValidate(newsletterData.email)) {
      setEmailValid("valid");
    } else if (newsletterData.email.length < 1) {
      setEmailValid("init");
    } else {
      setEmailValid("notvalid");
    }
  }, [newsletterData.email]);
  const layoutTransition = () => {
    if (userSubscribed === "SUBSCRIBED") {
      return `${styles.rightPanel} ${styles.imageSubscribed}`;
    } else {
      return `${styles.rightPanel}`;
    }
  };

  return (
    <div className={styles.newsletterContainer}>
      <div className={!userSubscribed ? styles.imageFeatured : styles.imageFeaturedTransition}>
        <div className={styles.textArea}>
          <h3 className={!userSubscribed ? styles.title : styles.titleSubscribed}>
            {!userSubscribed ? newsletter.userSubscribe.subscribed : newsletter.userSubscribe.notYet}
          </h3>
          <h4 className={!userSubscribed ? styles.description : styles.descriptionSubscription}>
            {!userSubscribed ? newsletter.userMessage.subscribed : newsletter.userMessage.notYet}
          </h4>
        </div>
      </div>
      <div className={layoutTransition()}>
        <div className={styles.containerWrap}>
          <div className={styles.textContain}>
            <p className={styles.newsletterText}>{parse(newsletter.bigText)}</p>
          </div>
          <div className={styles.inputArea}>
            <input
              type={"inputNewsletter"}
              autoComplete="off"
              id="lastName"
              name="lastName"
              placeholder={"Nume"}
              value={newsletterData.lastName}
              onChange={inputHandler}
            />
            <input
              type={"inputNewsletter"}
              autoComplete="off"
              id="firstName"
              name="firstName"
              placeholder={"Prenume"}
              value={newsletterData.firstName}
              onChange={inputHandler}
            />
            <input
              className={emailValid === "valid" || emailValid === "init" ? "" : styles.invalidEmail}
              type={"inputNewsletter"}
              autoComplete="off"
              id="email"
              name="email"
              placeholder={"E-mail"}
              value={newsletterData.email}
              onChange={inputHandler}
            />
          </div>
          <div className={styles.termArea}>
            <InputComponent theme={"blue"} typeOfInput="checkbox" onSwitchEnabled={setTermsAccepted} />
            <p className={styles.termsText}>
              {"Sunt de acord cu preluarea datelor cu caracter personal pentru a primi oferte personalizate"}
            </p>
          </div>
          <button onClick={subscribeToNewsletter} className={styles.newsSubscribeButton}>
            {"Aboneaza-te"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewsletterPop;
