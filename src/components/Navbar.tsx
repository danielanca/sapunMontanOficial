import { HashLink, HashLink as Link, NavHashLink } from 'react-router-hash-link';
import ReactGA from 'react-ga4';

import images from '../data/images';

import styles from './Navbar.module.scss';
import TopBanner from './TopBanner';
import strings from '../data/strings.json';
import MenuMobile from './MenuMobile';

import shoppingCart from './../media/assets/pics/prezentareCarbune/shoppingCart.png';
import roFLAG from './../media/assets/pics/prezentareCarbune/flagRO.jpg';
import { useEffect, useState } from 'react';

interface NavProps {
  updateNotification?: number;
}

const NavBar = ({ updateNotification }: NavProps) => {
  var storedCart = [];
  var totalItems = 0;
  let expectedData = localStorage.getItem('cartData');
  if (expectedData != null) {
    storedCart = JSON.parse(expectedData);
    storedCart.map((item) => {
      totalItems = totalItems + Number(item.itemNumber);
    });
  }

  const sendAnalyticsIdea = () => {
    ReactGA.event('User pressed on gallery');
  };

  return (
    <>
      <TopBanner />
      <div className={styles.WeRomanians}></div>
      <div className={styles.navbarContainer}>
        <div className={styles.cartContainer}></div>
        <ul className={styles.ulMenuEnd}>
          <li onClick={() => sendAnalyticsIdea()} className={styles.liItem}>
            <NavHashLink className={styles.HashLinkStyle} smooth to="#gallery">
              {strings.navMenu.gallery}
            </NavHashLink>
          </li>
          <li onClick={() => sendAnalyticsIdea()} className={styles.liItem}>
            <NavHashLink className={styles.HashLinkStyle} to="/produsele-noastre">
              {strings.navMenu.aboutUs}
            </NavHashLink>
          </li>
        </ul>
        <div className={styles.middleNoUl}>
          <HashLink className={styles.logoHover} to="/">
            <span className={styles.montanLogo}>{'Săpun Montan'}</span>
            <div className={styles.WeRomanians}>
              <span>{'Produs Românesc'}</span>
              <img className={styles.roProduct} src={roFLAG} />
            </div>
          </HashLink>
        </div>
        <MenuMobile />
        <ul className={styles.ulMenuStart}>
          <li className={styles.liItem}>
            <NavHashLink className={styles.HashLinkStyle} to="/blogs">
              {strings.navMenu.blog}
            </NavHashLink>
          </li>
          <li className={styles.liItem}>
            <NavHashLink className={styles.HashLinkStyle} to="/testimonials">
              {strings.navMenu.testimonials}
            </NavHashLink>
          </li>
          <li className={styles.liItem}>
            <NavHashLink className={styles.HashLinkStyle} to="#contactus">
              {strings.navMenu.contactUs}
            </NavHashLink>
          </li>
        </ul>
        <div className={styles.cartContainer}>
          <NavHashLink className={styles.hashTransparent} to="/cosulmeu">
            <img className={styles.shopIcon} src={shoppingCart} />
            <span className={styles.jewel}>{totalItems}</span>
          </NavHashLink>
          <NavHashLink className={styles.hashTransparent} to="/cosulmeu">
            <span className={styles.spanCart}>{'Cosul meu'}</span>
          </NavHashLink>
        </div>
      </div>
    </>
  );
};

export default NavBar;
