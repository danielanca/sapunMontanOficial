import React, { useEffect, useState } from "react";
import PDFView from "./pdfGenerator";
import { InvoiceGeneral } from "../../utils/OrderInterfaces";

const PDFViews = ({ invoiceObject }: InvoiceGeneral) => {
  return <PDFView invoiceObject={invoiceObject} />;
};

export default PDFViews;
