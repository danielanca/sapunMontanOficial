import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, useLocation } from "react-router-dom";
import { uniqueId } from "lodash";

import Relaxbar from "./MiniComponents/Footers/Relaxbar";
import { footerData } from "./../data/componentStrings";
import styles from "./../components/FooterMontan.module.scss";
import strings from "./../data/strings.json";
import NewsletterBanner from "./MiniComponents/HeadLiners/NewsletterBanner";
import allPathsURL from "./../data/allPathsURL";
import { getStringsList } from "../services/emails";
import { getType } from "./AdminArea/EditStrings/TableTypes";

const FooterMontan = () => {
  let { links, commercialData, ourShop, bottomMadeBy } = strings.footerText.headLines;
  const { pathname } = useLocation();
  const [footerFetch, setFooterFetch] = useState({});
  useEffect(() => {
    getStringsList("legalInfo").then((result: getType) => {
      setFooterFetch(JSON.parse(JSON.stringify(result.resultSent.legalData)));
    });
  }, []);

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
                  <h3 className={styles.footerTittleCenter}>{links}</h3>
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
                    <h3 className={styles.footerTittleCenter}>{commercialData}</h3>
                    {Object.values(footerFetch).map((item) => {
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
                  <h3 className={styles.footerTittleCenter}>{ourShop}</h3>
                  {Object.values(footerData.ourShop).map((item) => (
                    <a key={uniqueId()} href={item.link}>
                      <p className={styles.classicText}>{item.name}</p>
                    </a>
                  ))}
                </div>
              </div>
            </div>
            <div className={styles.wideBanner}>
              <p className={styles.statementRO}>{bottomMadeBy}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FooterMontan;
