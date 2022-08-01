import React, { useEffect, useState } from "react";
import { HashLink, HashLink as Link, NavHashLink } from "react-router-hash-link";
import ReactGA from "react-ga4";
import { BrowserRouter as Router, useLocation } from "react-router-dom";
import { getCartItems } from "./CartPage";
import TopBanner from "./TopBanner";

import MenuMobileSide from "./MenuMobileSide";
import roFLAG from "./../media/assets/pics/prezentareCarbune/flagRO.jpg";

import styles from "./Navbar.module.scss";
import images from "../data/images";
import strings from "../data/strings.json";

interface NavProps {
  updateNotification?: () => void;
  clearNotif: number;
}

const NavBar = ({ clearNotif }: NavProps) => {
  const { pathname } = useLocation();
  const [totalItems, setTotalItems] = useState<number>(getCartItems());

  useEffect(() => {
    console.log("CLICKED", getCartItems());
    setTotalItems(getCartItems());
  }, [clearNotif]);

  const sendAnalyticsIdea = () => {
    ReactGA.event("User pressed on gallery");
  };

  return (
    <>
      {!pathname.includes("/admin") && !pathname.includes("/login") && (
        <>
          <TopBanner />
          <div className={styles.WeRomanians} />
          <div className={styles.wrapper}>
            <div className={styles.navbarContainer}>
              <div className={styles.sideLeftContainer}></div>
              <ul className={styles.ulMenuEnd}>
                <li onClick={() => sendAnalyticsIdea()} className={styles.liItem}>
                  <NavHashLink className={styles.HashLinkStyle} smooth to="/produsele-noastre">
                    {strings.navMenu.ourProducts}
                  </NavHashLink>
                </li>
                <li className={styles.liItem}>
                  <NavHashLink className={styles.HashLinkStyle} to="/blogs">
                    {strings.navMenu.blog}
                  </NavHashLink>
                </li>
              </ul>

              <div className={styles.middleNoUl}>
                <HashLink className={styles.logoHover} to="/">
                  <img className={styles.montanLogo} src={images.websiteLogo} />
                  <div className={styles.WeRomanians}>
                    <span>{"Produs Românesc"}</span>
                    <img className={styles.roProduct} src={roFLAG} />
                  </div>
                </HashLink>
              </div>

              <MenuMobileSide />
              <ul className={styles.ulMenuStart}>
                <li className={styles.liItem}>
                  <NavHashLink className={styles.HashLinkStyle} to="/testimonials">
                    {strings.navMenu.testimonials}
                  </NavHashLink>
                </li>
                <li className={styles.liItem}>
                  <NavHashLink className={styles.HashLinkStyle} to="/contact">
                    {strings.navMenu.contactUs}
                  </NavHashLink>
                </li>
              </ul>
              <div className={styles.sideRightContainer}>
                <NavHashLink className={styles.hashTransparent} to="/cosulmeu">
                  <img className={styles.shopIcon} src={images.cartLogo} />
                  <span className={styles.jewel}>{totalItems}</span>
                </NavHashLink>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default NavBar;
