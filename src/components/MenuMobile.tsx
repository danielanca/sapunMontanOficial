import { useState } from 'react';
import { HashLink as Link, NavHashLink } from 'react-router-hash-link';

import styles from './../components/Navbar.module.scss';

import strings from '../data/strings.json';

const MenuMobile = () => {
  const [BurgerOpen, setBurgerOpen] = useState(false);
  const burgerClickHandler = (event: boolean) => {
    setBurgerOpen(!BurgerOpen);
  };
  return (
    <>
      <div
        className={styles.burgerElement}
        onClick={() => {
          burgerClickHandler(!BurgerOpen);
        }}
      >
        <div className={BurgerOpen ? `${styles.bar1} ${styles.bar1End}` : `${styles.bar1}`}></div>
        <div className={BurgerOpen ? `${styles.bar2} ${styles.bar2End}` : `${styles.bar2}`}></div>
        <div className={BurgerOpen ? `${styles.bar3} ${styles.bar3End}` : `${styles.bar3}`}></div>
      </div>
      <div
        onClick={() => {
          burgerClickHandler(!BurgerOpen);
        }}
        className={BurgerOpen ? `${styles.backDropBackground} ${styles.active}` : `${styles.backDropBackground}`}
      ></div>
      <div className={BurgerOpen ? `${styles.burgerMenu} ${styles.activeBurger} ` : `${styles.burgerMenu}`}>
        <ul className={styles.ulMobile}>
          <li className={styles.liMobile}>
            <NavHashLink className={styles.HashLinkStyle} to="#aboutus">
              {strings.navMenu.aboutUs}
            </NavHashLink>
          </li>
          <li className={styles.liMobile}>
            <NavHashLink className={styles.HashLinkStyle} to="#gallery">
              {strings.navMenu.gallery}
            </NavHashLink>
          </li>
          <li className={styles.liMobile}>
            <NavHashLink className={styles.HashLinkStyle} to="#offers">
              {strings.navMenu.offers}
            </NavHashLink>
          </li>
          <li className={styles.liMobile}>
            <NavHashLink className={styles.HashLinkStyle} to="#reviews">
              {strings.navMenu.reviews}
            </NavHashLink>
          </li>
          <li className={styles.liMobile}>
            <NavHashLink className={styles.HashLinkStyle} to="#contactus">
              {strings.navMenu.contactUs}
            </NavHashLink>
          </li>
        </ul>
      </div>
    </>
  );
};

export default MenuMobile;
