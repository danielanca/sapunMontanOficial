import React, { useEffect, useState } from "react";
import images from "./../../data/images";
import { InvoiceOrderProps } from "../../utils/OrderInterfaces";
import { PDFViewer, Page, Text, View, Image, Document, StyleSheet, Font } from "@react-pdf/renderer";
import strings from "./../../data/strings.json";

Font.register({
  family: "Oswald",
  src: "https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf"
});
const stylesPDF = StyleSheet.create({
  logo: {
    width: 74,
    height: 66
  },
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
    width: "800px",
    height: "900px"
  },
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
    backgroundColor: "white",
    display: "flex",
    flexDirection: "column",
    width: "800px",
    height: "900px"
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    fontFamily: "Oswald"
  },
  author: {
    fontSize: 12,
    textAlign: "center",
    marginBottom: 40
  },
  subtitle: {
    fontSize: 18,
    margin: 12,
    fontFamily: "Oswald"
  },
  text: {
    margin: 12,
    fontSize: 14,
    textAlign: "justify",
    fontFamily: "Times-Roman"
  },
  image: {
    marginVertical: 15,
    marginHorizontal: 100
  },
  header: {
    fontSize: 12,
    marginBottom: 8,
    textAlign: "center",
    color: "grey"
  },
  headerLeft: {
    fontSize: 12,
    marginBottom: 4,
    textAlign: "left",
    color: "grey"
  },
  pageNumber: {
    position: "absolute",
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "grey"
  },
  invoiceHeader: {
    height: "15%"
  },
  firstRow: {
    display: "flex",
    flexDirection: "row",
    borderBottom: "0.7px solid black",
    justifyContent: "space-evenly"
  },
  secondRow: {
    display: "flex",
    height: "45%",
    alignItems: "flex-start",
    justifyContent: "flex-start"
  },
  thirdRow: {
    display: "flex",
    flexDirection: "row",
    height: "15%",
    borderTop: "1.5px solid black"
  },
  fourthRow: {
    height: "10%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  footerText: {
    textAlign: "center",
    width: "100%",
    padding: "0 2%",
    fontSize: "12px"
  },
  productText: {
    fontSize: 16,
    fontFamily: "Times-Roman",
    border: "0.5px solid black",
    width: "50%",
    padding: "0 2%"
  },
  productPrice: {
    fontSize: 16,
    fontFamily: "Times-Roman",
    border: "0.5px solid black",
    width: "25%",
    padding: "0 2%"
  },
  productItemNumber: {
    fontSize: 16,
    fontFamily: "Times-Roman",
    border: "0.5px solid black",
    width: "25%",
    textAlign: "center"
  },
  totals: { width: "50%", padding: "0 2%", fontSize: "16px" }
});

const PDF = ({ invoiceObject }: InvoiceOrderProps) => {
  let productsListInvoice: any[] =
    typeof invoiceObject.cartProducts === "string" ? JSON.parse(invoiceObject.cartProducts) : null;
  let companyInfo = strings.companyData;
  return (
    <Document>
      <Page size={"A4"} style={stylesPDF.body}>
        <View style={stylesPDF.invoiceHeader}>
          <Text style={stylesPDF.header} fixed>
            {strings.invoiceTemplate.headerTextInvoice}
          </Text>
          <Text style={stylesPDF.title}>{`Factura #${invoiceObject.invoiceID}`}</Text>
          <Text style={stylesPDF.author}>{strings.invoiceTemplate.authorSignature}</Text>
        </View>
        <View style={stylesPDF.firstRow}>
          <View style={{ width: "50%" }}>
            <Text style={stylesPDF.headerLeft}>{`Nume: ${invoiceObject.firstName} ${invoiceObject.lastName}`}</Text>
            <Text
              style={stylesPDF.headerLeft}
            >{`Adresa:${invoiceObject.deliveryAddress} jud.${invoiceObject.county}`}</Text>
            <Text style={stylesPDF.headerLeft}>{`Loc:${invoiceObject.city} jud.${invoiceObject.county}`}</Text>
            <Text style={stylesPDF.headerLeft}>{`Email:${invoiceObject.emailAddress}`}</Text>
            <Text style={stylesPDF.headerLeft}>{`Tel:${invoiceObject.phoneNo}`}</Text>
          </View>
          <View style={{ width: "50%" }}>
            <Text style={stylesPDF.headerLeft}>{"Furnizor: "}</Text>
            <Text style={stylesPDF.headerLeft}>{`${companyInfo.name}`}</Text>
            <Text style={stylesPDF.headerLeft}>{`${companyInfo.address}`}</Text>
            <Text style={stylesPDF.headerLeft}>{`${companyInfo.fiscal} CUI: ${companyInfo.number}`}</Text>
            <Text style={stylesPDF.headerLeft}>{`${companyInfo.phoneNumber}`}</Text>
          </View>
        </View>
        <View style={stylesPDF.secondRow}>
          <View style={{ width: "100%", margin: "3% auto" }}>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                border: "0.6px solid black",
                borderBottom: "2px solid black"
              }}
            >
              <Text style={stylesPDF.productText}>{"Denumire produs"}</Text>
              <Text style={stylesPDF.productItemNumber}>{"buc."}</Text>
              <Text style={stylesPDF.productPrice}>{"Pret unitar"}</Text>
            </View>
            {productsListInvoice != null
              ? productsListInvoice.map((item) => (
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      border: "0.6px solid black"
                    }}
                  >
                    <Text style={stylesPDF.productText}>{item.name}</Text>
                    <Text style={stylesPDF.productItemNumber}>{item.itemNumber}</Text>
                    <Text style={stylesPDF.productPrice}>{`${item.price} RON`}</Text>
                  </View>
                ))
              : "Factura eronata! Contactati administratorul"}
          </View>
        </View>
        <View style={stylesPDF.thirdRow}>
          <View style={{ width: "50%" }}>{/* <Text style={stylesPDF.productText}>{"TEST"}</Text> */}</View>
          <View style={{ width: "50%", marginTop: "10px" }}>
            <View style={{ display: "flex", flexDirection: "row" }}>
              <Text style={stylesPDF.totals}>{`Subtotal  `}</Text>
              <Text style={stylesPDF.totals}>{`${invoiceObject.cartSum} RON`}</Text>
            </View>
            <View style={{ display: "flex", flexDirection: "row" }}>
              <Text style={stylesPDF.totals}>{`Taxa de livrare  `}</Text>
              <Text style={stylesPDF.totals}>{`${invoiceObject.shippingTax} RON `}</Text>
            </View>
            <View style={{ display: "flex", flexDirection: "row", borderTop: "1px solid black" }}>
              <Text style={stylesPDF.totals}>{`TOTAL:  `}</Text>
              <Text style={stylesPDF.totals}>{`${invoiceObject.cartSum} RON `}</Text>
            </View>
          </View>
        </View>
        <View style={stylesPDF.fourthRow}>
          <Text style={stylesPDF.footerText}>{strings.invoiceTemplate.thankYouMessage}</Text>
          <Text style={stylesPDF.footerText}>{strings.invoiceTemplate.authorSignature}</Text>
        </View>
      </Page>
    </Document>
  );
};

const PDFView = ({ invoiceObject }: InvoiceOrderProps) => {
  // const [client, setClient] = useState(false);
  // useEffect(() => {
  //   setClient(true);
  // }, []);

  return (
    <PDFViewer width={"600px"} height={"860px"} showToolbar={false}>
      <PDF invoiceObject={invoiceObject} />
    </PDFViewer>
  );
};
export default PDFView;
