import { useRef, useState } from "react";
import { BrowserRouter as Router, Routes, Route, BrowserRouter, useLocation } from "react-router-dom";

import arrow_down from "./../media/assets/pics/prezentareCarbune/arrow_down.svg";
import flagRomania from "./../media/assets/pics/prezentareCarbune/flagRO.jpg";
import Relaxbar from "./MiniComponents/Footers/Relaxbar";
import { footerData } from "./../data/componentStrings";
import styles from "./../components/FooterMontan.module.scss";

const FooterMontan = () => {
  const [openedContainer, setContainer] = useState(0);
  const footerOpener = useRef(null);
  const { pathname } = useLocation();

  const gotoElement = () => {
    window.scrollTo({ top: footerOpener.current.scrollIntoView(), behavior: "smooth" });
  };
  const clickHandler = (index: number) => {
    if (index === openedContainer) setContainer(index);
    else {
      setContainer(index);
      gotoElement();
    }
  };

  return (
    <>
      {!pathname.includes("/admin") && !pathname.includes("/login") && (
        <div className={styles.fluidHandler}>
          <Relaxbar />
          <div className={"row " + styles.largeFooter}>
            <div className="col-md-4">
              <div className="row">
                <div className={"col " + styles.footItem}>
                  <h3 className={styles.footerTittleCenter}>{"LINK-URI UTILE"}</h3>
                  {Object.values(footerData.linkuriUtile).map((item) => (
                    <a href={item.link}>
                      <p className={styles.classicText}>{item.name}</p>
                    </a>
                  ))}
                </div>
              </div>
            </div>
            <div className="col-md-4">
              {
                <div className="row">
                  <div className={"col " + styles.footItem}>
                    <h3 className={styles.footerTittleCenter}>{"Date Comerciale"}</h3>
                    {Object.values(footerData.companyData).map((item) => {
                      return <p className={styles.classicText}>{item}</p>;
                    })}
                  </div>
                </div>
              }
            </div>
            <div className="col-md-4">
              <div className="row">
                <div className={"col " + styles.footItem}>
                  <h3 className={styles.footerTittleCenter}>{"MAGAZINUL NOSTRU"}</h3>
                  {Object.values(footerData.ourShop).map((item) => (
                    <a href={item.link}>
                      <p className={styles.classicText}>{item.name}</p>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className={styles.wideBanner}>
              <img className={styles.flagStyle} src={flagRomania} />
              <p className={styles.statementRO}>{"Produs Românesti handmade"}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FooterMontan;
