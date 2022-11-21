import React, { useState, useEffect } from "react";
import OrderDone from "./OrderDone";
import { sendOrderConfirmation } from "./../../services/emails";
import Checkboxer from "./../MiniComponents/Checkboxer";

import { orderProps } from "./../../utils/OrderInterfaces";
import { NavHashLink } from "react-router-hash-link";
import { makeCheck } from "./../../functions/utilsFunc";
import { ErrorProps, OrderProps, ExplicitProdListProps, PropertyInput, InputProps } from "./typeProps";

import { componentStrings, productConstants } from "../../data/componentStrings";
import strings from "../../data/strings.json";
import { ProductsFromSessionStorage, CartInfoItemCookie } from "../../data/constants";
import styles from "./../CartPage/FinishOrder.module.scss";
import images from "./../../data/images";

const FinishOrder = ({ clearNotification }: OrderProps) => {
  let { orderFinishPage: orderString } = strings;
  const [emailSentConfirmed, setSent] = useState<boolean>(false);
  let itemsSessionStorage = sessionStorage.getItem(ProductsFromSessionStorage);
  let productSessionStorage = itemsSessionStorage != null ? JSON.parse(itemsSessionStorage) : null;
  const [pendingRequest, setPendingReq] = useState<boolean>(false);
  var storedCart: any[] = [];
  var subtotalPrepare: number = 0;
  const [finishOrderRequested, setFinishRequested] = useState<number>(0);
  const [completionState, setError] = useState<ErrorProps>({
    paymentSelected: false,
    termsAccepted: false,
    inputCompleted: false
  });
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

  const paymentMethodHandler = (value: boolean, title: string | undefined) => {
    if (value) {
      setorderData((orderData) => ({
        ...orderData,
        paymentMethod: typeof title === "string" ? title : "NOT_SPECIFIED"
      }));
    } else {
      setorderData((orderData) => ({ ...orderData, paymentMethod: "" }));
    }
  };

  const inputHandler = (data: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = data.target;
    setorderData((orderData) => ({
      ...orderData,
      [name]: value
    }));
  };
  useEffect(() => {
    if (emailSentConfirmed) {
      window.scrollTo(0, 0);
      localStorage.removeItem("cartData");
      console.log(`Email state changed to: ${emailSentConfirmed} and removed items from localStorage`);
      if (typeof clearNotification === "function") {
        clearNotification(Math.floor(Math.random() * 120));
      } else {
        new Error("clearNotification is not a function");
      }
    }
  }, [emailSentConfirmed]);

  var deliveryFee = productConstants.shippingFee;
  let expectedData = localStorage.getItem(CartInfoItemCookie);
  var explicitProductList: ExplicitProdListProps[] = [];
  if (expectedData != null) {
    storedCart = JSON.parse(expectedData);
    if (productSessionStorage != null) {
      storedCart = makeCheck(productSessionStorage, storedCart);
      storedCart.map((item: ExplicitProdListProps) => {
        subtotalPrepare += Number(productSessionStorage[item.id].price) * Number(item.itemNumber);
        explicitProductList.push({
          id: item.id,
          name: productSessionStorage[item.id].title,
          itemNumber: item.itemNumber,
          imageProduct: productSessionStorage[item.id].imageProduct[0],
          price: productSessionStorage[item.id].price
        });
      });
    } else {
      console.log("Product session storage is null");
      new Error("Product Session Storage is null");
    }

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
  const inputObject: InputProps = {
    lastName: {
      name: "lastName",
      inputListener: inputHandler,
      value: orderData.lastName,
      labelText: orderString.inputsLabels.lastName,
      mandatoryInput: true
    },
    firstName: {
      name: "firstName",
      inputListener: inputHandler,
      value: orderData.firstName,
      labelText: orderString.inputsLabels.firstName,
      mandatoryInput: true
    },
    deliveryAddress: {
      name: "deliveryAddress",
      inputListener: inputHandler,
      value: orderData.deliveryAddress,
      labelText: orderString.inputsLabels.deliveryAddress,
      mandatoryInput: true
    },
    city: {
      name: "city",
      inputListener: inputHandler,
      value: orderData.city,
      labelText: orderString.inputsLabels.city,
      mandatoryInput: true
    },
    county: {
      name: "county",
      inputListener: inputHandler,
      value: orderData.county,
      labelText: orderString.inputsLabels.county,
      mandatoryInput: true,
      inputOptions: {
        autoComplete: "false",
        list: "county"
      },
      otherStructure: {
        dataList: {
          name: "county",
          list: componentStrings.FinishOrder.countyList
        }
      }
    },
    phoneNo: {
      name: "phoneNo",
      inputListener: inputHandler,
      value: orderData.phoneNo,
      labelText: orderString.inputsLabels.phoneNo,
      mandatoryInput: true
    },
    emailAddress: {
      name: "emailAddress",
      inputListener: inputHandler,
      value: orderData.emailAddress,
      labelText: orderString.inputsLabels.emailAddress,
      mandatoryInput: false
    }
  };
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
          <div className={styles.finishOrderContainer}>
            <div className={styles.leftContainer}>
              <div>
                <h3 className={styles.topBillText}>{orderString.invoiceDetails}</h3>
              </div>
              {Object.values(inputObject).map((item: PropertyInput) => {
                return (
                  <div className={styles.groupInput}>
                    <div className={styles.inputBox}>
                      <label>
                        {item.labelText}
                        {item.mandatoryInput && <span className={styles.alertAsterisk}>{"*"}</span>}
                      </label>
                      <input
                        name={item.name}
                        type={"large"}
                        onChange={item.inputListener}
                        value={item.value}
                        autoComplete={item.inputOptions?.autoComplete}
                        list={item.inputOptions?.list}
                      />
                      {item.otherStructure?.dataList?.name && (
                        <datalist id={item.otherStructure.dataList.name}>
                          {Object.values(item.otherStructure.dataList.list).map((item) => (
                            <option value={item} />
                          ))}
                        </datalist>
                      )}
                    </div>
                  </div>
                );
              })}

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
            <div className={styles.rightContainer}>
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
                    <Checkboxer onSwitchEnabled={paymentMethodHandler} />
                    <label className={styles.methodPaymentCheck} htmlFor="delivercheck">
                      {orderString.shipping.paymentMethodOptions.cash}
                    </label>
                  </div>
                </div>
              </div>
              {finishOrderRequested >= 1 && orderData.paymentMethod === "" && (
                <h4 className="text-center " style={{ color: "red" }}>
                  {orderString.shipping.paymentMethodError}
                </h4>
              )}
            </div>
            {finishOrderRequested >= 1 && !completionState.inputCompleted && (
              <div className={styles.warningOrderWrapper}>
                <h4 className={styles.warningOrder} style={{ color: "red", margin: "auto", textAlign: "center" }}>
                  {orderString.shipping.inputError}
                </h4>
              </div>
            )}
            <div className={styles.paymentShipContainer}>
              <div className={styles.paymentContainer}>
                <p className={styles.GDPRNotify}>
                  {orderString.policyAgreementOrder}
                  <NavHashLink replace to={orderString.policyAgremenet.link}>
                    <a className={styles.extensiveGdpr}>{orderString.policyAgremenet.name}</a>
                  </NavHashLink>
                </p>

                <div className={styles.groupInputTerms}>
                  <div className={styles.checkBoxStyle}>
                    <Checkboxer onSwitchEnabled={termAcceptHandler} />

                    <label htmlFor="acceptTerms" className={styles.acceptTerms}>
                      {orderString.policyAgremenet.constent.confirm}
                    </label>
                  </div>
                  {finishOrderRequested >= 1 && !completionState.termsAccepted && (
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
