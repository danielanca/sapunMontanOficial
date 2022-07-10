import React from "react";
import HelloAll from "../blocks/HelloAll";
import ProductsGallery from "../components/SuggestedProducts/ProductsGallery";
import FeaturedProduct from "../blocks/FeaturedProduct";
import BrandDetails from "../components/MiniComponents/Products/BrandDetails";
import "./MainNavigation.module.scss";
import { useProducts } from "./../components/hooks/useProducts";
import FeaturedText from "../components/MiniComponents/Products/FeaturedText";
const MainNavigation = () => {
  const products = useProducts();

  return (
    <>
      <HelloAll />
      <FeaturedProduct />
      <BrandDetails />
      <ProductsGallery productsToShow={products} />
      <FeaturedText text={{ title: "MontanAir", textSmall: "DESCOPERA BENEFICIILE CARBUNELUI" }} />
    </>
  );
};

export default MainNavigation;
