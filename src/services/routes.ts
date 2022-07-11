import ProduseleNoastre from "../components/ProduseleNoastre";
import MainNavigation from "../Navigation/MainNavigation";

const routes = [
  {
    path: "/",
    exact: true,
    component: MainNavigation
  },
  {
    path: "/produsele-noastre",
    component: ProduseleNoastre
  }
];

export default routes;
