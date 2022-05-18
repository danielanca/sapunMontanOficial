import { useParams } from "react-router-dom";

import styles from "./OrderView.module.scss";
import { getOrderByID } from "./../../data/productList";
import { useEffect, useState } from "react";

interface OrderInterface {
  lastName?: string;
  firstName?: string;
  phoneNo?: string;
  deliveryAddress?: string;
  emailAddress?: string;
  city?: string;
  county?: string;
  paymentMethod?: string;
  shippingTax?: number;
  cartSum?: number;
  orderNotes?: string;
  deliveryName?: string;
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
          console.log("Datele din raspuns:", response);
        })
        .catch((error) => error);
    }
  }, []);

  const displayInvoiceData = () => {
    if (invoiceData != null) {
      return (
        <div className={styles.cardBoard}>
          <div className={styles.inner}>
            <div className={styles.textContainer}>
              <p>{"Nume:"}</p>
              <p className={styles.boldInvoiceText}>{`${invoiceData.firstName} ${invoiceData.lastName}`}</p>
            </div>
            <div className={styles.textContainer}>
              <p>{"Strada:"}</p>
              <p className={styles.boldInvoiceText}>{`${invoiceData.deliveryAddress} `}</p>
            </div>
            <div className={styles.textContainer}>
              <p>{"Oras:"}</p>
              <p className={styles.boldInvoiceText}>{`${invoiceData.city} jud.${invoiceData.county} `}</p>
            </div>
            <div className={styles.textContainer}>
              <p>{"Oras:"}</p>
              <p className={styles.boldInvoiceText}>{`${invoiceData.city} jud.${invoiceData.county} `}</p>
            </div>
            <div className={styles.textContainer}>
              <p>{"Adresa email:"}</p>
              <p className={styles.boldInvoiceText}>{`${invoiceData.emailAddress}`}</p>
            </div>
            <div className={styles.textContainer}>
              <p>{"Telefon:"}</p>
              <p className={styles.boldInvoiceText}>{`${invoiceData.phoneNo}`}</p>
            </div>
            <div className={styles.textContainer}>
              <p>{"Precizari:"}</p>
              <p className={styles.boldInvoiceText}>{`${invoiceData.orderNotes}`}</p>
            </div>
            <div className={styles.textContainer}>
              <p>{"Metoda de plata:"}</p>
              <p className={styles.boldInvoiceText}>{`${invoiceData.paymentMethod}`}</p>
            </div>
            <div className={styles.textContainer}>
              <p>{"Curierat:"}</p>
              <p className={styles.boldInvoiceText}>{`${invoiceData.deliveryName}`}</p>
            </div>
            <div className={styles.textContainer}>
              <p>{"Subtotal:"}</p>
              <p className={styles.boldInvoiceText}>{`${invoiceData.cartSum} RON`}</p>
            </div>
            <div className={styles.textContainer}>
              <p>{"Taxa de livrare:"}</p>
              <p className={styles.boldInvoiceText}>{`${invoiceData.shippingTax} RON`}</p>
            </div>
          </div>
        </div>
      );
    }
    return <>{"Loading"}</>;
  };

  return (
    <div className={styles.orderViewContainer}>
      <div>{displayInvoiceData()}</div>
    </div>
  );
};

export default OrderView;
