import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import { OrderViewProps } from "../../utils/OrderInterfaces";
import PDFView from "./pdf";
// import { PDFDownloadLink } from "@react-pdf/renderer";
// const InvoicePDF = dynamic(() => import("./pdf"), { ssr: false });

type invoiceInterface = {
  invoiceObject: OrderViewProps;
};
const View = ({ invoiceObject }: invoiceInterface) => {
  // const [client, setClient] = useState(false);
  // useEffect(() => {
  //   setClient(true);
  // }, []);

  return <PDFView invoiceObject={invoiceObject} />;
};

/* This remains to be seen in the future. Errors on the go!*/
// const DownloadLinkPDF = () => {
//   return (
//     <PDFDownloadLink document={<InvoicePDF />} fileName={"InvoiceMontanAir.RO"}>
//       {({ blob, url, loading, error }) => (loading ? "Loading document" : "Download now!!!")}
//     </PDFDownloadLink>
//   );
// };

export { View };
