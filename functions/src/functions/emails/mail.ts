import * as functions from "firebase-functions";
import { applyCORSpolicy } from "../../constants/corsFunc";
import { ResponseObject, transportOptions } from "../../constants/emailCons";
import { generateInvoiceID } from "../../constants/utils";
import { postOrderToDB } from "./dbEmail";
import { emailAuth, adminUser } from "../../constants/credentials";
import { renderClientMail } from "./templates/clientOrderTemplate";
import { renderAdminTemplate } from "./templates/admOrderConf";
import { getDateAndHour } from "./../../constants/utils";

const nodemailer = require("nodemailer");
const transport = nodemailer.createTransport(transportOptions);

export const sendPostOrderEmail = functions.https.onRequest(async (request, response) => {
  applyCORSpolicy(response);
  let ResponseData: ResponseObject = {
    EMAILTO_ADMIN: "EMPTY",
    EMAILTO_CLIENT: "EMPTY"
  };
  const postOrderData = JSON.parse(request.body);
  transport
    .sendMail({
      from: emailAuth.email,
      to: adminUser.email,
      subject: "PostOrder oferta - " + postOrderData.firstName,
      html: `${postOrderData.firstName} a adaugat in cos si cuponul de cupluri. Nu uita sa ii adaugi in colet, si sa specifici in factura`
    })
    .then((responseToAdmin: any) => {
      ResponseData.EMAILTO_ADMIN = responseToAdmin;

      response.send(ResponseData);
    });
});

export const sendEmail = functions.https.onRequest(async (request, response) => {
  applyCORSpolicy(response);
  const invoiceNumberID = generateInvoiceID();

  let ResponseData: ResponseObject = {
    EMAILTO_ADMIN: "EMPTY",
    EMAILTO_CLIENT: "EMPTY"
  };

  const transmitToAdmin = () => {
    transport
      .sendMail({
        from: emailAuth.email,
        to: adminUser.email,
        subject: "Comanda noua - " + data.firstName,
        html: renderAdminTemplate(cartProd, invoiceNumberID, data)
      })
      .then((responseToAdmin: any) => {
        ResponseData.EMAILTO_ADMIN = responseToAdmin;

        response.send(ResponseData);
      });
  };

  const data = JSON.parse(request.body);
  console.log("DANUUUUUUUUUUUUUUUUUUT", data);
  await postOrderToDB(invoiceNumberID, data, getDateAndHour());
  let cartProd = JSON.parse(data.cartProducts);

  if (!data.emailAddress) {
    console.error("No recipients defined");
    transmitToAdmin();
    return;
  }
  transport
    .sendMail({
      from: emailAuth.email,
      to: data.emailAddress,
      subject: "Comanda inregistrata, " + data.firstName,
      html: renderClientMail(cartProd, invoiceNumberID, data)
    })
    .then((emailClientResponse: any) => {
      ResponseData.EMAILTO_CLIENT = emailClientResponse;
      transmitToAdmin();
    });
});
