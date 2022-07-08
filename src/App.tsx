/* eslint-disable */
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom";
import React, { useEffect, useState, Suspense, lazy } from "react";
import ReactGA from "react-ga4";
// import "bootstrap/dist/css/bootstrap.min.css";

import MainNavigation from "./Navigation/MainNavigation";
import Testimonials from "./components/Testimonials";
import Navbar from "./components/Navbar";

import ProduseleNoastre from "./components/ProduseleNoastre";
import ProductView from "./components/Product/ProductView";
import FooterMontan from "./components/FooterMontan";
import CartPage from "./components/CartPage";
import FinishOrder from "./components/CartPage/FinishOrder";
import Blogs from "./components/Blogs";
// import AdminArea from "./components/AdminArea/AdminArea";
import BlogPost from "./components/BlogPost";
import { getData } from "./data/productList";
import OrderView from "./components/OrderView/OrderView";
import OrderDone from "./components/CartPage/OrderDone";

import { AuthProvider } from "./components/context/AuthProvider";
import { getCookie } from "./components/CookieConsent/functions";
import CookieConsent from "./components/CookieConsent/CookieConsent";

import CheckAuth from "./components/AdminArea/CheckAuth";
import SimpleContent from "./blocks/SimpleContent";
import NotFound from "./components/NotFound/NotFound";
// import RequireAuth from "./components/AdminArea/RequireAuth";
// import Login from "./components/AdminArea/LogIn";
// import UpdateProducts from "./components/AdminArea/UpdateProducts";
// import EditProduct from "./components/AdminArea/EditProduct";
// import AddProduct from "./components/AdminArea/AddProduct";
import "./App.css";
// ReactGA.initialize('G-2WGBH4M82T');
// ReactGA.send('pageview');

export const ProductsContext = React.createContext<any[]>([]);

const AdminArea = lazy(() => import("./components/AdminArea/AdminArea"));
const RequireAuth = lazy(() => import("./components/AdminArea/RequireAuth"));
const Login = lazy(() => import("./components/AdminArea/LogIn"));
const UpdateProducts = lazy(() => import("./components/AdminArea/UpdateProducts"));
const EditProduct = lazy(() => import("./components/AdminArea/EditProduct"));
// const AddProduct = lazy(() => import("./components/AdminArea/AddProduct"));
const Loading = () => <div>LOADING</div>;

function App() {
  const [letsCartHandler, CartHandler] = useState(1);
  const [ssProducts, setSSproducts] = useState<any>();

  const getCookieConsent = () => {
    if (getCookie("cookieConsentBrasov") === "userAccepted") return false;
    else return true;
  };

  const handleScroll = () => {
    const bottom = Math.ceil(window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight;

    if (bottom) {
      ReactGA.event("User scrolled to bottom");
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll, {
      passive: true
    });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (ssProducts == null) {
      getData().then((finalData) => {
        console.log("Loading in Session Storage data about products", finalData);
        sessionStorage.setItem("productsFetched", JSON.stringify(finalData));
      });
    }
  }, [ssProducts]);

  return (
    <div className="App">
      {getCookieConsent() && <CookieConsent />}
      <header className="App-header">
        <ProductsContext.Provider productsData={ssProducts}>
          <React.Suspense fallback={Loading}>
            <BrowserRouter basename="/">
              <AuthProvider>
                <Navbar clearNotif={letsCartHandler} />
                <Routes>
                  {/* protect this */}

                  <Route element={<RequireAuth />}>
                    <Route path="/admin" element={<AdminArea />} />
                    <Route path="/admin/products" element={<UpdateProducts />} />
                    <Route path="/admin/products/edit-:productID" element={<EditProduct editMode={true} />} />
                    <Route path="/admin/products/add" element={<EditProduct editMode={false} />} />
                  </Route>
                  <Route element={<CheckAuth />}>
                    <Route path="/login" element={<Login />} />
                  </Route>
                  {/* protect the above */}

                  <Route path={`${process.env.PUBLIC_URL}/produsele-noastre`} element={<ProduseleNoastre />} />
                  <Route path="/produs/:productID" element={<ProductView notifyMe={CartHandler} />} />
                  <Route path="/cosulmeu" element={<CartPage notifyMe={CartHandler} />} />
                  <Route path="/finalizare-comanda" element={<FinishOrder clearNotification={CartHandler} />} />

                  <Route path="/blogs" element={<Blogs />} />
                  <Route path="/blogid/:blogLink" element={<BlogPost />} />
                  <Route path="/testimonials" element={<Testimonials />} />
                  <Route path="/order/:orderID" element={<OrderView />} />
                  <Route path="/" element={<MainNavigation />} />

                  {/* Content Template*/}
                  <Route path="/termeni-si-conditii" element={<SimpleContent type={"Terms"} />} />
                  <Route path="/metode-plata" element={<SimpleContent type={"PaymentMethods"} />} />
                  <Route path="/politica-retur" element={<SimpleContent type={"RefundPolicy"} />} />
                  <Route path="/politica-confidentialitate" element={<SimpleContent type={"PrivacyPolicy"} />} />
                  <Route path="/politica-de-cookies" element={<SimpleContent type={"CookiesPolicy"} />} />
                  <Route path="/afiliere" element={<SimpleContent type={"AffiliateProgram"} />} />
                  {/* Content Template*/}

                  <Route path="*" element={<NotFound />} />
                </Routes>
                <FooterMontan />
              </AuthProvider>
            </BrowserRouter>
          </React.Suspense>
        </ProductsContext.Provider>
      </header>
    </div>
  );
}

export default App;
