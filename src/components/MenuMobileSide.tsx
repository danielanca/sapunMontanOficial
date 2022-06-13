import { useState } from "react";
import { HashLink as Link, NavHashLink } from "react-router-hash-link";

import styles from "./../components/MenuMobileSide.module.scss";
import images from "../data/images";
import strings from "../data/strings.json";

const MenuMobileSide = () => {
  const [BurgerOpen, setBurgerOpen] = useState(false);
  const burgerClickHandler = (event: boolean) => {
    setBurgerOpen(!BurgerOpen);
  };
  const closeBackdrop = () => {
    setBurgerOpen(false);
  };
  return (
    <>
      <div className={styles.menuMobileContainer}>
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
      </div>
      <div
        onClick={() => {
          burgerClickHandler(!BurgerOpen);
        }}
        className={BurgerOpen ? `${styles.backDropBackground} ${styles.active}` : `${styles.backDropBackground}`}
      ></div>
      <div className={BurgerOpen ? `${styles.burgerMenu} ${styles.activeBurger} ` : `${styles.burgerMenu}`}>
        <ul className={styles.ulMobile}>
          {Object.values(strings.navMenuMobile).map((item) => {
            if (item.ulItems == 0) {
              return (
                <li className={styles.liMobile}>
                  <NavHashLink onClick={closeBackdrop} className={styles.HashLinkStyle} to={`${item.link}`}>
                    {item.title}
                  </NavHashLink>
                </li>
              );
            } else {
              return (
                <label className={styles.liSubItem}>
                  <input type="checkbox" id="toggle" className={styles.visuallyHidden} />
                  <div className={styles.extendSub}>
                    {item.title}
                    <img className={styles.subItemIcon} src={images.arrowRight} />
                  </div>

                  <ul className={styles.subItemUL}>
                    {Object.values(item.ulItems).map((subItem) => (
                      <li>{subItem.title}</li>
                    ))}
                  </ul>
                </label>
              );
            }
          })}
        </ul>

        <ul className={styles.ulOthers}>
          <li className={styles.individualItem}>
            <img className={styles.icon} src={images.cartLogo} />
            <span>{"Cosul Meu"}</span>
          </li>
          <li className={styles.individualItem}>
            <img className={styles.icon} src={images.heartIcon} />
            <span>{"Favorite"}</span>
          </li>
        </ul>
      </div>
    </>
  );
};

export default MenuMobileSide;
