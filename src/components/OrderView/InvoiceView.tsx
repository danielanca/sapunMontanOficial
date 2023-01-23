import { View } from "./pdfview";
import { useParams } from "react-router-dom";

import React, { useEffect, useState } from "react";
import { getOrderByID } from "./../../data/productList";
import { OrderViewProps } from "../../utils/OrderInterfaces";
import styles from "./InvoiceView.module.scss";

const InvoiceView = () => {
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
  return (
    <div className={styles.centerPdf}>
      <div>
        <h3 className={styles.text}>
          {"Pentru a salva factura, dati click dreapta pe factura, apoi 'Salvati ca PDF...' "}
        </h3>
      </div>

      {invoiceData != null ? <View invoiceObject={invoiceData} /> : "Eroare"}
    </div>
  );
};

export default InvoiceView;
