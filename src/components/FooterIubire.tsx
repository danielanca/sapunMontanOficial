import React from "react";
import { BrowserRouter as Router, useLocation } from "react-router-dom";
import { uniqueId } from "lodash";

import Relaxbar from "./MiniComponents/Footers/Relaxbar";
import { footerData } from "./../data/componentStrings";
import styles from "./../components/FooterIubire.module.scss";
import NewsletterBanner from "./MiniComponents/HeadLiners/NewsletterBanner";
import allPathsURL from "./../data/allPathsURL.json";

const FooterMontan = () => {
  const { pathname } = useLocation();

  return (
    <>
      {!pathname.includes(allPathsURL.adminURL) && !pathname.includes(allPathsURL.loginURL) && (
        <div className={styles.fluidHandler}>
          {!pathname.includes(allPathsURL.cartPageURL) && !pathname.includes(allPathsURL.finishOrderURL) && (
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
              <div className="row">
                <div className={"col " + styles.footItem}>
                  <h3 className={styles.footerTittleCenter}>{"AMINTIRE PENTRU TOTDEAUNA"}</h3>
                  <p key={uniqueId()} className={styles.classicText}>
                    {
                      "Viziunea si scopul nostru este să vă oferim produse prin care puteti crea momente unice ce raman, alaturi de cei dragi. "
                    }
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4 ">
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
              <p className={styles.statementRO}>{"Făcut cu ❤️ in Romania"}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FooterMontan;
