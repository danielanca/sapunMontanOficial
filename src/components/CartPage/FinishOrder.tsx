import OrderDone from "./OrderDone";
import images from "./../../data/images";

import { componentStrings, productConstants } from "../../data/componentStrings";
import React, { useState, useEffect } from "react";
import { sendOrderConfirmation } from "./../../services/emails";
import InputComponent from "./../MiniComponents/InputComponent";
import styles from "./../CartPage/FinishOrder.module.scss";
import { orderProps } from "./../../utils/OrderInterfaces";
import { NavHashLink } from "react-router-hash-link";
import { makeCheck } from "./../../functions/utilsFunc";
import strings from "../../data/strings.json";

interface ErrorProps {
  paymentSelected: boolean;
  termsAccepted: boolean;
  inputCompleted: boolean;
}
interface OrderProps {
  clearNotification?: React.Dispatch<React.SetStateAction<number>>;
}

const FinishOrder = ({ clearNotification }: OrderProps) => {
  let { orderFinishPage: orderString } = strings;
  const [emailSentConfirmed, setSent] = useState(false);
  let productSessionStorage = JSON.parse(sessionStorage.getItem("productsFetched"));
  const [pendingRequest, setPendingReq] = useState(false);

  const handleSend = async () => {
    try {
      return await sendOrderConfirmation(orderData)
        .then((response) => {
          response.json().then((jsonResponse: any) => {
            console.log("Whole Object:", jsonResponse);
            console.log("Is Email to Client sent? : ", jsonResponse.EMAILTO_CLIENT);
            console.log("Is Email to Admin sent? : ", jsonResponse.EMAILTO_ADMIN);
          });
          setSent(true);
        })
        .catch((error) => console.log(error));
    } catch (error) {
      console.log(error);
    }
  };
  const sendOrderData = () => {
    setFinishRequested(finishOrderRequested + 1);

    if (completionState.inputCompleted && completionState.paymentSelected && completionState.termsAccepted) {
      console.log(orderData);
      setPendingReq(true);

      handleSend();
    }
  };

  const paymentMethodHandler = (value: boolean, title: string) => {
    if (value) {
      setorderData((orderData) => ({ ...orderData, paymentMethod: title }));
    } else {
      setorderData((orderData) => ({ ...orderData, paymentMethod: "" }));
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
    phoneNo: "",
    cartSum: subtotalPrepare,
    shippingTax: productConstants.shippingFee,
    orderNotes: "",
    deliveryName: "DPD Curier",
    paymentStatus: "NOT_PAID"
  });

  const [finishOrderRequested, setFinishRequested] = useState<number>(null);
  const [completionState, setError] = useState<ErrorProps>({
    paymentSelected: false,
    termsAccepted: false,
    inputCompleted: false
  });

  const inputHandler = (data: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = data.target;

    setorderData((orderData) => ({
      ...orderData,
      [name]: value
    }));
  };
  useEffect(() => {
    console.log(`Email state changed to: ${emailSentConfirmed} and removed items from localStorage`);
    if (emailSentConfirmed) {
      localStorage.removeItem("cartData");
      if (typeof clearNotification === "function") {
        clearNotification(Math.floor(Math.random() * 120));
      } else {
        new Error("clearNotification is not a function");
      }
    }
  }, [emailSentConfirmed]);
  var storedCart: any[] = [];
  var subtotalPrepare = 0;
  var deliveryFee = productConstants.shippingFee;
  let expectedData = localStorage.getItem("cartData");
  var explicitProductList = [];
  if (expectedData != null) {
    storedCart = JSON.parse(expectedData);
    storedCart = makeCheck(productSessionStorage, storedCart);
    storedCart.map((item) => {
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
    setorderData((orderData) => ({
      ...orderData,
      cartSum: subtotalPrepare,
      shippingTax: deliveryFee,
      cartProducts: JSON.stringify(explicitProductList)
    }));
  }, [subtotalPrepare]);

  useEffect(() => {
    if (finishOrderRequested === 0) {
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
            <h3 className={styles.finishOrderTitle}>{orderString.finishGuide}</h3>
            <div className={styles.cartLine} />
          </div>
          <div className={styles.infoBoxing}>
            <img src={images.finishOrder} />
            <h3>{orderString.deliveringInfor}</h3>
          </div>
          <div className={"row " + styles.finishOrderContainer}>
            <div className={"col-sm-12  col-lg-6  " + styles.leftContainer}>
              <div>
                <h3 className={styles.topBillText}>{orderString.invoiceDetails}</h3>
              </div>
              <div className={styles.groupInput}>
                <div className={styles.inputBox}>
                  <label>
                    {orderString.inputsLabels.lastName}
                    <span className={styles.alertAsterisk}>{"*"}</span>
                  </label>

                  <input onChange={inputHandler} value={orderData.firstName} name="firstName" type={"large"} />
                </div>
                <div className={styles.inputBox}>
                  <label>
                    {orderString.inputsLabels.firstName}
                    <span className={styles.alertAsterisk}>{"*"}</span>
                  </label>
                  <input name="lastName" type={"large"} onChange={inputHandler} value={orderData.lastName} />
                </div>
              </div>
              <div className={styles.groupInput}>
                <div className={styles.inputBox}>
                  <label>
                    {orderString.inputsLabels.street}
                    <span className={styles.alertAsterisk}>{"*"}</span>
                  </label>
                  <input
                    name="deliveryAddress"
                    type={"large"}
                    onChange={inputHandler}
                    value={orderData.deliveryAddress}
                  />
                </div>
              </div>
              <div className={styles.groupInput}>
                <div className={styles.inputBox}>
                  <label>
                    {orderString.inputsLabels.city}
                    <span className={styles.alertAsterisk}>{"*"}</span>
                  </label>
                  <input name="city" type={"large"} onChange={inputHandler} value={orderData.city} />
                </div>
              </div>
              <div className={styles.groupInput}>
                <div className={styles.inputBox}>
                  <label>
                    {orderString.inputsLabels.county}
                    <span className={styles.alertAsterisk}>{"*"}</span>
                  </label>
                  <input
                    autoComplete="false"
                    list={"county"}
                    type={"large"}
                    name="county"
                    onChange={inputHandler}
                    value={orderData.county}
                  />
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
                    {orderString.inputsLabels.phone}
                    <span className={styles.alertAsterisk}>{"*"}</span>
                  </label>
                  <input name="phoneNo" type={"large"} onChange={inputHandler}></input>
                </div>
              </div>
              <div className={styles.groupInput}>
                <div className={styles.inputBox}>
                  <label>{orderString.inputsLabels.emailAddress}</label>
                  <input name="emailAddress" type={"large"} onChange={inputHandler} value={orderData.emailAddress} />
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
                  <label className={styles.optionalNote}>{orderString.inputsLabels.orderMentions}</label>
                  <textarea
                    className={styles.textareaparticular}
                    spellCheck="false"
                    rows={2}
                    onChange={(event) => {
                      setorderData((orderData) => ({ ...orderData, orderNotes: event.target.value }));
                    }}
                    value={orderData.orderNotes}
                  />
                </div>
              </div>
            </div>
            <div className={" col-lg-6  col-sm-12 " + styles.rightContainer}>
              <div className={styles.rightChild}>
                <div className={styles.legendsTable}>
                  <span>{orderString.totals.product}</span>
                  <span>{orderString.totals.subTotal}</span>
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
                <span className={styles.subTotal}>
                  {` ${orderString.totals.subTotal}: ${orderString.totals.currency}  ` + subtotalPrepare}
                </span>
                <span className={styles.subTotal}>
                  {` ${orderString.totals.transport}: ${orderString.totals.currency} ` + deliveryFee}
                </span>
                <span className={styles.subTotal}>{" - - - - - - - - -  - - - -"}</span>
                <span className={styles.subTotal}>
                  {` ${orderString.totals.total} : ${orderString.totals.currency} ` +
                    (Number(subtotalPrepare) + Number(deliveryFee))}
                </span>
                <span className={styles.VATincluded}>{orderString.totals.TVAincluded}</span>
              </div>
              <div>
                <span className={styles.deliveryInfo}>{orderString.shipping.estimation}</span>
                <img className={styles.carShip} src={images.deliveryCar} />
              </div>
              <div>
                <div className={styles.deliveryCheckbox}>
                  <span className={styles.paymentDetails}>{orderString.shipping.paymentMethod}</span>

                  <div className={styles.checkboxer}>
                    <InputComponent onSwitchEnabled={paymentMethodHandler} typeOfInput="checkbox" />
                    <label className={styles.methodPaymentCheck} htmlFor="delivercheck">
                      {orderString.shipping.paymentMethodOptions.cash}
                    </label>
                  </div>
                </div>
              </div>
              {finishOrderRequested && orderData.paymentMethod === "" ? (
                <h4 className="text-center " style={{ color: "red" }}>
                  {orderString.shipping.paymentMethodError}
                </h4>
              ) : (
                ""
              )}
            </div>
            {finishOrderRequested >= 1 && !completionState.inputCompleted && (
              <div className="col-12">
                <h4 className={styles.warningOrder} style={{ color: "red", margin: "auto", textAlign: "center" }}>
                  {orderString.shipping.inputError}
                </h4>
              </div>
            )}
            <div className={"col-12 " + styles.paymentShipContainer}>
              <div className={styles.paymentContainer}>
                <p className={styles.GDPRNotify}>
                  {orderString.policyAgreementOrder}
                  <NavHashLink replace to={orderString.policyAgremenet.link}>
                    <a className={styles.extensiveGdpr}>{orderString.policyAgremenet.name}</a>
                  </NavHashLink>
                </p>

                <div className={styles.groupInputTerms}>
                  <div className={styles.checkBoxStyle}>
                    <InputComponent onSwitchEnabled={paymentMethodHandler} typeOfInput="checkbox" />

                    <label htmlFor="acceptTerms" className={styles.acceptTerms}>
                      {orderString.policyAgremenet.constent.confirm}
                    </label>
                  </div>
                  {finishOrderRequested && !completionState.termsAccepted && (
                    <h4 className={styles.termConditionAlert}>{orderString.policyAgremenet.constent.error}</h4>
                  )}
                </div>
                <button onClick={sendOrderData} type="submit" className={styles.finishOrder}>
                  {!pendingRequest ? (
                    <span>{orderString.orderItself.sendFinishOrder.nameButton}</span>
                  ) : (
                    <span>{". . ."}</span>
                  )}
                </button>
                <div>
                  {pendingRequest && (
                    <p className={styles.emailSendStyle}>{orderString.orderItself.sendFinishOrder.pendingMessage}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <OrderDone />
      )}
    </div>
  );
};

export default FinishOrder;
