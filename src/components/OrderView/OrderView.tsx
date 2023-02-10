import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getOrderByID } from "./../../data/productList";
import { OrderViewProps } from "../../utils/OrderInterfaces";
import strings from "../../data/strings.json";
import styles from "./OrderView.module.scss";

const OrderView = () => {
  let { orderView: orderStr } = strings;
  let params = useParams();
  let orderID = params.orderID;
  const [invoiceData, setInvoiceData] = useState<OrderViewProps | null>(null);
  useEffect(() => {
    if (!isNaN(Number(orderID))) {
      getOrderByID(Number(orderID))
        .then((response) => {
          setInvoiceData(response);
        })
        .catch((error) => error);
    }
  }, []);

  const downloadPDF = (invoiceID: string) => window.open(`/invoice/${invoiceID}`, "_blank");

  const displayOrderDetails = (invoiceData: OrderViewProps) => {
    return (
      <div className={styles.cardBoard}>
        <div className={styles.details}>
          <h2>{"Detalii despre comanda"}</h2>
          <button className="mb-2 mr-1 btn text-white btn-info" onClick={downloadPDF.bind(0, invoiceData.invoiceID)}>
            {"Vezi factura"}
          </button>
        </div>

        {/* <button onClick={downloadPDF}>{"Vezi factura"}</button> */}
        {/* <div className="row">
          <div className="col-12 d-flex justify-content-center">
            <h3 className={styles.invoiceTitle}>{`Factura #${invoiceData.invoiceID}`}</h3>
          </div>
          <div className="col-12 d-flex justify-content-center">
            <h3 className={styles.dateInvoice}>{invoiceData.timestamp}</h3>
          </div>
        </div> */}

        <div className={styles.clientInfo}>
          <div className={styles.leftClient}>
            <h3>{orderStr.clientSide.title}</h3>
            <p>{`${orderStr.clientSide.name}: ${invoiceData.firstName} ${invoiceData.lastName}`}</p>
            <p>{`${orderStr.clientSide.order}: ${invoiceData.invoiceID}`}</p>
            <p>{`${orderStr.clientSide.phone}: ${invoiceData.phoneNo}`}</p>
            <p>{`${orderStr.clientSide.date}: ${invoiceData.timestamp}`}</p>
            <p>{`${orderStr.clientSide.paymentMethod}: ${invoiceData.paymentMethod}`}</p>
          </div>
          {/* <div className={styles.leftClient}>
            <h3>{orderStr.ownerSide.title}</h3>
            <p>{orderStr.ownerSide.companyName}</p>
            <p>{orderStr.ownerSide.fiscal}</p>
            <p>{orderStr.ownerSide.number}</p>
            <p>{orderStr.ownerSide.address}</p>
          </div> */}
        </div>
        <table className={styles.tableInvoice}>
          <tr className={styles.insideTable}>
            <th>{orderStr.product}</th>
            <th>{orderStr.unit}</th>
            <th>{orderStr.pricePerUnit}</th>
          </tr>
          {invoiceData.cartProducts &&
            typeof JSON.parse(invoiceData.cartProducts) === "object" &&
            Object.values(JSON.parse(invoiceData.cartProducts)).map((item: any) => (
              <tr>
                <th>{item.name}</th>
                <th>{item.itemNumber}</th>
                <th>{`${item.price} ${orderStr.currency}`}</th>
              </tr>
            ))}
        </table>
        <div className={styles.totalOverview}>
          <h3
            className={styles.rightSubtotal}
          >{`${orderStr.subtotal}: ${invoiceData.cartSum} ${orderStr.currency}`}</h3>
          <h3
            className={styles.rightSubtotal}
          >{`${orderStr.shippingTax}: ${invoiceData.shippingTax} ${orderStr.currency}`}</h3>
          <h3 className={styles.rightSubtotal}>{`${orderStr.total}: ${
            Number(invoiceData.shippingTax) + Number(invoiceData.cartSum)
          } ${orderStr.currency}`}</h3>
        </div>
      </div>
    );
  };
  const displayInvoiceData = () => {
    if (invoiceData != null) {
      return <div>{displayOrderDetails(invoiceData)}</div>;
    } else return <>{"Loading"}</>;
  };

  return <div className={styles.orderViewContainer}>{displayInvoiceData()}</div>;
};

export default OrderView;
//  <View invoiceObject={invoiceData} /> :
