/* eslint-disable */
import { BrowserRouter as Router, Routes, Route, BrowserRouter, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import ReactGA from "react-ga4";
import "bootstrap/dist/css/bootstrap.min.css";
import MainNavigation from "./Navigation/MainNavigation";
import Testimonials from "./components/Testimonials";
import Navbar from "./components/Navbar";

import ProduseleNoastre from "./components/ProduseleNoastre";
import ProductView from "./components/ProductView";
import FooterMontan from "./components/FooterMontan";
import CartPage from "./components/CartPage";
import FinishOrder from "./components/CartPage/FinishOrder";
import Blogs from "./components/Blogs";
import AdminArea from "./components/AdminArea/AdminArea";
import BlogPost from "./components/BlogPost";
import { getData } from "./data/productList";
import OrderView from "./components/OrderView/OrderView";
import OrderDone from "./components/CartPage/OrderDone";
import RequireAuth from "./components/AdminArea/RequireAuth";
import Login from "./components/AdminArea/LogIn";
import { AuthProvider } from "./components/context/AuthProvider";
import "./App.css";
import CheckAuth from "./components/AdminArea/CheckAuth";
// ReactGA.initialize('G-2WGBH4M82T');
// ReactGA.send('pageview');

export const ProductsContext = React.createContext<any[]>([]);

function App() {
  const [letsCartHandler, CartHandler] = useState(1);
  const [ssProducts, setSSproducts] = useState<any[]>();
  const [clearRequest, setClearRequest] = useState(false);
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
      <header className="App-header">
        <ProductsContext.Provider productsData={ssProducts}>
          <BrowserRouter basename="/">
            <AuthProvider>
              <Navbar clearNotif={letsCartHandler} />
              <Routes>
                {/* protect this */}
                <Route element={<RequireAuth />}>
                  <Route path="/admin" element={<AdminArea />} />
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
                <Route path="/blogid/:blogid" element={<BlogPost />} />
                <Route path="/testimonials" element={<Testimonials />} />
                <Route path="/order/:orderID" element={<OrderView />} />
                <Route path="/" element={<MainNavigation />} />
                {/* <Route path="*" component={NotFound} /> */}
              </Routes>
              <FooterMontan />
            </AuthProvider>
          </BrowserRouter>
        </ProductsContext.Provider>
      </header>
    </div>
  );
}

export default App;
