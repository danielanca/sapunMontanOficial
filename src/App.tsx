/* eslint-disable */
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom";
import React, { useEffect, useState, lazy } from "react";
import ReactGA from "react-ga4";

import MainNavigation from "./Navigation/MainNavigation";

import { getData } from "./data/productList";

import { AuthProvider } from "./components/context/AuthProvider";
import { getCookie } from "./components/CookieConsent/functions";
import CookieConsent from "./components/CookieConsent/CookieConsent";
import NotFound from "./components/NotFound/NotFound";

import "./App.css";
import FAQBlock from "./components/FAQBlock/FAQBlock";
import Footer from "./components/Footer";
import InvoiceView from "./components/OrderView/InvoiceView";
import Dashboard from "./components/AdminArea/ShardsDesign/Dashboard";

export const ProductsContext = React.createContext<any[]>([]);
const FinishOrder = lazy(() => import(/*webpackPreload: true*/ "./components/CartPage/FinishOrder"));
const CartPage = lazy(() => import(/*webpackPreload: true*/ "./components/CartPage/CartPage"));
const CheckAuth = lazy(() => import(/*webpackPreload: true*/ "./components/AdminArea/CheckAuth"));
const Blogs = lazy(() => import(/* webpackPreload: true , webpackChunkName: "Blogs" */ "./components/Blogs"));
const BlogPost = lazy(() => import(/* webpackPreload: true,  webpackChunkName: "BlogPost" */ "./components/BlogPost"));
const ProduseleNoastre = lazy(() =>
  import(/*webpackPreload: true , webpackChunkName: "ProduseleNoastre" */ "./components/ProduseleNoastre")
);
const AdminArea = lazy(() =>
  import(/* webpackPrefetch: true, webpackChunkName: "AdminArea" */ "./components/AdminArea/AdminArea")
);
const RequireAuth = lazy(() =>
  import(/*webpackPrefetch: true , webpackChunkName: "RequireAuth"*/ "./components/AdminArea/RequireAuth")
);
const Login = lazy(() => import(/*webpackPrefetch: true , webpackChunkName: "Login" */ "./components/AdminArea/LogIn"));
const UpdateProducts = lazy(() =>
  import(/*webpackPrefetch: true , webpackChunkName: "UpdateProducts"  */ "./components/AdminArea/UpdateProducts")
);

const OrderView = lazy(() => import("./components/OrderView/OrderView"));
// const Testimonials = lazy(() =>
//   import(/*webpackPrefetch: true , webpackChunkName: "Testimonials" */ "./components/Testimonials")
// );

const SimpleContent = lazy(() => import(/*webpackPrefetch: true*/ "./blocks/SimpleContent"));

const Navbar = lazy(() => import(/* webpackChunkName: "Navbar"  */ "./components/Navbar"));

const ProductView = lazy(() => import("./components/Product/ProductView"));

const EditStrings = lazy(() => import("./components/AdminArea/EditStrings/EditStrings"));
import EditProduct from "./components/AdminArea/EditProduct";
import adminRoutes from "./components/AdminArea/ShardsDesign/routes";
import { useScrollSense } from "./components/hooks/senseHook/useScrollSense";
import { CookiesTagConsent, ProductsFromSessionStorage } from "./data/constants";
const Loading = () => <div>LOADING</div>;
import Homepage from "./pages/Homepage/Homepage";

function App() {
  const [letsCartHandler, CartHandler] = useState(0);
  const [ssProducts, setSSproducts] = useState<any>();

  useScrollSense(() => {
    ReactGA.event(`User scrolled to bottom on [${window.location.pathname}]`);
  });

  const getCookieConsent = () => {
    if (getCookie(CookiesTagConsent) === "userAccepted") return false;
    else return true;
  };

  useEffect(() => {
    if (ssProducts == null) {
      getData().then((finalData) => {
        sessionStorage.setItem(ProductsFromSessionStorage, JSON.stringify(finalData));
      });
    }
  }, [ssProducts]);

  return (
    <div className="App">
      {/* {getCookieConsent() && <CookieConsent />} */}
      <header className="App-header">
        <ProductsContext.Provider productsData={ssProducts}>
          <React.Suspense fallback={Loading()}>
            <BrowserRouter basename="/">
              <AuthProvider>
                <Navbar />

                <Routes>
                  <Route path={`${process.env.PUBLIC_URL}/`} element={<Homepage />} />
                </Routes>
                <Footer />
              </AuthProvider>
            </BrowserRouter>
          </React.Suspense>
        </ProductsContext.Provider>
      </header>
    </div>
  );
}

export default App;
