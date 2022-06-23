import { useEffect, useState } from "react";

import { getCookie, setCookie } from "./functions";
import { cookieConsent } from "../../data/componentStrings";
import styles from "./CookieConsent.module.scss";

import images from "../../data/images";

const CookieConsent = () => {
  const [renderConsent, setConsent] = useState<boolean>(true);

  const getCookieConsent = () => {
    if (getCookie("cookieConsentBrasov") === "userAccepted") return true;
    else return false;
  };

  const acceptCookie = () => {
    setCookie("cookieConsentBrasov", "userAccepted");
    setConsent(false);
  };
  useEffect(() => {
    setConsent(!getCookieConsent());
  }, [renderConsent]);

  return (
    renderConsent && (
      <div className={styles.cookiePopper}>
        <div className={styles.textArea}>
          <h4>
            <img className={styles.cookieIcon} src={images.cookieIcon} />
            {cookieConsent.headTitle}
          </h4>
          <p>
            {cookieConsent.mainText}
            <a target={"_blank"} href="/termeni-si-conditii">
              {cookieConsent.secondText}
            </a>
          </p>
        </div>
        <div className={styles.acceptWrap}>
          <button onClick={acceptCookie}>{cookieConsent.acceptButton}</button>
        </div>
      </div>
    )
  );
};

export default CookieConsent;
