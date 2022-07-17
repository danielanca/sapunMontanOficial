import React, { useState } from "react";
import { BrowserRouter as Router, useLocation } from "react-router-dom";
import { uniqueId } from "lodash";

import Relaxbar from "./MiniComponents/Footers/Relaxbar";
import { footerData } from "./../data/componentStrings";
import styles from "./../components/FooterMontan.module.scss";
import flagRomania from "./../media/assets/pics/prezentareCarbune/flagRO.jpg";
import NewsletterBanner from "./MiniComponents/HeadLiners/NewsletterBanner";
import allPathsURL from "./../data/allPathsURL";

const FooterMontan = () => {
  const { pathname } = useLocation();

  return (
    <>
      {!pathname.includes(allPathsURL.adminURL) && !pathname.includes(allPathsURL.loginURL) && (
        <div className={styles.fluidHandler}>
          {!pathname.includes(allPathsURL.cartPageURL) && (
            <>
              <Relaxbar />
              <NewsletterBanner />
            </>
          )}

          <div className={"row " + styles.largeFooter}>
            <div className="col-md-4">
              <div className="row">
                <div className={"col " + styles.footItem}>
                  <h3 className={styles.footerTittleCenter}>{"LINK-URI UTILE"}</h3>
                  {Object.values(footerData.linkuriUtile).map((item) => (
                    <a key={uniqueId()} href={item.link}>
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
                      return (
                        <p key={uniqueId()} className={styles.classicText}>
                          {item}
                        </p>
                      );
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
                    <a key={uniqueId()} href={item.link}>
                      <p className={styles.classicText}>{item.name}</p>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className={styles.wideBanner}>
              <img className={styles.flagStyle} src={flagRomania} />
              <p className={styles.statementRO}>{"Făcute cu drag, in Romania"}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FooterMontan;
