import { useParams } from "react-router-dom";

import styles from "./OrderView.module.scss";
import { getOrderByID } from "./../../data/productList";
import { useEffect, useState } from "react";
import { componentStrings } from "./../../data/componentStrings";
interface OrderInterface {
  lastName?: string;
  firstName?: string;
  phoneNo?: string;
  deliveryAddress?: string;
  emailAddress?: string;
  city?: string;
  county?: string;
  paymentMethod?: string;
  cartProducts?: string;
  shippingTax?: number;
  cartSum?: number;
  orderNotes?: string;
  deliveryName?: string;
  timestamp?: string;
  invoiceID?: string;
}

const OrderView = () => {
  let params = useParams();
  let orderID = params.orderID;
  const [invoiceData, setInvoiceData] = useState<OrderInterface>(null);

  useEffect(() => {
    if (!isNaN(Number(orderID))) {
      getOrderByID(Number(orderID))
        .then((response) => {
          setInvoiceData(response);
        })
        .catch((error) => error);
    }
  }, []);

  const displayInvoiceData = () => {
    if (invoiceData != null) {
      return (
        <div className={styles.cardBoard}>
          <div className="row">
            <div className="col-12 d-flex justify-content-center ">
              <img
                className={styles.logoInvoice}
                src="https://firebasestorage.googleapis.com/v0/b/sapunmontan.appspot.com/o/logo%2Fmontanair.png?alt=media&token=f42ebf81-1205-44d2-806b-7130100adda7"
              />
            </div>
            <div className="col-12 d-flex justify-content-center">
              <h3 className={styles.invoiceTitle}>{`Factura #${invoiceData.invoiceID}`}</h3>
            </div>
            <div className="col-12 d-flex justify-content-center">
              <h3 className={styles.dateInvoice}>{invoiceData.timestamp}</h3>
            </div>
          </div>
          <table className={styles.tableInvoice}>
            <tr className={styles.insideTable}>
              <th>{"Produs"}</th>
              <th>{"Buc"}</th>

              <th>{"Pret bucata"}</th>
            </tr>
            {Object.values(JSON.parse(invoiceData.cartProducts)).map((item) => (
              <tr>
                <th>{item.name}</th>
                <th>{item.itemNumber}</th>
                <th>{`${item.price} RON`}</th>
              </tr>
            ))}
          </table>
          <div className={styles.totalOverview}>
            <h3 className={styles.rightSubtotal}>{`Subtotal: ${invoiceData.cartSum} RON`}</h3>
            <h3 className={styles.rightSubtotal}>{`Taxa livrare: ${invoiceData.shippingTax} RON`}</h3>
            <h3 className={styles.rightSubtotal}>{`Total: ${
              Number(invoiceData.shippingTax) + Number(invoiceData.cartSum)
            } RON`}</h3>
          </div>
          <div className={"row " + styles.clientInfo}>
            <div className={"col-6 " + styles.leftClient}>
              <h3>{"Client"}</h3>
              <p>{`Nume: ${invoiceData.firstName} ${invoiceData.lastName}`}</p>
              <p>{`Comanda: ${invoiceData.invoiceID}`}</p>
              <p>{`Telefon: ${invoiceData.phoneNo}`}</p>
              <p>{`Data: ${invoiceData.timestamp}`}</p>
              <p>{`Metoda de plata: ${invoiceData.paymentMethod}`}</p>
              <p>{`Data: ${invoiceData.timestamp}`}</p>
            </div>
            <div className={"col-6 " + styles.leftClient}>
              <h3>{"Magazin"}</h3>
              <p>{componentStrings.companyData.name}</p>
              <p>{componentStrings.companyData.fiscal}</p>
              <p>{componentStrings.companyData.number}</p>
              <p>{componentStrings.companyData.address}</p>
            </div>
          </div>
          <h4 className={styles.finalThanks}>{"Multumim pentru incredere!"}</h4>
          <h5 className={styles.teamWeb}>{"Echipa MontanAir.Ro"}</h5>
        </div>
      );
    } else return <>{"Loading"}</>;
  };

  return (
    <div className={styles.orderViewContainer}>
      <div>{displayInvoiceData()}</div>
    </div>
  );
};

export default OrderView;
