import React, { useState, useEffect } from "react";
import OrderDone from "./OrderDone";
import { sendOrderConfirmation } from "./../../services/emails";
import Checkboxer from "./../MiniComponents/Checkboxer";

import { NavHashLink } from "react-router-hash-link";
import { makeCheck } from "./../../functions/utilsFunc";
import { ErrorProps, OrderProps, ExplicitProdListProps, PropertyInput, InputProps } from "./typeProps";

import { productConstants } from "../../data/componentStrings";
import strings from "../../data/strings.json";
import { ProductsFromSessionStorage, CartInfoItemCookie } from "../../data/constants";
import styles from "./../CartPage/FinishOrder.module.scss";
import images from "./../../data/images";
import { useOrderObject } from "./useOrderData";
import { getInputFields } from "./inputFields";
import { areInputsValid } from "./funcs";

const FinishOrder = ({ clearNotification }: OrderProps) => {
  let { orderFinishPage: orderString } = strings;
  let itemsSessionStorage = sessionStorage.getItem(ProductsFromSessionStorage);
  let productSessionStorage = itemsSessionStorage != null ? JSON.parse(itemsSessionStorage) : null;
  let storedCart: any[] = [];
  let subtotalPrepare: number = 0;
  const [isEasyboxSelected, setSelectEasybox] = useState(false);
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<string[]>([]);
  const easyboxList: string[] = [];

  const url = "https://api.smartship.ro/geolocation/easybox";
  const options = { method: "GET", headers: { "X-API-KEY": " d7cc7d6074ec087be903ca30d35c9696" } };

  const handleSearch = (query: string) => {
    console.log("We are searching for:", query, results["easybox"]);
    const filteredResults = easyboxList["easybox"].filter((item: any) =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );
    setResults(filteredResults);
  };
  const [orderState, setOrderState] = useState<
    | "initState"
    | "requestState"
    | "validRequestState"
    | "pendingState"
    | "errorState"
    | "triggeredState"
    | "finishState"
  >("initState");

  const [completionState, setError] = useState<ErrorProps>({
    paymentSelected: false,
    termsAccepted: false,
    inputCompleted: false
  });
  const { orderData, setorderData } = useOrderObject();

  const handleSend = async () => {
    try {
      console.log("Sending data:", orderData);
      return await sendOrderConfirmation(orderData)
        .then((response) => {
          response.json().then((jsonResponse: any) => {
            // console.log("Whole Object:", jsonResponse);
            // console.log("Is Email to Client sent? : ", jsonResponse.EMAILTO_CLIENT);
            // console.log("Is Email to Admin sent? : ", jsonResponse.EMAILTO_ADMIN);
          });

          setOrderState("finishState");
        })
        .catch((error) => console.log(error));
    } catch (error) {
      console.log(error);
    }
  };
  const sendOrderData = () => {
    setOrderState("triggeredState");
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
  const deliveryMethodHandler = (value: boolean, title: string | undefined) => {
    if (value) {
      setorderData((orderData) => ({
        ...orderData,
        deliveryMethod: typeof title === "string" ? title : "NOT_SPECIFIED"
      }));
    }
    if (title === orderString.shipping.deliveryMethods.easyboxDelivery) {
      setSelectEasybox(true);
      return;
    }
    setSelectEasybox(false);
  };

  const inputHandler = (data: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = data.target;
    setorderData((orderData) => ({
      ...orderData,
      [name]: value
    }));
  };

  let deliveryFee = productConstants.shippingFee;
  let expectedData = localStorage.getItem(CartInfoItemCookie);
  let explicitProductList: ExplicitProdListProps[] = [];

  if (expectedData != null) {
    storedCart = JSON.parse(expectedData);
    if (productSessionStorage !== null) {
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
  }
  const termAcceptHandler = () => {
    setError((completionState) => ({ ...completionState, termsAccepted: !completionState.termsAccepted }));
  };

  useEffect(() => {
    if (orderState == "finishState") {
      window.scrollTo(0, 0);
      localStorage.removeItem(CartInfoItemCookie);

      if (typeof clearNotification === "function") {
        clearNotification(Math.floor(Math.random() * 120));
      } else {
        new Error("clearNotification is not a function");
      }
    }
  }, [orderState]);
  useEffect(() => {
    setorderData((orderData) => ({
      ...orderData,
      cartSum: subtotalPrepare,
      shippingTax: deliveryFee,
      cartProducts: JSON.stringify(explicitProductList)
    }));
  }, [subtotalPrepare]);

  useEffect(() => {
    // if (orderState === "initState") {
    //   return;
    // }
    if (orderState == "initState" || orderState == "requestState" || orderState == "errorState") {
      if (areInputsValid(orderData)) {
        setError((completionState) => ({ ...completionState, inputCompleted: true }));
      } else {
        setError((completionState) => ({ ...completionState, inputCompleted: false }));
      }
      if (orderData.paymentMethod !== "") {
        setError((completionState) => ({ ...completionState, paymentSelected: true }));
      }
    }
  }, [orderState, orderData]);

  useEffect(() => {
    if (orderState === "triggeredState") {
      if (completionState.inputCompleted && completionState.paymentSelected && completionState.termsAccepted) {
        setOrderState("validRequestState");
      } else {
        setOrderState("errorState");
      }
    }
    if (orderState === "validRequestState") {
      //this will be next-time
      setOrderState("pendingState");
      handleSend();
    }
  }, [orderState]);

  useEffect(() => {
    (async () => {
      // Your snippet here
      try {
        const response = await fetch(url, options);
        const data = await response.json();
        setResults(data);
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  useEffect(() => {
    console.log("Results are:", results);
  }, [results]);
  const inputObject = getInputFields(orderData, inputHandler);

  return (
    <div className={styles.FinishSection}>
      {orderState !== "finishState" ? (
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
                      {/* {item.otherStructure?.dataList?.name && (
                        <datalist id={item.otherStructure.dataList.name}>
                          {Object.values(item.otherStructure.dataList.list).map((item) => (
                            <option value={item} />
                          ))}
                        </datalist>
                      )} */}
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
                      <span className={styles.count}>{Number(item.itemNumber) + "x"}</span>
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
                    <Checkboxer
                      onSwitchEnabled={paymentMethodHandler}
                      name={orderString.shipping.paymentMethodOptions.cash}
                    />
                    <label className={styles.methodPaymentCheck} htmlFor="delivercheck">
                      {orderString.shipping.paymentMethodOptions.cash}
                    </label>
                  </div>
                </div>
              </div>
              <div className={styles.filledSpacePaymentMtd}>
                {orderState === "errorState" && orderData.paymentMethod === "" && (
                  <h4 className="text-center " style={{ color: "red" }}>
                    {orderString.shipping.paymentMethodError}
                  </h4>
                )}
              </div>
              <div>
                <div className={styles.deliveryCheckbox}>
                  <span className={styles.paymentDetails}>{"Metoda de livrare"}</span>

                  <div className={styles.checkboxer}>
                    <Checkboxer
                      onSwitchEnabled={deliveryMethodHandler}
                      name={orderString.shipping.deliveryMethods.courierDelivery}
                    />
                    <label className={styles.methodPaymentCheck} htmlFor="delivercheck">
                      {"Curier"}
                    </label>
                  </div>
                  <div className={styles.checkboxer}>
                    <Checkboxer
                      onSwitchEnabled={deliveryMethodHandler}
                      name={orderString.shipping.deliveryMethods.easyboxDelivery}
                    />
                    <label className={styles.methodPaymentCheck} htmlFor="delivercheck">
                      <img
                        width={100}
                        height={50}
                        src="https://firebasestorage.googleapis.com/v0/b/diniubire-89ce0.appspot.com/o/ProductMedia%2Feasybox.svg?alt=media&token=3f1610ed-956c-4234-b45e-4429e3dace3b"
                      />
                    </label>
                  </div>
                  {isEasyboxSelected && (
                    <div className={styles.groupInput}>
                      <div className={styles.inputBox}>
                        <label className={styles.optionalNote}>{orderString.inputsLabels.lockerDelivery}</label>
                        <input
                          type="text"
                          value={orderData.lockerName}
                          name="lockerName"
                          onChange={inputHandler}
                          // onChange={(e) => {
                          //   // setSearch(e.target.value);
                          //   // handleSearch(e.target.value);
                          //   lockerInputHandler(e.target.value);
                          // }}
                        />
                        {/* {results.length > 0 && (
                          <div className={styles.dropdown}>
                            {results.map((result, index) => (
                              <div key={index} className={styles.dropdownItem}>
                                {result}
                              </div>
                            ))}
                          </div>
                        )} */}
                        {/* <textarea
                          className={styles.textareaparticular}
                          spellCheck="false"
                          rows={2}
                          onChange={(event) => {
                            setorderData((orderData) => ({ ...orderData, orderNotes: event.target.value }));
                          }}
                          value={orderData.orderNotes}
                        /> */}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div
              style={{
                visibility: orderState === "errorState" && !completionState.inputCompleted ? "visible" : "hidden"
              }}
              className={styles.warningOrderWrapper}
            >
              <h4 className={styles.warningOrder} style={{ color: "red", margin: "auto", textAlign: "center" }}>
                {orderString.shipping.inputError}
              </h4>
            </div>

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
                  <div className={styles.filledSpaceTCAlert}>
                    {orderState === "errorState" && !completionState.termsAccepted && (
                      <h4 className={styles.termConditionAlert}>{orderString.policyAgremenet.constent.error}</h4>
                    )}
                  </div>
                </div>
                <button onClick={sendOrderData} type="submit" className={styles.finishOrder}>
                  {orderState != "pendingState" ? (
                    <p>{orderString.orderItself.sendFinishOrder.nameButton}</p>
                  ) : (
                    <p>{". . ."}</p>
                  )}
                </button>
                <div>
                  {orderState == "pendingState" && (
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
