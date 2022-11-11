import React from "react";
import HelloAll from "../blocks/HelloAll";
import ProductsGallery from "../components/SuggestedProducts/ProductsGallery";
import FeaturedProduct from "../blocks/FeaturedProduct";
import BrandDetails from "../components/MiniComponents/Products/BrandDetails";

import { useProducts } from "./../components/hooks/useProducts";
import FeaturedText from "../components/MiniComponents/Products/FeaturedText";
import GrayBanner from "../components/MiniComponents/HeadLiners/GrayBanner";
import strings from "../data/strings.json";
import featuredProducts from "../data/featuredProducts.json";

const MainNavigation = () => {
  let { DiscoverOurProducts, GrayPromotion } = strings;
  const products = useProducts();

  return (
    <>
      <HelloAll />
      <FeaturedProduct content={featuredProducts.featuredProducts.firstSapun} />
      <BrandDetails />
      <FeaturedText text={DiscoverOurProducts} />
      <ProductsGallery productsToShow={products} />
      <GrayBanner text={GrayPromotion.text} />
    </>
  );
};

export default MainNavigation;
