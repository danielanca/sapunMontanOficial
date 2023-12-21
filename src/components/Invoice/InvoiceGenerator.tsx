import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "shards-react";
import PageTitle from "../AdminArea/ShardsDesign/components/common/PageTitle";
import styles from "./InvoiceGenerator.module.scss";
import { InvoiceModel, InvoiceItem } from "../../utils/OrderInterfaces";
import InvoiceGeneratorView from "./InvoiceGeneratorView";
import { addInvoice } from "./../../services/emails";
import { Link } from "react-router-dom";
import images from "../../data/images";

interface InvoiceFormProps {
  onSubmit: (invoice: InvoiceModel) => void;
}

type InvoiceClientFields = "fullName" | "CUI" | "banca" | "adresa" | "email" | "telefon";

const InvoiceGenerator = () => {
  const [invoice, setInvoice] = useState<InvoiceModel>({
    client: {
      fullName: "",
      CUI: "",
      banca: "",
      adresa: "",
      email: "",
      telefon: ""
    },
    provider: {
      fullName: "Viral 4 Hype",
      adresa: " Constanta",
      telefon: "0732627442"
    },
    items: []
  });

  const handleRemoveClick = (index) => {
    const list = [...invoice.items];
    list.splice(index, 1);
    setInvoice((prevInvoice) => ({
      ...prevInvoice,
      items: [...list]
    }));
  };

  const handleInputChange = (section: "client", field: InvoiceClientFields, value: string) => {
    setInvoice((prevInvoice) => ({
      ...prevInvoice,
      [section]: {
        ...prevInvoice[section],
        [field]: value
      }
    }));
  };

  const handleAddItem = () => {
    setInvoice((prevInvoice) => ({
      ...prevInvoice,
      items: [...prevInvoice.items, { product: "", price: 0, quantity: 0 }]
    }));
  };

  const handleItemChange = (index: number, field: string, value: string | number) => {
    setInvoice((prevInvoice) => {
      const updatedItems = [...prevInvoice.items];
      const updatedItem = { ...updatedItems[index] };
      updatedItem[field] = value;

      updatedItems[index] = updatedItem;

      return {
        ...prevInvoice,
        items: updatedItems
      };
    });
  };

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   onSubmit(invoice);
  // };

  const submitAddOperation = () => {
    if (invoice != null) {
      addInvoice(invoice).then((response) => {
        console.log("Invoice addition request sent to Cloud!");
        //needs to process the response
      });
    }
  };

  console.log("Detalli Factura : ", invoice);
  return (
    <Container fluid className="main-content-container px-4">
      <Row className="page-header py-4">
        <PageTitle sm="6" title="Invoice Generator" subtitle={"Invoice"} className="text-sm-left" />
      </Row>
      <Row>
        <Col>
          <div className={styles.editPage}>
            <div className={styles.addAreaContainer}>
              <h3>Add Client</h3>
              <div className={styles.inputContainer}>
                <div className={styles.rowSpacer}>
                  <div className={styles.inputFielder}>
                    <label htmlFor="client.fullName">{"Client Name"}</label>
                    <input
                      value={invoice.client.fullName}
                      onChange={(e) => handleInputChange("client", "fullName", e.target.value)}
                    />
                  </div>
                  <div className={styles.inputFielder}>
                    <label htmlFor="client.banca">{"Banca"}</label>
                    <input
                      value={invoice.client.banca}
                      onChange={(e) => handleInputChange("client", "banca", e.target.value)}
                    />
                  </div>
                  <div className={styles.inputFielder}>
                    <label htmlFor="client.CUI">{"CUI"}</label>
                    <input
                      value={invoice.client.CUI}
                      onChange={(e) => handleInputChange("client", "CUI", e.target.value)}
                    />
                  </div>
                </div>
                <div className={styles.rowSpacer}>
                  <div className={styles.inputFielder}>
                    <label htmlFor="client.email">{"Email"}</label>
                    <input
                      value={invoice.client.email}
                      onChange={(e) => handleInputChange("client", "email", e.target.value)}
                    />
                  </div>
                  <div className={styles.inputFielder}>
                    <label htmlFor="client.adresa">{"Adresa"}</label>
                    <input
                      value={invoice.client.adresa}
                      onChange={(e) => handleInputChange("client", "adresa", e.target.value)}
                    />
                  </div>
                  <div className={styles.inputFielder}>
                    <label htmlFor="client.telefon">{"Telefon"}</label>
                    <input
                      value={invoice.client.telefon}
                      onChange={(e) => handleInputChange("client", "telefon", e.target.value)}
                    />
                  </div>
                </div>

                {/* <div className={styles.actionControl}>
                  <button className={styles.saveButton}>{"GENERATE PDF"}</button>
                </div> */}
              </div>
            </div>

            <div className={styles.addAreaContainer}>
              <h3>Products Details</h3>
              <div className={styles.buttonContainer}>
                <button className={styles.addBtn} onClick={handleAddItem}>
                  Add
                </button>
              </div>
              <div className={styles.inputContainer}>
                {invoice.items.map((item, index) => {
                  return (
                    <div key={index} className={styles.rowSpacerProduct}>
                      <div className={styles.inputFielder}>
                        <label htmlFor="product">{"Produs"}</label>
                        <input
                          value={item.product}
                          onChange={(e) => handleItemChange(index, "product", e.target.value)}
                        />
                      </div>
                      <div className={styles.inputFielder}>
                        <label htmlFor="quantity">{"Cantitate"}</label>
                        <input
                          value={item.quantity}
                          onChange={(e) => handleItemChange(index, "quantity", e.target.value)}
                        />
                      </div>
                      <div className={styles.inputFielder}>
                        <label htmlFor="price">{"Pret"}</label>
                        <input value={item.price} onChange={(e) => handleItemChange(index, "price", e.target.value)} />
                      </div>
                      <div className={styles.removeContainer}>
                        {invoice.items.length !== 0 && (
                          <button className={styles.removeBtn} onClick={() => handleRemoveClick(index)}>
                            <img src={images.logos.remove} alt="Remove" />
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className={styles.actionControl}>
                <Link to={`/admin/invoice/${invoice[""]}`}>
                  <button className={styles.generatePdf} onClick={submitAddOperation}>
                    {"GENERATE PDF"}
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default InvoiceGenerator;
