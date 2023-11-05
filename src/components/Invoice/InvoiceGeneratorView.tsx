import React, { useEffect, useState } from "react";
import PDFViews from "./PDFViews";
import { InvoiceModel } from "../../utils/OrderInterfaces";
import styles from "./OrderView/InvoiceView.module.scss";
import { getInvoiceByID, getObjectByID } from "../../data/productList";
import { useParams } from "react-router-dom";

const InvoiceGeneratorView = () => {
  let ID = "10137749";
  let shippingTax = 15;
  const [invoiceData, setInvoiceData] = useState<InvoiceModel[] | null>(null);

  useEffect(() => {
    const fetchObject = async () => {
      try {
        const fetchedObject = await getObjectByID(ID);
        setInvoiceData(fetchedObject);
      } catch (error) {
        console.error("Error fetching object:", error);
      }
    };

    fetchObject();
  }, []);

  useEffect(() => {
    console.log("The invoiceData is:", invoiceData, currentID);
  }, [invoiceData]);

  const currentID = invoiceData != null ? invoiceData : null;

  const prods = currentID != null ? currentID["cartProducts"] : null;

  // console.log("Produse :", prods);

  // const calculateTotalSum = () => {
  //   let totalSum = 0;
  //   Object.values(prods).forEach((item: any) => {
  //     totalSum += item["total"];
  //   });
  //   return totalSum;
  // };

  const downloadPDF = (invoiceID: string) => window.open(`/invoice/${invoiceID}`, "_blank");

  return (
    <>
      {currentID ? (
        <div className={styles.cardBoard}>
          <div className={styles.details}>
            <h2>{"Detalii despre comanda"}</h2>
            <button className="mb-2 mr-1 btn text-white btn-info" onClick={downloadPDF.bind(0, currentID["ID"])}>
              {"Vezi factura"}
            </button>
          </div>
          {/* <button>{"Vezi factura"}</button> */}
          <div className="row">
            <div className="col-12 d-flex justify-content-center">
              <h3 className={styles.invoiceTitle}>{`Factura #${currentID["ID"]}`}</h3>
            </div>
            <div className="col-12 d-flex justify-content-center">
              <h3 className={styles.dateInvoice}>{2023}</h3>
            </div>
          </div>

          <div className={styles.clientInfo}>
            <div className={styles.leftClient}>
              <h3>{"Client"}</h3>
              {/* <p>{`Nume Client : ${currentID["clientName"]}`}</p>
              <p>{`Banca Client: ${currentID["clientBanca"]}`}</p>
              <p>{`Adresa Client: ${currentID["clientAdresa"]}`}</p>
              <p>{`Telefon Client: ${currentID["clientTelefon"]}`}</p> */}
              <p>{`Data : ${2023}`}</p>
            </div>
            <div className={styles.leftClient}>
              <h3>{"Provider"}</h3>
              <p>{currentID["firstName"]}</p>
              {/* <p>{currentID["providerAdresa"]}</p>
              <p>{currentID["providerTelefon"]}</p> */}
            </div>
          </div>
          <table className={styles.tableInvoice}>
            <tr className={styles.insideTable}>
              <th>{"Produs"}</th>
              <th>{"Cantitate"}</th>
              <th>{"Pret"}</th>
              <th>{"Total"}</th>
            </tr>
            {prods &&
              Object.values(prods).map((item: any) => (
                <tr>
                  <th>{item["name"]}</th>
                  <th>{item["itemNumber"]}</th>
                  <th>{item["price"]}</th>
                  <th>{item["itemNumber"]}</th>
                </tr>
              ))}
          </table>
          <div className={styles.totalOverview}>
            <h3 className={styles.rightSubtotal}>{`${"Subtotal"}: Nothign here`}</h3>
            <h3 className={styles.rightSubtotal}>{`${"Taxa livrare"}: ${shippingTax}`}</h3>
            <h3 className={styles.rightSubtotal}>{`${"Total"}: ${Number(shippingTax)} `}</h3>
          </div>
        </div>
      ) : (
        <div>Nu merge </div>
      )}
    </>
  );
};

export default InvoiceGeneratorView;
