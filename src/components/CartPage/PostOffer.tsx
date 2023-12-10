import React, { useEffect } from "react";
import styles from "./PostOffer.module.scss";
import heart from "./../../img/heart.svg";
import heartYellow from "./../../img/heart_yellow.svg";
import { useState } from "react";
import parse from "html-react-parser";
import { CookiesPostOrder } from "../../data/constants";
import { getCookie } from "../../utils/functions";
import { postOrderSend } from "../../services/emails";
const PostOffer = () => {
  const [orderState, setOrderState] = useState<
    "initState" | "requestState" | "pendingState" | "errorState" | "finishState"
  >("initState");

  useEffect(() => {
    const removeBannerUp = () => {
      const headTitle = document.querySelectorAll("[class^='TopBanner_bigBlanaBanner__']");
      if (headTitle[0]) {
        headTitle[0].remove();
      }
    };
    removeBannerUp();
  }, []);

  useEffect(() => {
    if (orderState === "finishState") {
    }
  }, [orderState]);

  const handleSend = async () => {
    setOrderState("pendingState");
    if (getCookie(CookiesPostOrder) !== "Nothing") {
      console.log("Cookie post order is:", JSON.parse(getCookie(CookiesPostOrder)));
      try {
        const postOrderData = getCookie(CookiesPostOrder);
        console.log("[PostOrder] Sending data:", postOrderData);
        const postOrderDataObject = JSON.parse(postOrderData);

        return await postOrderSend({ firstName: postOrderDataObject.firstName, lastName: postOrderDataObject.lastName })
          .then((response) => {
            response.json().then((jsonResponse: any) => {
              console.log("Sending the postOrder order:", postOrderDataObject, jsonResponse);
            });

            setOrderState("finishState");
          })
          .catch((error) => {
            setOrderState("errorState");
            console.log(error);
          });
      } catch (error) {
        setOrderState("errorState");
        console.log(error);
      }
    }
  };
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
            <p className={styles.yellow}>
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
            <button
              style={{
                backgroundColor: orderState === "finishState" ? "yellow" : "",
                color: orderState === "finishState" ? "black" : ""
              }}
              onClick={handleSend}
              className={styles.addToOrder}
            >
              {orderState === "initState"
                ? "ADAUGĂ LA COMANDA PLASATĂ"
                : orderState === "pendingState"
                ? "SE TRIMITE..."
                : "COMANDĂ RECEPTIONATĂ"}
            </button>
            <div className={styles.notifyCTA}>
              <span className={styles.warning}>{"SE ADAUGĂ LA COMANDA ANTERIOARĂ"}</span>
              <span className={styles.info}>{"Nu mai este necesară re-completarea datelor"}</span>
            </div>
          </div>
          <div className="pitchSecond"></div>
        </div>
      </div>
    </>
  );
};

export default PostOffer;
