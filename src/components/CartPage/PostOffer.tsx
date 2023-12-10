import React, { useEffect } from "react";
import styles from "./PostOffer.module.scss";
import heart from "./../../img/heart.svg";
import heartYellow from "./../../img/heart_yellow.svg";
import parse from "html-react-parser";
const PostOffer = () => {
  useEffect(() => {
    const removeBannerUp = () => {
      const headTitle = document.querySelectorAll("[class^='TopBanner_bigBlanaBanner__']");
      headTitle[0].remove();
    };
    removeBannerUp();
  }, []);
  return (
    <>
      <div className={styles.backgroundOffer}>
        <img className={styles.heart} src={heart} />
        <img className={styles.heartYellow} src={heartYellow} />
        <img className={styles.heartYellowSecond} src={heartYellow} />
        <div className={styles.titleWrap}>
          <img src="https://firebasestorage.googleapis.com/v0/b/diniubire-89ce0.appspot.com/o/ProductMedia%2FfeatureText.png?alt=media&token=7193e72b-d742-4d19-b48c-3ca7a222d946" />
        </div>
        <div className={styles.middlePitch}>
          <h2 className={styles.firstHead}>{"CUPOANE DE IUBIRE"}</h2>
          <h2 className={styles.qty}>{"20 buc + 6 BONUS"}</h2>
        </div>
        <div className={styles.imageArea}>
          <img
            className={styles.featuredImage}
            src="https://firebasestorage.googleapis.com/v0/b/diniubire-89ce0.appspot.com/o/ProductMedia%2Fcupon_all.png?alt=media&token=8fb8e60d-e964-4f27-bf38-06ad95f2a2bf"
          />
        </div>
        <div className={styles.pitchText}>
          <div className={styles.pitchFirst}>
            <p>{parse("Ofera <strong>partenerului timpul si atentia ta</strong>, <br>prin cupoanele de iubire")}</p>
            <p>
              {parse(
                "Un mesaj sau o cina in oras, <strong>partenerul tau</strong> <br> va putea alege din <strong>20 cupoane</strong> ce vor fi <br>pentru tine o sarcina ce trebuie indeplinita"
              )}
            </p>
            <p>
              {parse(
                "BONUS 6 cupoane necompletate, <br>ca partenerul tau sa adauge dorintele/sarcinile <br> <strong>stiute doar de voi</strong>"
              )}
            </p>
          </div>
          <div className={styles.priceWrapper}>
            <h2>{`26 RON`}</h2>
          </div>
          <div className={styles.actionContainer}>
            {/* <button className={styles.descriptionButton}>{"DESCRIERE PRODUS"}</button> */}
            <button className={styles.addToOrder}>{"ADAUGĂ LA COMANDA PLASATĂ"}</button>
            <div className={styles.notifyCTA}>
              <span className={styles.warning}>{"SE ADAUGĂ LA COMANDA ANTERIOARĂ"}</span>
              <span className={styles.info}>{"Nu mai este necesar re-completarea datelor"}</span>
            </div>
          </div>
          <div className="pitchSecond"></div>
        </div>
      </div>
    </>
  );
};

export default PostOffer;
