/* eslint-disable */

import * as admin from "firebase-admin";
import * as express from "express";

import { getStringsList, sendStringsList } from "./functions/stringListFunc";
import { sendReviewToServer } from "./functions/reviewFuncs";
import { updateProduct, deleteProduct } from "./functions/productFuncs";
import { requestOrders } from "./functions/admin/adminFuncs";
import { requestAuth } from "./functions/admin/auth";
import { subscribeToNewsletter } from "./functions/newsletterFuncs";
import { sendEmail } from "./functions/emails/mail";

const cookieParser = require("cookie-parser");
const app = express();
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = "0";
app.use(cookieParser());

admin.initializeApp({
  credential: admin.credential.applicationDefault()
});

//Admin Backend
export { requestOrders, requestAuth };
export { getStringsList, sendStringsList };
export { updateProduct, deleteProduct };

//Front end interface
export { subscribeToNewsletter };
export { sendReviewToServer };
export { sendEmail };
