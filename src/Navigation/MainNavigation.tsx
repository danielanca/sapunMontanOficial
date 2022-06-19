import HelloAll from "../blocks/HelloAll";
import WelcomeBlock from "../blocks/WelcomeBlock";
import FeaturedProduct from "../blocks/FeaturedProduct";
import BrandDetails from "../components/MiniComponents/Products/BrandDetails";
import "./MainNavigation.module.scss";

const MainNavigation = () => {
  return (
    <>
      <HelloAll />
      <FeaturedProduct />
      <BrandDetails />
    </>
  );
};

export default MainNavigation;
