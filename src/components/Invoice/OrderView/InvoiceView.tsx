import { View } from "./pdfview";
import { useParams } from "react-router-dom";

import React, { useEffect, useState } from "react";
import { getOrderByID } from "./../../../data/productList";
import { OrderViewProps } from "../../../utils/OrderInterfaces";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { PDF } from "./pdf";

import styles from "./InvoiceView.module.scss";

type invoiceInterface = {
  invoiceObject: OrderViewProps;
};
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

  const DownloadLinkPDF = ({ invoiceObject }: invoiceInterface) => {
    return (
      <PDFDownloadLink document={<PDF invoiceObject={invoiceObject} />}>
        {({ blob, url, loading, error }) => {
          console.log("URL is", url, error);
          if (error) {
            return "Error in loading PDF";
          }
          if (loading) {
            return "Incarcare link...";
          }
          if (url) {
            return (
              <a href={url} download={`Factura-${invoiceObject.invoiceID}.pdf`}>
                Descarca Factura
              </a>
            );
          } else {
            return <p>Link eronat factura.</p>;
          }
        }}
      </PDFDownloadLink>
    );
  };

  return (
    <div className={styles.centerPdf}>
      <div>
        <h3 className={styles.text}>{invoiceData != null ? <DownloadLinkPDF invoiceObject={invoiceData} /> : ""}</h3>
      </div>

      {invoiceData != null ? <View invoiceObject={invoiceData} /> : "Eroare"}
    </div>
  );
};

export default InvoiceView;
