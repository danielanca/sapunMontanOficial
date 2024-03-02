import React, { useEffect } from "react";
import { HashLink as Link, NavHashLink } from "react-router-hash-link";
import strings from "../../data/strings.json";
import styles from "./OrderDone.module.scss";
import parse from "html-react-parser";

const OrderDone = () => {
  let { OrderDone: doneString } = strings;

  useEffect(() => {
    // Check if the element exists
    const element = document.querySelector(".Relaxbar_relaxSpace__20MdK");
    if (element instanceof HTMLElement) {
      // Apply 'display: none' style to hide it
      element.style.display = "none";
    }
  }, []);

  useEffect(() => {
    // Hide specific element
    const element = document.querySelector(".Relaxbar_relaxSpace__20MdK");
    if (element instanceof HTMLElement) {
      element.style.display = "none";
    }

    // Dynamically inject the conversion tracking script
    const script = document.createElement("script");
    script.text = `
      (function waitForGtag() {
        console.log("Executing achizitie conversion tracking...");
        if (typeof gtag === 'function') {
          gtag('event', 'conversion', {
            'send_to': 'AW-10941123412/ww8eCM7HiakYENSWkeEo',
            'value': 0.0,
            'currency': 'RON',
            'transaction_id': ''
          });
        } else {
          console.log("The GTAG not loaded, retrying in 100 ms");
          setTimeout(waitForGtag, 100); // Retry in 100ms
        }
      })();
    `;
    document.body.appendChild(script);

    // Cleanup to remove the script when the component unmounts
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div role={"contentinfo"} className={"row " + styles.confirmContainer}>
      <div className={styles.horizontalAlign}>
        <p className={styles.text}>{doneString.title}</p>
        <p className={styles.miniText}>{parse(doneString.subtitle)}</p>
      </div>
      <div className={styles.horizontalAlign}>
        <NavHashLink className={styles.HashLinkStyle} to="/">
          <button className={styles.buttonToHome}>{doneString.goHome}</button>
        </NavHashLink>
      </div>
    </div>
  );
};

export default OrderDone;
