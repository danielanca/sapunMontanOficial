import React, { useState, useEffect } from "react";
import { NavHashLink } from "react-router-hash-link";
import { productConstants } from "../data/componentStrings";
import ItemCartList from "./ItemCartList";

import styles from "./CartPage.module.scss";
interface ProductSessionProps {
  [key: string]: {
    ID: string;
    ULBeneficii: string[];
    firstDescription: string;
    imageProduct: string[];
    jsonContent: string;
    price: string;
    reviews: {};
    shortDescription: string;
    title: string;
  };
}
interface ProductCookiesProps {
  id: string;
  itemNumber: string;
}
interface CartProps {
  notifyMe: React.Dispatch<React.SetStateAction<number>>;
  // notifyMe?: React.Dispatch<React.SetStateAction<number>>;
}

const makeCheck = (sessionData: ProductSessionProps, cartData: ProductCookiesProps[]) => {
  let namesNotFound: string[] = [];

  cartData.forEach((item, index, object) => {
    if (sessionData != null && !sessionData.hasOwnProperty(item.id)) {
      namesNotFound.push(item.id);
    }
  });

  return cartData.filter((filterItem) => !namesNotFound.includes(filterItem.id));
};

const CartPage = ({ notifyMe }: CartProps) => {
  const [updateMade, setupdateMade] = useState<number>(1);
  var subtotalPrepare = 0;
  var expectedData = localStorage.getItem("cartData");
  var sessionProducts: ProductSessionProps | null;
  var storedCart: ProductCookiesProps[] | null = null;
  var shippingFee = productConstants.shippingFee;
  let sessionFlat = sessionStorage.getItem("productsFetched");

  if (typeof sessionFlat === "string") {
    sessionProducts = JSON.parse(sessionFlat);
  } else {
    sessionProducts = null;
  }

  if (sessionProducts !== null && expectedData != null) {
    storedCart = JSON.parse(expectedData);
    if (storedCart != null) {
      storedCart = makeCheck(sessionProducts, storedCart);
      storedCart.map((item) => {
        subtotalPrepare += Number(sessionProducts[item.id].price) * Number(item.itemNumber);
      });
    }
  }

  const productNotification = () => {
    setupdateMade(updateMade + 1);
    notifyMe(updateMade);
  };

  const displayFinishOrderDialog = () => {
    if (subtotalPrepare > 0) {
      return (
        <NavHashLink className={styles.hashTransparent} to="/finalizare-comanda">
          <button className={styles.finishOrder}>{"Finalizeaza comanda"}</button>
        </NavHashLink>
      );
    }
  };
  return (
    <>
      <div className={styles.CartSection}>
        <div className={styles.topTitle}>
          <div className={styles.cartLine} />
          <h3 className={styles.middleCosText}>{"Cos de cumparaturi"}</h3>
          <div className={styles.cartLine} />
        </div>

        {displayFinishOrderDialog()}
        <div className={styles.actualCartBox}>
          <div className={styles.topline}>
            <div className={"col-sm-8 "}>
              <h3 className={styles.cartProductTitle}>{"Produse"}</h3>
            </div>
            <div className={"col-sm-3 "}>
              <h3 className={styles.cartProductTitle}>{"Cantitate"}</h3>
            </div>
          </div>

          {subtotalPrepare !== 0 ? (
            storedCart != null &&
            storedCart.map((item) => (
              <ItemCartList productID={item.id} amount={Number(item.itemNumber)} updateRequest={productNotification} />
            ))
          ) : (
            <div className={styles.emptyCart}>{"Cosul de cumparaturi este gol"}</div>
          )}
        </div>
        {subtotalPrepare !== 0 ? (
          <div className={"row " + styles.actualCheckout}>
            <div className={"col-sm-6 " + styles.bottomLeft}></div>
            <div className={"col-sm-6 " + styles.bottomRight}>
              <div className={styles.checkoutTotal}>
                <h3>{"Total Cos"}</h3>
                <div className={styles.subtotalContainer}>
                  <div className={styles.subtotalLine + " row "}>
                    <div className="col-sm-4 d-flex align-items-center justify-content-end">
                      <p className={styles.toRight}>{"Subtotal:"}</p>
                    </div>
                    <div className={"col-sm-8 d-flex justify-content-start align-items-center "}>
                      <p className={styles.subtotalStyle}>{subtotalPrepare + " LEI"}</p>
                    </div>
                  </div>
                  <div className={styles.deliveryLine + " row "}>
                    <div className="col-sm-4 d-flex align-items-center justify-content-end">
                      <p className={styles.toRight}>{"Subtotal:"}</p>
                    </div>
                    <div className="col-sm-8 d-flex justify-content-start align-items-center">
                      <p className={styles.subtotalStyle}>
                        {`Livrare standard prin SameDay:  ${shippingFee}.00 RON  Livrare oriunde in România.`}
                      </p>
                    </div>
                  </div>
                  <div className={styles.totalLine + " row "}>
                    <div className="col-sm-4 d-flex align-items-center justify-content-end">
                      <p className={styles.toRight}>{"TOTAL:"}</p>
                    </div>
                    <div className="col-sm-8 d-flex justify-content-start align-items-center">
                      <p className={styles.subtotalStyle}>{`${subtotalPrepare + shippingFee}.00 (include TVA)`}</p>
                    </div>
                  </div>
                  <div className={styles.finishTheOrderBox}>
                    <NavHashLink className={styles.hashTransparent} to="/finalizare-comanda">
                      <button className={styles.finishOrder}>{"Finalizeaza comanda"}</button>
                    </NavHashLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default CartPage;

export const getCartItems = () => {
  var sessionProducts: ProductSessionProps = JSON.parse(sessionStorage.getItem("productsFetched"));
  var storedCart: ProductCookiesProps[] | null = null;
  var expectedData = localStorage.getItem("cartData");
  storedCart = JSON.parse(expectedData);

  if (expectedData != null) {
    let totalItems = 0;
    let storedCart = JSON.parse(expectedData);
    storedCart = makeCheck(sessionProducts, storedCart);
    storedCart.map((item: ProductCookiesProps) => {
      totalItems = totalItems + Number(item.itemNumber);
    });
    return totalItems;
  } else return 0;
};
