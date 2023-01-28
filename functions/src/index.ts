/* eslint-disable */

import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as express from "express";
import { firestore } from "firebase-admin";
// import { remoteAddress, remoteAddressLocal } from "./constants/address";
import { adminUser, getSessionID, emailAuth, getAuthToken } from "./constants/credentials";
import { subscriberProps } from "./types/newsletterTypes";
import { applyCORSpolicy } from "./constants/corsFunc";
import { ReviewType, ReviewToPostType } from "./types/reviewTypes";
import { ResponseObject } from "./constants/emailCons";
import { getTimestamp, generateInvoiceID } from "./constants/utils";
import { transportOptions } from "./constants/emailCons";
import { ProductModel } from "./types/productTypes";

const cookieParser = require("cookie-parser");
const nodemailer = require("nodemailer");
const app = express();
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = "0";
app.use(cookieParser());

admin.initializeApp({
  credential: admin.credential.applicationDefault()
});

export const getStringsList = functions.https.onRequest((request, response) => {
  applyCORSpolicy(response);
  let { stringRequest: requestType } = JSON.parse(request.body);

  console.log("Request type is:", requestType);

  try {
    admin
      .firestore()
      .collection("list")
      .doc(requestType)
      .get()
      .then((result) => response.send({ resultSent: result.data() }));
  } catch (error) {
    response.send({ errorSent: error });
  }
});
export const sendStringsList = functions.https.onRequest((request, response) => {
  applyCORSpolicy(response);
  let { stringRequest: requestType, payload } = JSON.parse(request.body);

  console.log("Request type is:", requestType);
  console.log("PAYLOAD IS:", typeof payload);
  try {
    admin
      .firestore()
      .collection("list")
      .doc(requestType)
      .set(JSON.parse(payload), { merge: true })
      .then((result) => response.send({ resultSent: true, timeStamp: result }));
  } catch (error) {
    response.send({ errorSent: error });
  }
  // try {
  //   admin
  //     .firestore()
  //     .collection("list")
  //     .doc(requestType)
  //     .get()
  //     .then((result) => response.send({ resultSent: result.data() }));
  // } catch (error) {
  //   response.send({ errorSent: error });
  // }
});
//THIS for getting data from a collection
// admin
// .firestore()
// .collection(requestType)
// .get()
// .then((result) => response.send({ resultSent: result.docs.map((doc) => doc.data()) }));

export const updateProduct = functions.https.onRequest((request, response) => {
  let requestParam = JSON.parse(request.body);
  console.log("updateProduct:", requestParam);

  createNewProduct(requestParam);
});

export const deleteProduct = functions.https.onRequest((request, response) => {
  let requestParam = JSON.parse(request.body);
  console.log("deleteProduct:", requestParam);
  functions.logger.info("deleteProduct is SAYING: ", requestParam);
  deleteProductByID(requestParam);
});

export const sendReviewToServer = functions.https.onRequest((request, response) => {
  let requestParam = JSON.parse(request.body);
  console.log("INCOMING Review for ", requestParam);
  postReviewData(requestParam)
    .then((result) => {
      console.log("RESPONSE [postReviewData]", result);
      response.send({ response: "SENT" });
    })
    .catch((err) => response.send({ response: "reviewErrorServer" }));
});
const postReviewData = async (data: ReviewType) => {
  data.date = new Date().toISOString().slice(0, 10);

  let newReview: ReviewType = data;
  let theResult = await admin
    .firestore()
    .collection("products")
    .doc("activeProds")
    .get()
    .then((result) => {
      let dataObject = JSON.stringify(result.data());

      const incomingProducts = JSON.parse(dataObject);
      console.log("Response of postReviewData is:", incomingProducts);
      if (typeof incomingProducts !== "undefined") {
        let reviewsOfProduct: ReviewToPostType[] = Array.from(incomingProducts[data.reviewProductID].reviews);
        console.log("THE TYPE OF reviewsOfProduct is ", reviewsOfProduct);
        reviewsOfProduct.push({
          email: newReview.email,
          date: newReview.date,
          reviewActual: newReview.reviewActual,
          name: newReview.name,
          starsNumber: newReview.starsNumber,
          mediaLink: newReview.mediaLink
        });

        incomingProducts[data.reviewProductID].reviews = reviewsOfProduct;
        return incomingProducts[data.reviewProductID];
      } else {
        functions.logger.info("sendReviewToServer response: ", incomingProducts);
        return null;
      }
    });
  console.log(`Sending back to DB ${data.reviewProductID}`, +theResult);
  return await admin
    .firestore()
    .collection("products")
    .doc("activeProds")
    .update({
      [data.reviewProductID]: theResult
    })
    .then((response) => response)
    .catch((err) => err);
};

// .update({
//   1: {
//     reviews: {
//       3: { actualComment: "E ok  Estera", date: "Fara date", name: "Esty", stars: "4" }
//     }
//   }
// })

export const subscribeToNewsletter = functions.https.onRequest((request, response) => {
  applyCORSpolicy(response);

  let subscriberData: subscriberProps = JSON.parse(request.body);

  functions.logger.info("Pls subscribeToNewsletter headers:", response.getHeaders());
  databasePost(subscriberData);
  response.send({ subscribeToNewsletter: "SUBSCRIBED" });
});

const databasePost = async (data: subscriberProps) => {
  await admin
    .firestore()
    .collection("newsletterSubscribers")
    .doc(data.email)
    .set({
      email: data.email,
      fullName: data.fullName,
      subscribeDate: getTimestamp()
    })
    .then((result) => result);
};

const getOrdersAdmin = async () => {
  const adminFirestore = admin.firestore();
  const collection = adminFirestore.collection("orders");
  let ordersArray: any = [];
  await collection.get().then((snapshot) => {
    snapshot.forEach((doc) => {
      ordersArray.push(doc.data());
    });
  });
  functions.logger.info(` ORDERS ARRAY IS:  ${ordersArray}`);
  return ordersArray;
};

export const requestOrders = functions.https.onRequest((request, response) => {
  applyCORSpolicy(response);

  let authToken = getAuthToken(request.body);
  if (authToken) {
    functions.logger.info(` TOKEN IS: ${authToken}`);
  } else {
    functions.logger.info(` TOKEN INVALID `);
  }

  getOrdersAdmin().then((result) => {
    functions.logger.info(` getOrdersAdmin:: ${result}`);
    response.send({ ordersList: result, requestOrdersAnswer: `You : ${request.body}` });
  });
});

// https://stackoverflow.com/questions/57253593/cross-domain-state-cookie-issue-for-oauth-using-firebase-functions-while-on-the
/* response.cookie can not be used because it will return cookies with firebase domain, and we need montanair.ro domain */
export const requestAuth = functions.https.onRequest((request, response) => {
  let userData = JSON.parse(request.body);
  functions.logger.info("request Auth called, username and password are: ", userData.password);
  applyCORSpolicy(response);

  if (userData.password === adminUser.password && userData.email === adminUser.email) {
    // response.cookie("jwt", getSessionID(), { sameSite: "none", secure: true, maxAge: 900 * 25 * 60 * 1000 });
    response.send({ LOGIN_ANSWER: "SUCCESS", LOGIN_TOKEN: getSessionID() });
  } else {
    response.send({ LOGIN_ANSWER: "REJECTED", LOGIN_TOKEN: "NO_AUTH" });
  }
});

const transport = nodemailer.createTransport(transportOptions);

const postOrderToDB = async (invoiceID: number, dataObject: any, todayDate: Date) => {
  dataObject.invoiceID = `${invoiceID}`;
  dataObject.timestamp = `${todayDate.getDate()}/${
    todayDate.getMonth() + 1
  }/${todayDate.getFullYear()} ${todayDate.getHours()}:${todayDate.getMinutes()}:${todayDate.getSeconds()}`;
  await admin
    .firestore()
    .collection("orders")
    .doc(invoiceID.toString())
    .create(dataObject)
    .then((result) => functions.logger.info("POST_To_DB: ", result));
};
export const sendEmail = functions.https.onRequest((request, response) => {
  applyCORSpolicy(response);

  let ResponseData: ResponseObject = {
    EMAILTO_ADMIN: "EMPTY",
    EMAILTO_CLIENT: "EMPTY"
  };

  const invoiceNumberID = generateInvoiceID();
  const TodayDate = new Date();

  let DateAndTime = `${TodayDate.getDate()}/${
    TodayDate.getMonth() + 1
  }/${TodayDate.getFullYear()} ${TodayDate.getHours()}:${TodayDate.getMinutes()}`;

  const data = JSON.parse(request.body);

  postOrderToDB(invoiceNumberID, data, TodayDate);

  let cartProd = JSON.parse(data.cartProducts);

  transport
    .sendMail({
      from: emailAuth.email,
      to: data.emailAddress,
      subject: "Comanda inregistrata, " + data.firstName,
      html:
        ` <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office" style="font-family:arial, 'helvetica neue', helvetica, sans-serif"> 
       <head> 
        <meta charset="UTF-8"> 
        <meta content="width=device-width, initial-scale=1" name="viewport"> 
        <meta name="x-apple-disable-message-reformatting"> 
        <meta http-equiv="X-UA-Compatible" content="IE=edge"> 
        <meta content="telephone=no" name="format-detection"> 
        <title>New message</title><!--[if (mso 16)]>
          <style type="text/css">
          a {text-decoration: none;}
          </style>
          <![endif]--><!--[if gte mso 9]><style>sup { font-size: 100% !important; }</style><![endif]--><!--[if gte mso 9]>
      <xml>
          <o:OfficeDocumentSettings>
          <o:AllowPNG></o:AllowPNG>
          <o:PixelsPerInch>96</o:PixelsPerInch>
          </o:OfficeDocumentSettings>
      </xml>
      <![endif]--> 
        <style type="text/css">
      #outlook a {
        padding:0;
      }
      .es-button {
        mso-style-priority:100!important;
        text-decoration:none!important;
      }
      a[x-apple-data-detectors] {
        color:inherit!important;
        text-decoration:none!important;
        font-size:inherit!important;
        font-family:inherit!important;
        font-weight:inherit!important;
        line-height:inherit!important;
      }
      .es-desk-hidden {
        display:none;
        float:left;
        overflow:hidden;
        width:0;
        max-height:0;
        line-height:0;
        mso-hide:all;
      }
      [data-ogsb] .es-button {
        border-width:0!important;
        padding:10px 30px 10px 30px!important;
      }
      @media only screen and (max-width:600px) {p, ul li, ol li, a { line-height:150%!important } h1, h2, h3, h1 a, h2 a, h3 a { line-height:120%!important } h1 { font-size:36px!important; text-align:left } h2 { font-size:26px!important; text-align:left } h3 { font-size:20px!important; text-align:left } .es-header-body h1 a, .es-content-body h1 a, .es-footer-body h1 a { font-size:36px!important; text-align:left } .es-header-body h2 a, .es-content-body h2 a, .es-footer-body h2 a { font-size:26px!important; text-align:left } .es-header-body h3 a, .es-content-body h3 a, .es-footer-body h3 a { font-size:20px!important; text-align:left } .es-menu td a { font-size:12px!important } .es-header-body p, .es-header-body ul li, .es-header-body ol li, .es-header-body a { font-size:14px!important } .es-content-body p, .es-content-body ul li, .es-content-body ol li, .es-content-body a { font-size:14px!important } .es-footer-body p, .es-footer-body ul li, .es-footer-body ol li, .es-footer-body a { font-size:14px!important } .es-infoblock p, .es-infoblock ul li, .es-infoblock ol li, .es-infoblock a { font-size:12px!important } *[class="gmail-fix"] { display:none!important } .es-m-txt-c, .es-m-txt-c h1, .es-m-txt-c h2, .es-m-txt-c h3 { text-align:center!important } .es-m-txt-r, .es-m-txt-r h1, .es-m-txt-r h2, .es-m-txt-r h3 { text-align:right!important } .es-m-txt-l, .es-m-txt-l h1, .es-m-txt-l h2, .es-m-txt-l h3 { text-align:left!important } .es-m-txt-r img, .es-m-txt-c img, .es-m-txt-l img { display:inline!important } .es-button-border { display:inline-block!important } a.es-button, button.es-button { font-size:20px!important; display:inline-block!important } .es-adaptive table, .es-left, .es-right { width:100%!important } .es-content table, .es-header table, .es-footer table, .es-content, .es-footer, .es-header { width:100%!important; max-width:600px!important } .es-adapt-td { display:block!important; width:100%!important } .adapt-img { width:100%!important; height:auto!important } .es-m-p0 { padding:0!important } .es-m-p0r { padding-right:0!important } .es-m-p0l { padding-left:0!important } .es-m-p0t { padding-top:0!important } .es-m-p0b { padding-bottom:0!important } .es-m-p20b { padding-bottom:20px!important } .es-mobile-hidden, .es-hidden { display:none!important } tr.es-desk-hidden, td.es-desk-hidden, table.es-desk-hidden { width:auto!important; overflow:visible!important; float:none!important; max-height:inherit!important; line-height:inherit!important } tr.es-desk-hidden { display:table-row!important } table.es-desk-hidden { display:table!important } td.es-desk-menu-hidden { display:table-cell!important } .es-menu td { width:1%!important } table.es-table-not-adapt, .esd-block-html table { width:auto!important } table.es-social { display:inline-block!important } table.es-social td { display:inline-block!important } .es-m-p5 { padding:5px!important } .es-m-p5t { padding-top:5px!important } .es-m-p5b { padding-bottom:5px!important } .es-m-p5r { padding-right:5px!important } .es-m-p5l { padding-left:5px!important } .es-m-p10 { padding:10px!important } .es-m-p10t { padding-top:10px!important } .es-m-p10b { padding-bottom:10px!important } .es-m-p10r { padding-right:10px!important } .es-m-p10l { padding-left:10px!important } .es-m-p15 { padding:15px!important } .es-m-p15t { padding-top:15px!important } .es-m-p15b { padding-bottom:15px!important } .es-m-p15r { padding-right:15px!important } .es-m-p15l { padding-left:15px!important } .es-m-p20 { padding:20px!important } .es-m-p20t { padding-top:20px!important } .es-m-p20r { padding-right:20px!important } .es-m-p20l { padding-left:20px!important } .es-m-p25 { padding:25px!important } .es-m-p25t { padding-top:25px!important } .es-m-p25b { padding-bottom:25px!important } .es-m-p25r { padding-right:25px!important } .es-m-p25l { padding-left:25px!important } .es-m-p30 { padding:30px!important } .es-m-p30t { padding-top:30px!important } .es-m-p30b { padding-bottom:30px!important } .es-m-p30r { padding-right:30px!important } .es-m-p30l { padding-left:30px!important } .es-m-p35 { padding:35px!important } .es-m-p35t { padding-top:35px!important } .es-m-p35b { padding-bottom:35px!important } .es-m-p35r { padding-right:35px!important } .es-m-p35l { padding-left:35px!important } .es-m-p40 { padding:40px!important } .es-m-p40t { padding-top:40px!important } .es-m-p40b { padding-bottom:40px!important } .es-m-p40r { padding-right:40px!important } .es-m-p40l { padding-left:40px!important } }
      </style> 
       </head> 
       <body style="width:100%;font-family:arial, 'helvetica neue', helvetica, sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0"> 
        <div class="es-wrapper-color" style="background-color:#FAFAFA"><!--[if gte mso 9]>
            <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
              <v:fill type="tile" color="#fafafa"></v:fill>
            </v:background>
          <![endif]--> 
         <table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;padding:0;Margin:0;width:100%;height:100%;background-repeat:repeat;background-position:center top;background-color:#FAFAFA"> 
           <tr> 
            <td valign="top" style="padding:0;Margin:0"> 
             <table cellpadding="0" cellspacing="0" class="es-content" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%"> 
               <tr> 
                <td class="es-info-area" align="center" style="padding:0;Margin:0"> 
                 <table class="es-content-body" align="center" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;width:600px" bgcolor="#FFFFFF"> 
                   <tr> 
                    <td align="left" style="padding:20px;Margin:0"> 
                     <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                       <tr> 
                        <td align="center" valign="top" style="padding:0;Margin:0;width:560px"> 
                         <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                           <tr> 
                            <td align="center" class="es-infoblock" style="padding:0;Margin:0;line-height:14px;font-size:12px;color:#CCCCCC"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:14px;color:#CCCCCC;font-size:12px"><a target="_blank" href="" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#CCCCCC;font-size:12px">View online version</a></p></td> 
                           </tr> 
                         </table></td> 
                       </tr> 
                     </table></td> 
                   </tr> 
                 </table></td> 
               </tr> 
             </table> 
             <table cellpadding="0" cellspacing="0" class="es-header" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;background-color:transparent;background-repeat:repeat;background-position:center top"> 
               <tr> 
                <td align="center" style="padding:0;Margin:0"> 
                 <table bgcolor="#ffffff" class="es-header-body" align="center" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;width:600px"> 
                   <tr> 
                    <td align="left" style="padding:20px;Margin:0"> 
                     <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                       <tr> 
                        <td class="es-m-p0r" valign="top" align="center" style="padding:0;Margin:0;width:560px"> 
                         <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                           <tr> 
                            <td align="center" style="padding:0;Margin:0;padding-bottom:10px;font-size:0px"><img src="https://firebasestorage.googleapis.com/v0/b/diniubire-89ce0.appspot.com/o/emailTemplate%2FdinIubireLogoBro.png?alt=media&token=f9fe0cb8-7f70-4c1b-bd71-cc751f796d6e" alt="Logo" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic;font-size:12px" width="200" title="Logo"></td> 
                           </tr> 
                         </table></td> 
                       </tr> 
                     </table></td> 
                   </tr> 
                 </table></td> 
               </tr> 
             </table> 
             <table cellpadding="0" cellspacing="0" class="es-content" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%"> 
               <tr> 
                <td align="center" style="padding:0;Margin:0"> 
                 <table bgcolor="#ffffff" class="es-content-body" align="center" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px"> 
                   <tr> 
                    <td align="left" style="padding:0;Margin:0;padding-top:15px;padding-left:20px;padding-right:20px"> 
                     <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                       <tr> 
                        <td align="center" valign="top" style="padding:0;Margin:0;width:560px"> 
                         <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                           <tr> 
                            <td align="center" style="padding:0;Margin:0;padding-top:10px;padding-bottom:10px;font-size:0px"><img src="https://jbbqqc.stripocdn.email/content/guids/CABINET_54100624d621728c49155116bef5e07d/images/84141618400759579.png" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="100"></td> 
                           </tr> 
                           <tr> 
                            <td align="center" class="es-m-txt-c" style="padding:0;Margin:0;padding-bottom:10px"><h1 style="Margin:0;line-height:46px;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-size:46px;font-style:normal;font-weight:bold;color:#333333">Comanda inregistrata</h1></td> 
                           </tr> 
                         </table></td> 
                       </tr> 
                     </table></td> 
                   </tr> 
                 </table></td> 
               </tr> 
             </table> 
             <table cellpadding="0" cellspacing="0" class="es-content" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%"> 
               <tr> 
                <td align="center" style="padding:0;Margin:0"> 
                 <table bgcolor="#ffffff" class="es-content-body" align="center" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px"> 
                   <tr> 
                    <td align="left" style="padding:20px;Margin:0"> 
                     <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                       <tr> 
                        <td align="center" valign="top" style="padding:0;Margin:0;width:560px"> 
                         <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                           <tr> 
                            <td align="center" class="es-m-txt-c" style="padding:0;Margin:0"><h2 style="Margin:0;line-height:31px;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-size:26px;font-style:normal;font-weight:bold;color:#333333">Comanda cu numarul&nbsp;<a target="_blank" href="" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#5C68E2;font-size:26px">#` +
        invoiceNumberID +
        `</a></h2></td> 
                           </tr> 
                           <tr> 
                            <td align="center" class="es-m-p0r es-m-p0l" style="Margin:0;padding-top:5px;padding-bottom:5px;padding-left:40px;padding-right:40px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333;font-size:14px">${DateAndTime}</p></td> 
                           </tr> 
                           <tr> 
                            <td align="center" class="es-m-p0r es-m-p0l" style="Margin:0;padding-top:5px;padding-bottom:15px;padding-left:40px;padding-right:40px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333;font-size:14px">Acest email a fost trimis pentru a confirma inregistrarea comenzii dvs.&nbsp;</p></td> 
                           </tr> 
                         </table></td> 
                       </tr> 
                     </table></td> 
                   </tr> 
                   ` +
        ` ${Object.values(cartProd).map(
          (item: any) => `<tr> 
        <td class="esdev-adapt-off" align="left" style="Margin:0;padding-top:10px;padding-bottom:10px;padding-left:20px;padding-right:20px"> 
         <table cellpadding="0" cellspacing="0" class="esdev-mso-table" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;width:560px"> 
           <tr> 
            <td class="esdev-mso-td" valign="top" style="padding:0;Margin:0"> 
             <table cellpadding="0" cellspacing="0" class="es-left" align="left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left"> 
               <tr> 
                <td class="es-m-p0r" align="center" style="padding:0;Margin:0;width:70px"> 
                 <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                   <tr> 
                    <td align="center" style="padding:0;Margin:0;font-size:0px"><img class="adapt-img" src=${item.imageProduct} alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="70"></td> 
                   </tr> 
                 </table></td> 
               </tr> 
             </table></td> 
            <td style="padding:0;Margin:0;width:20px"></td> 
            <td class="esdev-mso-td" valign="top" style="padding:0;Margin:0"> 
             <table cellpadding="0" cellspacing="0" class="es-left" align="left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left"> 
               <tr> 
                <td align="center" style="padding:0;Margin:0;width:265px"> 
                 <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                   <tr> 
                    <td align="left" style="padding:0;Margin:0"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333;font-size:14px"><strong>${item.name}</strong></p></td> 
                   </tr> 
                   <tr> 
                    <td align="left" style="padding:0;Margin:0;padding-top:5px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333;font-size:14px"><br>Produs in stoc</p></td> 
                   </tr> 
                 </table></td> 
               </tr> 
             </table></td> 
            <td style="padding:0;Margin:0;width:20px"></td> 
            <td class="esdev-mso-td" valign="top" style="padding:0;Margin:0"> 
             <table cellpadding="0" cellspacing="0" class="es-left" align="left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left"> 
               <tr> 
                <td align="left" style="padding:0;Margin:0;width:80px"> 
                 <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                   <tr> 
                    <td align="center" style="padding:0;Margin:0"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333;font-size:14px"> ${item.itemNumber} buc</p></td> 
                   </tr> 
                 </table></td> 
               </tr> 
             </table></td> 
            <td style="padding:0;Margin:0;width:20px"></td> 
            <td class="esdev-mso-td" valign="top" style="padding:0;Margin:0"> 
             <table cellpadding="0" cellspacing="0" class="es-right" align="right" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:right"> 
               <tr> 
                <td align="left" style="padding:0;Margin:0;width:85px"> 
                 <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                   <tr> 
                    <td align="right" style="padding:0;Margin:0"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333;font-size:14px">${item.price} RON</p></td> 
                   </tr> 
                 </table></td> 
               </tr> 
             </table></td> 
           </tr> 
         </table></td> 
       </tr>`
        )}` +
        `
                   <tr> 
                    <td align="left" style="padding:0;Margin:0;padding-top:10px;padding-left:20px;padding-right:20px"> 
                     <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                       <tr> 
                        <td class="es-m-p0r" align="center" style="padding:0;Margin:0;width:560px"> 
                         <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;border-top:2px solid #efefef;border-bottom:2px solid #efefef" role="presentation"> 
                           <tr> 
                            <td align="right" class="es-m-txt-r" style="padding:0;Margin:0;padding-top:10px;padding-bottom:20px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333;font-size:14px">Subtotal:&nbsp;<strong>${
                              data.cartSum
                            } RON</strong><br>Taxa Transport:&nbsp;<strong>${
          data.shippingTax
        } RON</strong><br>Total (TVA inclus):&nbsp;<strong>${
          Number(data.cartSum) + Number(data.shippingTax)
        } RON</strong></p></td> 
                           </tr> 
                         </table></td> 
                       </tr> 
                     </table></td> 
                   </tr> 
                   <tr> 
                    <td align="left" style="Margin:0;padding-bottom:10px;padding-top:20px;padding-left:20px;padding-right:20px"><!--[if mso]><table style="width:560px" cellpadding="0" cellspacing="0"><tr><td style="width:280px" valign="top"><![endif]--> 
                     <table cellpadding="0" cellspacing="0" class="es-left" align="left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left"> 
                       <tr> 
                        <td class="es-m-p0r es-m-p20b" align="center" style="padding:0;Margin:0;width:280px"> 
                         <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                           <tr> 
                            <td align="left" style="padding:0;Margin:0"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333;font-size:14px">Client: <strong>${
                              data.firstName
                            } ${
          data.lastName
        }</strong></p><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333;font-size:14px">Comanda :&nbsp;<strong>${invoiceNumberID}</strong></p><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333;font-size:14px">Data facturarii:&nbsp;<strong>${DateAndTime}</strong></p><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333;font-size:14px">Metoda de plata:&nbsp;<strong>${
          data.paymentMethod
        }</strong></p><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333;font-size:14px">Telefon:&nbsp;<strong>${
          data.phoneNo
        }</strong></p></td> 
                           </tr> 
                         </table></td> 
                       </tr> 
                     </table><!--[if mso]></td><td style="width:0px"></td><td style="width:280px" valign="top"><![endif]--> 
                     <table cellpadding="0" cellspacing="0" class="es-right" align="right" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:right"> 
                       <tr> 
                        <td class="es-m-p0r" align="center" style="padding:0;Margin:0;width:280px"> 
                         <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                           <tr> 
                            <td align="left" class="es-m-txt-l" style="padding:0;Margin:0"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333;font-size:14px">Curier: <strong>${
                              data.deliveryName
                            }</strong></p><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333;font-size:14px">Adresa de livrare:</p><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333;font-size:14px"><strong>${
          data.deliveryAddress
        },<br>${data.city},<br>${data.county}</strong></p></td> 
                           </tr> 
                         </table></td> 
                       </tr> 
                     </table><!--[if mso]></td></tr></table><![endif]--></td> 
                   </tr> 
                   <tr> 
                    <td align="left" style="Margin:0;padding-bottom:10px;padding-top:15px;padding-left:20px;padding-right:20px"> 
                     <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                       <tr> 
                        <td align="left" style="padding:0;Margin:0;width:560px"> 
                         <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                           <tr> 
                            <td align="center" style="padding:0;Margin:0;padding-top:10px;padding-bottom:10px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333;font-size:14px">Aveti intrebari? Nu ezitati sa ne contactati pe diniubire.ro/contact sau la numarul de telefon +40 759 796 202</p></td> 
                           </tr> 
                         </table></td> 
                       </tr> 
                     </table></td> 
                   </tr> 
                 </table></td> 
               </tr> 
             </table> 
             <table cellpadding="0" cellspacing="0" class="es-footer" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;background-color:transparent;background-repeat:repeat;background-position:center top"> 
               <tr> 
                <td align="center" style="padding:0;Margin:0"> 
                 <table class="es-footer-body" align="center" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;width:640px"> 
                   <tr> 
                    <td align="left" style="Margin:0;padding-top:20px;padding-bottom:20px;padding-left:20px;padding-right:20px"> 
                     <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                       <tr> 
                        <td align="left" style="padding:0;Margin:0;width:600px"> 
                         <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                           <tr> 
                            <td align="center" style="padding:0;Margin:0;padding-top:15px;padding-bottom:15px;font-size:0"> 
                             <table cellpadding="0" cellspacing="0" class="es-table-not-adapt es-social" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                               <tr> 
                                <td align="center" valign="top" style="padding:0;Margin:0;padding-right:40px"><a target="_blank" href="https://facebook.com/diniubire.ro" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#333333;font-size:12px"><img title="Facebook" src="https://jbbqqc.stripocdn.email/content/assets/img/social-icons/logo-black/facebook-logo-black.png" alt="Fb" width="32" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic"></a></td> 
                                <td align="center" valign="top" style="padding:0;Margin:0"><a target="_blank" href="https://instagram.com/diniubire.ro" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#333333;font-size:12px"><img title="Instagram" src="https://jbbqqc.stripocdn.email/content/assets/img/social-icons/logo-black/instagram-logo-black.png" alt="Inst" width="32" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic"></a></td> 
                               </tr> 
                             </table></td> 
                           </tr> 
                           <tr> 
                            <td align="center" style="padding:0;Margin:0;padding-bottom:35px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:18px;color:#333333;font-size:12px">Montan Air © 2022 Romania. Toate drepturile rezervate.</p><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:18px;color:#333333;font-size:12px">Str. Liviu Rebreanu, mun.Turda, jud.Cluj</p></td> 
                           </tr> 
                         </table></td> 
                       </tr> 
                     </table></td> 
                   </tr> 
                 </table></td> 
               </tr> 
             </table> 
             <table cellpadding="0" cellspacing="0" class="es-content" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%"> 
               <tr> 
                <td class="es-info-area" align="center" style="padding:0;Margin:0"> 
                 <table class="es-content-body" align="center" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;width:600px" bgcolor="#FFFFFF"> 
                   <tr> 
                    <td align="left" style="padding:20px;Margin:0"> 
                     <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                       <tr> 
                        <td align="center" valign="top" style="padding:0;Margin:0;width:560px"> 
                         <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                           <tr> 
                            <td align="center" style="padding:0;Margin:0;display:none"></td> 
                           </tr> 
                         </table></td> 
                       </tr> 
                     </table></td> 
                   </tr> 
                 </table></td> 
               </tr> 
             </table></td> 
           </tr> 
           <!-- START FOOTER -->
        <div class="footer" style="clear: both; Margin-top: 10px; text-align: center; width: 100%;">
          <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; width: 100%;" width="100%">
            
            <tr>
              <td class="content-block powered-by" style="font-family: sans-serif; vertical-align: top; padding-bottom: 10px; padding-top: 10px; color: #9a9ea6; font-size: 12px; text-align: center;" valign="top" align="center">
                Dezvoltat de  <a href="https://danianca.ro" style="color: #9a9ea6; font-size: 12px; text-align: center; text-decoration: none;">DaniAnca.Ro</a>.
              </td>
            </tr>
          </table>
        </div>
        <!-- END FOOTER -->
         </table> 
        </div>  
       </body>
      </html>`
    })
    .then((emailClientResponse: any) => {
      ResponseData.EMAILTO_CLIENT = emailClientResponse;

      transmitToAdmin();
    });

  // ,
  //   (err: any, info: any) => {
  //     if (err) {
  //       functions.logger.info(`Email FAILED ! (to ${data.emailAddress} )!`);
  //       response.write(JSON.stringify(`REJECTED {${err}} `));
  //     } else {
  //       functions.logger.info(`Email has been SENT (to ${data.emailAddress})!`);
  //       response.write(JSON.stringify("Client sent SUCCESS"));
  //     }
  //   }

  // ,
  // (err: any, info: any) => {
  //   if (err) {
  //     functions.logger.info("Email failed ! (to Administrator)!");
  //     response.write(JSON.stringify(`ERROR DaniAnca (${err})`));
  //   } else {
  //     functions.logger.info("Email has been SENT (to Administrator)!");
  //     response.write(JSON.stringify(`SUCCESS`));
  //   }
  //   response.end();
  // }

  const transmitToAdmin = () => {
    transport
      .sendMail({
        from: emailAuth.email,
        to: adminUser.email,
        subject: "Comanda noua - " + data.firstName,
        html:
          ` <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
        <html xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office" style="font-family:arial, 'helvetica neue', helvetica, sans-serif"> 
         <head> 
          <meta charset="UTF-8"> 
          <meta content="width=device-width, initial-scale=1" name="viewport"> 
          <meta name="x-apple-disable-message-reformatting"> 
          <meta http-equiv="X-UA-Compatible" content="IE=edge"> 
          <meta content="telephone=no" name="format-detection"> 
          <title>New message</title><!--[if (mso 16)]>
            <style type="text/css">
            a {text-decoration: none;}
            </style>
            <![endif]--><!--[if gte mso 9]><style>sup { font-size: 100% !important; }</style><![endif]--><!--[if gte mso 9]>
        <xml>
            <o:OfficeDocumentSettings>
            <o:AllowPNG></o:AllowPNG>
            <o:PixelsPerInch>96</o:PixelsPerInch>
            </o:OfficeDocumentSettings>
        </xml>
        <![endif]--> 
          <style type="text/css">
        #outlook a {
          padding:0;
        }
        .es-button {
          mso-style-priority:100!important;
          text-decoration:none!important;
        }
        a[x-apple-data-detectors] {
          color:inherit!important;
          text-decoration:none!important;
          font-size:inherit!important;
          font-family:inherit!important;
          font-weight:inherit!important;
          line-height:inherit!important;
        }
        .es-desk-hidden {
          display:none;
          float:left;
          overflow:hidden;
          width:0;
          max-height:0;
          line-height:0;
          mso-hide:all;
        }
        [data-ogsb] .es-button {
          border-width:0!important;
          padding:10px 30px 10px 30px!important;
        }
        @media only screen and (max-width:600px) {p, ul li, ol li, a { line-height:150%!important } h1, h2, h3, h1 a, h2 a, h3 a { line-height:120%!important } h1 { font-size:36px!important; text-align:left } h2 { font-size:26px!important; text-align:left } h3 { font-size:20px!important; text-align:left } .es-header-body h1 a, .es-content-body h1 a, .es-footer-body h1 a { font-size:36px!important; text-align:left } .es-header-body h2 a, .es-content-body h2 a, .es-footer-body h2 a { font-size:26px!important; text-align:left } .es-header-body h3 a, .es-content-body h3 a, .es-footer-body h3 a { font-size:20px!important; text-align:left } .es-menu td a { font-size:12px!important } .es-header-body p, .es-header-body ul li, .es-header-body ol li, .es-header-body a { font-size:14px!important } .es-content-body p, .es-content-body ul li, .es-content-body ol li, .es-content-body a { font-size:14px!important } .es-footer-body p, .es-footer-body ul li, .es-footer-body ol li, .es-footer-body a { font-size:14px!important } .es-infoblock p, .es-infoblock ul li, .es-infoblock ol li, .es-infoblock a { font-size:12px!important } *[class="gmail-fix"] { display:none!important } .es-m-txt-c, .es-m-txt-c h1, .es-m-txt-c h2, .es-m-txt-c h3 { text-align:center!important } .es-m-txt-r, .es-m-txt-r h1, .es-m-txt-r h2, .es-m-txt-r h3 { text-align:right!important } .es-m-txt-l, .es-m-txt-l h1, .es-m-txt-l h2, .es-m-txt-l h3 { text-align:left!important } .es-m-txt-r img, .es-m-txt-c img, .es-m-txt-l img { display:inline!important } .es-button-border { display:inline-block!important } a.es-button, button.es-button { font-size:20px!important; display:inline-block!important } .es-adaptive table, .es-left, .es-right { width:100%!important } .es-content table, .es-header table, .es-footer table, .es-content, .es-footer, .es-header { width:100%!important; max-width:600px!important } .es-adapt-td { display:block!important; width:100%!important } .adapt-img { width:100%!important; height:auto!important } .es-m-p0 { padding:0!important } .es-m-p0r { padding-right:0!important } .es-m-p0l { padding-left:0!important } .es-m-p0t { padding-top:0!important } .es-m-p0b { padding-bottom:0!important } .es-m-p20b { padding-bottom:20px!important } .es-mobile-hidden, .es-hidden { display:none!important } tr.es-desk-hidden, td.es-desk-hidden, table.es-desk-hidden { width:auto!important; overflow:visible!important; float:none!important; max-height:inherit!important; line-height:inherit!important } tr.es-desk-hidden { display:table-row!important } table.es-desk-hidden { display:table!important } td.es-desk-menu-hidden { display:table-cell!important } .es-menu td { width:1%!important } table.es-table-not-adapt, .esd-block-html table { width:auto!important } table.es-social { display:inline-block!important } table.es-social td { display:inline-block!important } .es-m-p5 { padding:5px!important } .es-m-p5t { padding-top:5px!important } .es-m-p5b { padding-bottom:5px!important } .es-m-p5r { padding-right:5px!important } .es-m-p5l { padding-left:5px!important } .es-m-p10 { padding:10px!important } .es-m-p10t { padding-top:10px!important } .es-m-p10b { padding-bottom:10px!important } .es-m-p10r { padding-right:10px!important } .es-m-p10l { padding-left:10px!important } .es-m-p15 { padding:15px!important } .es-m-p15t { padding-top:15px!important } .es-m-p15b { padding-bottom:15px!important } .es-m-p15r { padding-right:15px!important } .es-m-p15l { padding-left:15px!important } .es-m-p20 { padding:20px!important } .es-m-p20t { padding-top:20px!important } .es-m-p20r { padding-right:20px!important } .es-m-p20l { padding-left:20px!important } .es-m-p25 { padding:25px!important } .es-m-p25t { padding-top:25px!important } .es-m-p25b { padding-bottom:25px!important } .es-m-p25r { padding-right:25px!important } .es-m-p25l { padding-left:25px!important } .es-m-p30 { padding:30px!important } .es-m-p30t { padding-top:30px!important } .es-m-p30b { padding-bottom:30px!important } .es-m-p30r { padding-right:30px!important } .es-m-p30l { padding-left:30px!important } .es-m-p35 { padding:35px!important } .es-m-p35t { padding-top:35px!important } .es-m-p35b { padding-bottom:35px!important } .es-m-p35r { padding-right:35px!important } .es-m-p35l { padding-left:35px!important } .es-m-p40 { padding:40px!important } .es-m-p40t { padding-top:40px!important } .es-m-p40b { padding-bottom:40px!important } .es-m-p40r { padding-right:40px!important } .es-m-p40l { padding-left:40px!important } }
        </style> 
         </head> 
         <body style="width:100%;font-family:arial, 'helvetica neue', helvetica, sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0"> 
          <div class="es-wrapper-color" style="background-color:#FAFAFA"><!--[if gte mso 9]>
              <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
                <v:fill type="tile" color="#fafafa"></v:fill>
              </v:background>
            <![endif]--> 
           <table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;padding:0;Margin:0;width:100%;height:100%;background-repeat:repeat;background-position:center top;background-color:#FAFAFA"> 
             <tr> 
              <td valign="top" style="padding:0;Margin:0"> 
               <table cellpadding="0" cellspacing="0" class="es-content" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%"> 
                 <tr> 
                  <td class="es-info-area" align="center" style="padding:0;Margin:0"> 
                   <table class="es-content-body" align="center" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;width:600px" bgcolor="#FFFFFF"> 
                     <tr> 
                      <td align="left" style="padding:20px;Margin:0"> 
                       <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                         <tr> 
                          <td align="center" valign="top" style="padding:0;Margin:0;width:560px"> 
                           <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                             <tr> 
                              <td align="center" class="es-infoblock" style="padding:0;Margin:0;line-height:14px;font-size:12px;color:#CCCCCC"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:14px;color:#CCCCCC;font-size:12px"><a target="_blank" href="" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#CCCCCC;font-size:12px">View online version</a></p></td> 
                             </tr> 
                           </table></td> 
                         </tr> 
                       </table></td> 
                     </tr> 
                   </table></td> 
                 </tr> 
               </table> 
               <table cellpadding="0" cellspacing="0" class="es-header" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;background-color:transparent;background-repeat:repeat;background-position:center top"> 
                 <tr> 
                  <td align="center" style="padding:0;Margin:0"> 
                   <table bgcolor="#ffffff" class="es-header-body" align="center" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;width:600px"> 
                     <tr> 
                      <td align="left" style="padding:20px;Margin:0"> 
                       <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                         <tr> 
                          <td class="es-m-p0r" valign="top" align="center" style="padding:0;Margin:0;width:560px"> 
                           <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                             <tr> 
                              <td align="center" style="padding:0;Margin:0;padding-bottom:10px;font-size:0px"><img src="https://firebasestorage.googleapis.com/v0/b/diniubire-89ce0.appspot.com/o/emailTemplate%2FdinIubireLogoBro.png?alt=media&token=f9fe0cb8-7f70-4c1b-bd71-cc751f796d6e" alt="Logo" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic;font-size:12px" width="200" title="Logo"></td> 
                             </tr> 
                           </table></td> 
                         </tr> 
                       </table></td> 
                     </tr> 
                   </table></td> 
                 </tr> 
               </table> 
               <table cellpadding="0" cellspacing="0" class="es-content" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%"> 
                 <tr> 
                  <td align="center" style="padding:0;Margin:0"> 
                   <table bgcolor="#ffffff" class="es-content-body" align="center" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px"> 
                     <tr> 
                      <td align="left" style="padding:0;Margin:0;padding-top:15px;padding-left:20px;padding-right:20px"> 
                       <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                         <tr> 
                          <td align="center" valign="top" style="padding:0;Margin:0;width:560px"> 
                           <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                             <tr> 
                              <td align="center" style="padding:0;Margin:0;padding-top:10px;padding-bottom:10px;font-size:0px"><img src="https://jbbqqc.stripocdn.email/content/guids/CABINET_54100624d621728c49155116bef5e07d/images/84141618400759579.png" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="100"></td> 
                             </tr> 
                             <tr> 
                              <td align="center" class="es-m-txt-c" style="padding:0;Margin:0;padding-bottom:10px"><h1 style="Margin:0;line-height:46px;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-size:46px;font-style:normal;font-weight:bold;color:#333333">Comanda inregistrata</h1></td> 
                             </tr> 
                           </table></td> 
                         </tr> 
                       </table></td> 
                     </tr> 
                   </table></td> 
                 </tr> 
               </table> 
               <table cellpadding="0" cellspacing="0" class="es-content" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%"> 
                 <tr> 
                  <td align="center" style="padding:0;Margin:0"> Comanda receptionata!
                   <table bgcolor="#ffffff" class="es-content-body" align="center" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px"> 
                     <tr> 
                      <td align="left" style="padding:20px;Margin:0"> 
                       <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                         <tr> 
                          <td align="center" valign="top" style="padding:0;Margin:0;width:560px"> 
                           <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                             <tr> 
                              <td align="center" class="es-m-txt-c" style="padding:0;Margin:0"><h2 style="Margin:0;line-height:31px;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-size:26px;font-style:normal;font-weight:bold;color:#333333">Comanda cu numarul&nbsp;<a target="_blank" href="" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#5C68E2;font-size:26px">#` +
          invoiceNumberID +
          `</a></h2></td> 
                             </tr> 
                             <tr> 
                              <td align="center" class="es-m-p0r es-m-p0l" style="Margin:0;padding-top:5px;padding-bottom:5px;padding-left:40px;padding-right:40px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333;font-size:14px">${DateAndTime}</p></td> 
                             </tr> 
                             <tr> 
                              <td align="center" class="es-m-p0r es-m-p0l" style="Margin:0;padding-top:5px;padding-bottom:15px;padding-left:40px;padding-right:40px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333;font-size:14px">Acest email a fost trimis pentru a confirma inregistrarea comenzii dvs.&nbsp;</p></td> 
                             </tr> 
                           </table></td> 
                         </tr> 
                       </table>
                       
                       <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="btn btn-primary" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; box-sizing: border-box; min-width: 100%; width: 100%;" width="100%">
                        <tbody>
                          <tr>
                            <td align="center" style="font-family: sans-serif; font-size: 14px; vertical-align: top; padding-bottom: 15px;" valign="top">
                              <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: auto; width: auto;">
                                <tbody>
                                  <tr>
                                    <td style="font-family: sans-serif; font-size: 14px; vertical-align: top; border-radius: 5px; text-align: center; background-color: #e7e7e7;" valign="top" align="center" bgcolor="#e7e7e7"> <a href="https://diniubire.ro/order/${invoiceNumberID}"  target="_blank" style="border: solid 1px #df94b3; border-radius: 5px; box-sizing: border-box; cursor: pointer; display: inline-block; font-size: 14px; font-weight: bold; margin: 0; padding: 12px 25px; text-decoration: none; text-transform: capitalize; background-color: #181818; border-color: #ffffff; color: #ffffff;">Vezi comanda</a> </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                       </td> 
                     </tr> 
                     ` +
          ` ${Object.values(cartProd).map(
            (item: any) => `<tr> 
          <td class="esdev-adapt-off" align="left" style="Margin:0;padding-top:10px;padding-bottom:10px;padding-left:20px;padding-right:20px"> 
           <table cellpadding="0" cellspacing="0" class="esdev-mso-table" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;width:560px"> 
             <tr> 
              <td class="esdev-mso-td" valign="top" style="padding:0;Margin:0"> 
               <table cellpadding="0" cellspacing="0" class="es-left" align="left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left"> 
                 <tr> 
                  <td class="es-m-p0r" align="center" style="padding:0;Margin:0;width:70px"> 
                   <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                     <tr> 
                      <td align="center" style="padding:0;Margin:0;font-size:0px"><img class="adapt-img" src=${item.imageProduct} alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="70"></td> 
                     </tr> 
                   </table></td> 
                 </tr> 
               </table></td> 
              <td style="padding:0;Margin:0;width:20px"></td> 
              <td class="esdev-mso-td" valign="top" style="padding:0;Margin:0"> 
               <table cellpadding="0" cellspacing="0" class="es-left" align="left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left"> 
                 <tr> 
                  <td align="center" style="padding:0;Margin:0;width:265px"> 
                   <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                     <tr> 
                      <td align="left" style="padding:0;Margin:0"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333;font-size:14px"><strong>${item.name}</strong></p></td> 
                     </tr> 
                     <tr> 
                      <td align="left" style="padding:0;Margin:0;padding-top:5px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333;font-size:14px"><br>Produs in stoc</p></td> 
                     </tr> 
                   </table></td> 
                 </tr> 
               </table></td> 
              <td style="padding:0;Margin:0;width:20px"></td> 
              <td class="esdev-mso-td" valign="top" style="padding:0;Margin:0"> 
               <table cellpadding="0" cellspacing="0" class="es-left" align="left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left"> 
                 <tr> 
                  <td align="left" style="padding:0;Margin:0;width:80px"> 
                   <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                     <tr> 
                      <td align="center" style="padding:0;Margin:0"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333;font-size:14px"> ${item.itemNumber} buc</p></td> 
                     </tr> 
                   </table></td> 
                 </tr> 
               </table></td> 
              <td style="padding:0;Margin:0;width:20px"></td> 
              <td class="esdev-mso-td" valign="top" style="padding:0;Margin:0"> 
               <table cellpadding="0" cellspacing="0" class="es-right" align="right" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:right"> 
                 <tr> 
                  <td align="left" style="padding:0;Margin:0;width:85px"> 
                   <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                     <tr> 
                      <td align="right" style="padding:0;Margin:0"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333;font-size:14px">${item.price} RON</p></td> 
                     </tr> 
                   </table></td> 
                 </tr> 
               </table></td> 
             </tr> 
           </table></td> 
         </tr>`
          )}` +
          `
                     <tr> 
                      <td align="left" style="padding:0;Margin:0;padding-top:10px;padding-left:20px;padding-right:20px"> 
                       <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                         <tr> 
                          <td class="es-m-p0r" align="center" style="padding:0;Margin:0;width:560px"> 
                           <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;border-top:2px solid #efefef;border-bottom:2px solid #efefef" role="presentation"> 
                             <tr> 
                              <td align="right" class="es-m-txt-r" style="padding:0;Margin:0;padding-top:10px;padding-bottom:20px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333;font-size:14px">Subtotal:&nbsp;<strong>${
                                data.cartSum
                              } RON</strong><br>Taxa Transport:&nbsp;<strong>${
            data.shippingTax
          } RON</strong><br>Total (TVA inclus):&nbsp;<strong>${
            Number(data.cartSum) + Number(data.shippingTax)
          } RON</strong></p></td> 
                             </tr> 
                           </table></td> 
                         </tr> 
                       </table></td> 
                     </tr> 
                     <tr> 
                      <td align="left" style="Margin:0;padding-bottom:10px;padding-top:20px;padding-left:20px;padding-right:20px"><!--[if mso]><table style="width:560px" cellpadding="0" cellspacing="0"><tr><td style="width:280px" valign="top"><![endif]--> 
                       <table cellpadding="0" cellspacing="0" class="es-left" align="left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left"> 
                         <tr> 
                          <td class="es-m-p0r es-m-p20b" align="center" style="padding:0;Margin:0;width:280px"> 
                           <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                             <tr> 
                              <td align="left" style="padding:0;Margin:0"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333;font-size:14px">Client: <strong>${
                                data.firstName
                              } ${
            data.lastName
          }</strong></p><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333;font-size:14px">Comanda :&nbsp;<strong>${invoiceNumberID}</strong></p><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333;font-size:14px">Data facturarii:&nbsp;<strong>${DateAndTime}</strong></p><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333;font-size:14px">Metoda de plata:&nbsp;<strong>${
            data.paymentMethod
          }</strong></p><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333;font-size:14px">Telefon:&nbsp;<strong>${
            data.phoneNo
          }</strong></p></td> 
                             </tr> 
                           </table></td> 
                         </tr> 
                       </table><!--[if mso]></td><td style="width:0px"></td><td style="width:280px" valign="top"><![endif]--> 
                       <table cellpadding="0" cellspacing="0" class="es-right" align="right" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:right"> 
                         <tr> 
                          <td class="es-m-p0r" align="center" style="padding:0;Margin:0;width:280px"> 
                           <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                             <tr> 
                              <td align="left" class="es-m-txt-l" style="padding:0;Margin:0"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333;font-size:14px">Curier: <strong>${
                                data.deliveryName
                              }</strong></p><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333;font-size:14px">Adresa de livrare:</p><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333;font-size:14px"><strong>${
            data.deliveryAddress
          },<br>${data.city},<br>${data.county}</strong></p></td> 
                             </tr> 
                           </table></td> 
                         </tr> 
                       </table><!--[if mso]></td></tr></table><![endif]--></td> 
                     </tr> 
                     <tr> 
                      <td align="left" style="Margin:0;padding-bottom:10px;padding-top:15px;padding-left:20px;padding-right:20px"> 
                       <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                         <tr> 
                          <td align="left" style="padding:0;Margin:0;width:560px"> 
                           <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                             <tr> 
                              <td align="center" style="padding:0;Margin:0;padding-top:10px;padding-bottom:10px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333;font-size:14px">Aveti intrebari? Nu ezitati sa ne contactati pe diniubire.ro/contact sau la numarul de telefon +40 759 796 202</p></td> 
                             </tr> 
                           </table></td> 
                         </tr> 
                       </table></td> 
                     </tr> 
                   </table></td> 
                 </tr> 
               </table> 
               <table cellpadding="0" cellspacing="0" class="es-footer" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;background-color:transparent;background-repeat:repeat;background-position:center top"> 
                 <tr> 
                  <td align="center" style="padding:0;Margin:0"> 
                   <table class="es-footer-body" align="center" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;width:640px"> 
                     <tr> 
                      <td align="left" style="Margin:0;padding-top:20px;padding-bottom:20px;padding-left:20px;padding-right:20px"> 
                       <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                         <tr> 
                          <td align="left" style="padding:0;Margin:0;width:600px"> 
                           <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                             <tr> 
                              <td align="center" style="padding:0;Margin:0;padding-top:15px;padding-bottom:15px;font-size:0"> 
                               <table cellpadding="0" cellspacing="0" class="es-table-not-adapt es-social" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                                 <tr> 
                                  <td align="center" valign="top" style="padding:0;Margin:0;padding-right:40px"><a target="_blank" href="https://facebook.com/diniubire.ro" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#333333;font-size:12px"><img title="Facebook" src="https://jbbqqc.stripocdn.email/content/assets/img/social-icons/logo-black/facebook-logo-black.png" alt="Fb" width="32" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic"></a></td> 
                                  <td align="center" valign="top" style="padding:0;Margin:0"><a target="_blank" href="https://instagram.com/diniubire.ro" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#333333;font-size:12px"><img title="Instagram" src="https://jbbqqc.stripocdn.email/content/assets/img/social-icons/logo-black/instagram-logo-black.png" alt="Inst" width="32" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic"></a></td> 
                                 </tr> 
                               </table></td> 
                             </tr> 
                             <tr> 
                              <td align="center" style="padding:0;Margin:0;padding-bottom:35px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:18px;color:#333333;font-size:12px">Montan Air © 2022 Romania. Toate drepturile rezervate.</p><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:18px;color:#333333;font-size:12px">Str. Liviu Rebreanu, mun.Turda, jud.Cluj</p></td> 
                             </tr> 
                           </table></td> 
                         </tr> 
                       </table></td> 
                     </tr> 
                   </table></td> 
                 </tr>
               </table> 
               <table cellpadding="0" cellspacing="0" class="es-content" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%"> 
                 <tr> 
                  <td class="es-info-area" align="center" style="padding:0;Margin:0"> 
                   <table class="es-content-body" align="center" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;width:600px" bgcolor="#FFFFFF"> 
                     <tr> 
                      <td align="left" style="padding:20px;Margin:0"> 
                       <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                         <tr> 
                          <td align="center" valign="top" style="padding:0;Margin:0;width:560px"> 
                           <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                             <tr> 
                              <td align="center" style="padding:0;Margin:0;display:none"></td> 
                             </tr> 
                           </table></td> 
                         </tr> 
                       </table></td> 
                     </tr> 
                   </table></td> 
                 </tr> 
               </table></td> 
             </tr> 
             <!-- START FOOTER -->
          <div class="footer" style="clear: both; Margin-top: 10px; text-align: center; width: 100%;">
            <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; width: 100%;" width="100%">
              <tr>
                <td class="content-block powered-by" style="font-family: sans-serif; vertical-align: top; padding-bottom: 10px; padding-top: 10px; color: #9a9ea6; font-size: 12px; text-align: center;" valign="top" align="center">
                  Dezvoltat de  <a href="https://danianca.ro" style="color: #9a9ea6; font-size: 12px; text-align: center; text-decoration: none;">DaniAnca.Ro</a>.
                </td>
              </tr>
            </table>
          </div>
          <!-- END FOOTER -->
           </table> 
          </div>  
         </body>
        </html>`
      })
      .then((responseToAdmin: any) => {
        ResponseData.EMAILTO_ADMIN = responseToAdmin;

        response.send(ResponseData);
      });
  };
});

const createNewProduct = async (modelID: ProductModel) => {
  console.log("create new product received:", JSON.stringify(modelID));
  await admin
    .firestore()
    .collection("products")
    .doc("activeProds")
    .update({
      [modelID.ID]: {
        ID: modelID.ID,
        title: modelID.title,
        shortDescription: modelID.shortDescription,
        price: modelID.price,
        firstDescription: modelID.firstDescription,
        reviews: {},
        // reviews: {
        //   0: {
        //     reviewActual: "Sunt ok produsele, un pic cam scump",
        //     starsNumber: "3",
        //     name: "Lips Mihai",
        //     date: "19.02.2020",
        //     reviewProductID: "0"
        //   }
        // },

        jsonContent: modelID.jsonContent,

        imageProduct: modelID.imageProduct,
        ULbeneficii: modelID.ULbeneficii
      }
    })
    .then((result) => functions.logger.info("sendReviewToServer response: ", result));
};

const deleteProductByID = async (modelID: string) => {
  console.log("PREPARE FOR DELETE:", JSON.stringify(modelID));
  await admin
    .firestore()
    .collection("products")
    .doc("activeProds")
    .update({
      [modelID]: firestore.FieldValue.delete()
    })
    .then((result) => functions.logger.info("sendReviewToServer response: ", result));
};

// .firestore()
// .collection("products")
// .doc("activeProds")
// .update({
//   [modelID.ID]: {
//     ID: modelID.ID,
//     title: modelID.title,
//     shortDescription: modelID.shortDescription,
//     price: modelID.price,
//     firstDescription: modelID.firstDescription,
//     reviews: {},
//     // reviews: {
//     //   0: {
//     //     reviewActual: "Sunt ok produsele, un pic cam scump",
//     //     starsNumber: "3",
//     //     name: "Lips Mihai",
//     //     date: "19.02.2020",
//     //     reviewProductID: "0"
//     //   }
//     // },

//     jsonContent: modelID.jsonContent

//     imageProduct: [
//       "https://firebasestorage.googleapis.com/v0/b/sapunmontan.appspot.com/o/poza1.png?alt=media&token=d55eb00a-21e7-4ab2-8bf7-80c5e5c0569c",
//       "https://firebasestorage.googleapis.com/v0/b/sapunmontan.appspot.com/o/poza1.png?alt=media&token=d55eb00a-21e7-4ab2-8bf7-80c5e5c0569c",
//       "https://firebasestorage.googleapis.com/v0/b/sapunmontan.appspot.com/o/sapunCarbune.jpg?alt=media&token=c0c66773-a2aa-4602-9c45-17e5232e6724"
//     ],
//     ULbeneficii: ["Revigorează pielea", "Curata in profunzime pielea"]
//   }
