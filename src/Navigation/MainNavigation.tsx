import { useRef, useState } from "react";
import React from "react";
import HelloAll from "../blocks/HelloAll";
import ProductsGallery from "../components/SuggestedProducts/ProductsGallery";
import FeaturedProduct from "../blocks/FeaturedProduct";
import BrandDetails from "../components/MiniComponents/Products/BrandDetails";
import styles from "./MainNavigation.module.scss";
import { useOutsideClicker } from "../hooks/onScreen";
import { useProducts } from "./../components/hooks/useProducts";
import FeaturedText from "../components/MiniComponents/Products/FeaturedText";
import GrayBanner from "../components/MiniComponents/HeadLiners/GrayBanner";
import NewsletterPop from "./../components/Newsletter/NewsletterPop";

const MainNavigation = () => {
  const products = useProducts();
  const backdropRef = useRef(null);
  const [newsletterPopModal, setNeModalletterPop] = useState<boolean>(true);

  const backdropClose = () => {
    setNeModalletterPop(false);
  };
  useOutsideClicker(backdropRef, () => {
    backdropClose();
  });
  return (
    <>
      {newsletterPopModal && (
        <div ref={backdropRef} className={styles.backDrops}>
          <div className={styles.closePop} onClick={backdropClose}>
            X
          </div>
          <NewsletterPop />
        </div>
      )}

      <HelloAll />
      <FeaturedProduct />
      <BrandDetails />
      <FeaturedText text={{ title: "MontanAir", textSmall: "DESCOPERA BENEFICIILE CARBUNELUI" }} />
      <ProductsGallery productsToShow={products} />
      <GrayBanner text="Am pregătit <strong>pachetele noastre </strong> pentru toată lumea care dorește să utilizeze mai multe produse la prețuri mai mici. Atunci când alegeți unul dintre aceste pachete, <strong>transportul este gratuit </strong>, prin urmare majoritatea clienților noștri aleg aceste oferte." />
    </>
  );
};

export default MainNavigation;
