import axios from "axios";

import OrderDone from "./OrderDone";
import images from "./../../data/images";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import app from "./../../firebase";
import productList from "./../../data/productList";
import { componentStrings } from "../../data/componentStrings";
import { useState, useEffect, useCallback } from "react";
import { sendOrderConfirmation } from "./../../services/emails";
import styles from "./../CartPage/FinishOrder.module.scss";
import { orderProps } from "./../../utils/OrderInterfaces";

interface ErrorProps {
  paymentSelected: boolean;
  termsAccepted: boolean;
  inputCompleted: boolean;
}

const FinishOrder = () => {
  const [emailSentConfirmed, setSent] = useState(false);
  let productSessionStorage = JSON.parse(sessionStorage.getItem("productsFetched"));
  const handleSend = async () => {
    try {
      await sendOrderConfirmation(orderData).then();
    } catch (error) {
      console.log(error);
    }
  };

  const [orderData, setorderData] = useState<orderProps>({
    firstName: "",
    lastName: "",
    emailAddress: "",
    deliveryAddress: "",
    city: "",
    county: "",
    paymentMethod: "",
    cartProducts: "",
    cartSum: subtotalPrepare,
    shippingTax: deliveryFee,
    orderNotes: ""
  });

  const [finishOrderRequested, setFinishRequested] = useState<number>(null);
  const [completionState, setError] = useState<ErrorProps>({
    paymentSelected: false,
    termsAccepted: false,
    inputCompleted: false
  });

  const sendOrderData = () => {
    setFinishRequested(finishOrderRequested + 1);

    console.log(orderData);

    handleSend();
  };
  const inputHandler = (data: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = data.target;

    setorderData((orderData) => ({
      ...orderData,
      [name]: value
    }));
  };

  var storedCart = [];
  var subtotalPrepare = 0;
  var deliveryFee = 15;
  let expectedData = localStorage.getItem("cartData");
  var explicitProductList = [];
  if (expectedData != null) {
    storedCart = JSON.parse(expectedData);
    // console.log("We have");
    // console.log(storedCart);
    // console.log
    storedCart.map((item) => {
      // console.log("finish order price" + Number(productSessionStorage[item.id].price));
      // console.log("finish order itemNumber:" + Number(item.itemNumber));
      // console.log("finish order name" + productSessionStorage[item.id].title);
      // console.log("Index " + subtotalPrepare);
      subtotalPrepare += Number(productSessionStorage[item.id].price) * Number(item.itemNumber);
      explicitProductList.push({
        id: item.id,
        name: productSessionStorage[item.id].title,
        itemNumber: item.itemNumber,
        imageProduct: productSessionStorage[item.id].imageProduct[0],
        price: productSessionStorage[item.id].price
      });
    });

    console.log("EXPLICIT PRODS:", explicitProductList);
    console.log(orderData);
  }
  const termAcceptHandler = () => {
    setError((completionState) => ({ ...completionState, termsAccepted: !completionState.termsAccepted }));
  };

  useEffect(() => {
    setorderData({
      ...orderData,
      cartSum: subtotalPrepare,
      shippingTax: deliveryFee,
      cartProducts: JSON.stringify(explicitProductList)
    });
  }, [subtotalPrepare]);

  useEffect(() => {
    console.log("Payment is :", orderData.paymentMethod);
  }, [orderData.paymentMethod]);

  useEffect(() => {
    if (finishOrderRequested == 0) {
      return;
    }
    if (
      orderData.firstName.length >= 2 &&
      orderData.lastName.length >= 2 &&
      orderData.city.length >= 2 &&
      orderData.county.length >= 2 &&
      orderData.phoneNo.length >= 2 &&
      orderData.deliveryAddress.length >= 2
    ) {
      setError((completionState) => ({ ...completionState, inputCompleted: true }));
    } else {
      setError((completionState) => ({ ...completionState, inputCompleted: false }));
    }
    if (orderData.paymentMethod != "") {
      setError((completionState) => ({ ...completionState, paymentSelected: true }));
    }
    console.log("Finish order request", finishOrderRequested);
  }, [finishOrderRequested, orderData]);
  return (
    <div className={styles.FinishSection}>
      {!emailSentConfirmed ? (
        <>
          <div className={styles.topTitle}>
            <div className={styles.cartLine} />
            <h3 className={styles.finishOrderTitle}>{"Finalizeaza comanda"}</h3>
            <div className={styles.cartLine} />
          </div>
          <div className={"row " + styles.finishOrderContainer}>
            <div className={"col-6  col-sm-12 " + styles.leftContainer}>
              <div>
                <h3 className={styles.topBillText}>{"Detalii pentru facturare"}</h3>
              </div>
              <div className={styles.groupInput}>
                <div className={styles.inputBox}>
                  <label>
                    {"Nume"}
                    <span className={styles.alertAsterisk}>{"*"}</span>
                  </label>

                  <input
                    onChange={(event) => {
                      setorderData({ ...orderData, firstName: event.target.value });
                    }}
                    value={orderData.firstName}
                    name="firstName"
                    type={"large"}
                  ></input>
                </div>
                <div className={styles.inputBox}>
                  <label>
                    {"Prenume"}
                    <span className={styles.alertAsterisk}>{"*"}</span>
                  </label>
                  <input name="lastName" type={"large"} onChange={inputHandler} value={orderData.lastName}></input>
                </div>
              </div>
              <div className={styles.groupInput}>
                <div className={styles.inputBox}>
                  <label>
                    {"Strada"}
                    <span className={styles.alertAsterisk}>{"*"}</span>
                  </label>
                  <input
                    name="deliveryAddress"
                    type={"large"}
                    onChange={(event) => {
                      setorderData({ ...orderData, deliveryAddress: event.target.value });
                    }}
                    value={orderData.deliveryAddress}
                  ></input>
                </div>
              </div>
              <div className={styles.groupInput}>
                <div className={styles.inputBox}>
                  <label>
                    {"Oras"}
                    <span className={styles.alertAsterisk}>{"*"}</span>
                  </label>
                  <input
                    name="city"
                    type={"large"}
                    onChange={(event) => {
                      setorderData({ ...orderData, city: event.target.value });
                    }}
                    value={orderData.city}
                  ></input>
                </div>
              </div>
              <div className={styles.groupInput}>
                <div className={styles.inputBox}>
                  <label>
                    {"Judet"}
                    <span className={styles.alertAsterisk}>{"*"}</span>
                  </label>
                  <input
                    list={"county"}
                    type={"large"}
                    name="county"
                    onChange={(event) => {
                      setorderData({ ...orderData, county: event.target.value });
                    }}
                    value={orderData.county}
                  ></input>
                  <datalist id="county">
                    {Object.values(componentStrings.FinishOrder.countyList).map((item) => (
                      <option value={item} />
                    ))}
                  </datalist>
                </div>
              </div>
              <div className={styles.groupInput}>
                <div className={styles.inputBox}>
                  <label>
                    {"Telefon"}
                    <span className={styles.alertAsterisk}>{"*"}</span>
                  </label>
                  <input
                    name="phone"
                    type={"large"}
                    onChange={(event) => {
                      setorderData({ ...orderData, phoneNo: event.target.value });
                    }}
                  ></input>
                </div>
              </div>
              <div className={styles.groupInput}>
                <div className={styles.inputBox}>
                  <label>{"Adresa de Email:"}</label>
                  <input
                    name="emailAddress"
                    type={"large"}
                    onChange={(event) => {
                      setorderData({ ...orderData, emailAddress: event.target.value });
                    }}
                    value={orderData.emailAddress}
                  ></input>
                </div>
              </div>
              <div className={styles.groupInput}>
                {/* <div className={styles.checkBoxStyle}>
              <input name="alternativeShipping" type={'checkbox'}></input>
              <label htmlFor="alternativeShipping" className={styles.deliverOption}>
                {'Livrare la altă adresa?'}
              </label>
            </div> */}
              </div>
              <div className={styles.groupInput}>
                <div className={styles.inputBox}>
                  <label className={styles.optionalNote}>{"Note comandă [opțional]"}</label>
                  <textarea
                    spellCheck="false"
                    rows={2}
                    onChange={(event) => {
                      setorderData({ ...orderData, orderNotes: event.target.value });
                    }}
                    value={orderData.orderNotes}
                  ></textarea>
                </div>
              </div>
            </div>
            <div className={"col-6 col-sm-12 " + styles.rightContainer}>
              <div className={styles.rightChild}>
                <div className={styles.legendsTable}>
                  <span>{"Produs"}</span>
                  <span>{"Subtotal"}</span>
                </div>
                <ul className={styles.itemUl}>
                  {storedCart.map((item) => (
                    <li className={styles.itemLi}>
                      <span className={styles.productSummarizeTitle}>{productSessionStorage[item.id].title}</span>
                      <span className={styles.count}>{Number(item.itemNumber) + " x"}</span>
                      <span className={styles.price}>{Number(productSessionStorage[item.id].price)}</span>
                    </li>
                  ))}
                </ul>
                <span className={styles.subTotal}>{" Subtotal: RON  " + subtotalPrepare}</span>
                <span className={styles.subTotal}>{" Transport: RON  " + deliveryFee}</span>
                <span className={styles.subTotal}>{" - - - - - - - - -  - - - -"}</span>
                <span className={styles.subTotal}>
                  {" Total:  RON " + (Number(subtotalPrepare) + Number(deliveryFee))}
                </span>
                <span className={styles.VATincluded}>{"TVA Inclus"}</span>
              </div>
              <div>
                <span className={styles.deliveryInfo}>{"Livrarea produselor se va face in 24-48 ore"}</span>
                <img className={styles.carShip} src={images.deliveryCar} />
              </div>
              <div>
                <div className={styles.deliveryCheckbox}>
                  <span className={styles.paymentDetails}>{"MODALITATE DE PLATA"}</span>
                  {/* <div className={styles.checkboxer}>
                <input id="cardcheck" type="radio" name="radio" value="1" />
                <label htmlFor="cardcheck">Plata prin Card</label>
              </div> */}
                  <div className={styles.checkboxer}>
                    <input
                      id="delivercheck"
                      type="radio"
                      name="radio"
                      value={"Ramburs"}
                      checked={orderData.paymentMethod != ""}
                      onChange={(e) => {
                        setorderData({ ...orderData, paymentMethod: "rambursPayment" });
                      }}
                    />
                    <label htmlFor="delivercheck">Plata Ramburs</label>
                  </div>
                </div>
              </div>
              {finishOrderRequested && orderData.paymentMethod === "" ? (
                <h4 className="text-center " style={{ color: "red" }}>
                  {"Nu ati selectat metoda de plata!"}
                </h4>
              ) : (
                ""
              )}
            </div>
            {finishOrderRequested >= 1 && !completionState.inputCompleted && (
              <div className="col-12">
                <h4 className={styles.warningOrder} style={{ color: "red", margin: "auto", textAlign: "center" }}>
                  {"Verificati datele introduse. Completarea spatilor cu * bulina sunt obligatorii"}
                </h4>
              </div>
            )}
            <div className={"col-12 " + styles.paymentShipContainer}>
              <div className={styles.paymentContainer}>
                <p className={styles.GDPRNotify}>
                  {
                    "Datele dumneavoastre personale vor fi folosite pentru a vă procesa comanda, pentru a vă susține experiența pe tot acest site web și pentru alte scopuri descrise în "
                  }
                  <a className={styles.extensiveGdpr}>{"politica de confidentialitate"}</a>
                </p>

                <div className={styles.groupInputTerms}>
                  <div className={styles.checkBoxStyle}>
                    <input
                      defaultChecked={completionState.termsAccepted}
                      onChange={termAcceptHandler}
                      name="acceptTerms"
                      type={"checkbox"}
                    />
                    <label htmlFor="acceptTerms" className={styles.acceptTerms}>
                      {"Am citit și sunt de acord cu termenii și condiții site-ului web "}
                    </label>
                  </div>
                  {finishOrderRequested && !completionState.termsAccepted && (
                    <h4 className={styles.termConditionAlert}>
                      {"Trebuie sa fiti de-acord cu termenii si conditiile pentru a plasa comanda!"}
                    </h4>
                  )}
                </div>
                <button onClick={sendOrderData} type="submit" className={styles.finishOrder}>
                  {"TRIMITE COMANDA"}
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        // <OrderDone />
        ""
      )}
    </div>
  );
};

export default FinishOrder;
