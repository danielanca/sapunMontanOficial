import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, useLocation } from "react-router-dom";
import { uniqueId } from "lodash";
import images from "../data/images";
import Relaxbar from "./MiniComponents/Footers/Relaxbar";
import { footerData } from "../data/componentStrings";
import styles from "./../components/Footer.module.scss";
import strings from "../data/strings.json";
import NewsletterBanner from "./MiniComponents/HeadLiners/NewsletterBanner";
import parse from "html-react-parser";
import allPathsURL from "./../data/allPathsURL";
import { getStringsList } from "../services/emails";
import { getType } from "./AdminArea/EditStrings/TableTypes";

import { socialString } from "./../data/componentStrings";

const Footer = () => {
  // let { links, commercialData, ourShop } = strings.footerText.headLines;
  const { pathname } = useLocation();
  const [footerFetch, setFooterFetch] = useState({});
  useEffect(() => {
    getStringsList("legalInfo").then((result: getType) => {
      setFooterFetch(JSON.parse(JSON.stringify(result.resultSent.legalData)));
    });
  }, []);

  let navItems = strings.navItemsFooter;

  return (
    <>
      {!pathname.includes(allPathsURL.adminURL) && !pathname.includes(allPathsURL.loginURL) && (
        <div className={styles.footerBlock}>
          <div className={styles.fluidHandler}>
            <div className={styles.logoContainer}>
              <img src={images.rionaLogo} />
            </div>
            <div className={styles.description}>
              <p>
                {parse(
                  `Conceptualizăm, cercetăm și dezvoltăm soluții vizuale și strategice, care redefinesc experiența de brand. <br> Toate drepturile sunt rezervate. Copyright © 2004 - 2023, Riona SRL`
                )}
              </p>
            </div>
            <div className={styles.logoSocials}>
              <div className={styles.socialsContainer}>
                {Object.values(socialString).map((item) => (
                  <img src={item.imageSrc} />
                ))}
              </div>
            </div>
            <div className={styles.navItems}>
              <ul className={styles.navItemsUL}>
                {Object.values(navItems).map((item) => (
                  <li key={uniqueId()}>{item.text}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Footer;
