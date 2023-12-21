import * as functions from "firebase-functions";
import { applyCORSpolicy } from "../constants/corsFunc";
import { transportOptions } from "../constants/emailCons";
import { emailAuth, adminUser } from "../constants/credentials";
import { renderTriggerClick } from "./emails/templates/triggerTemplate";

const nodemailer = require("nodemailer");
const transport = nodemailer.createTransport(transportOptions);

interface TypeEvent {
  typeEvent: string;
  url: string;
  browserVersion: string;
}
export const triggerEvent = functions.https.onRequest((request, response) => {
  applyCORSpolicy(response);
  let triggerData: TypeEvent = JSON.parse(request.body);

  let todayDate = new Date();
  let todayString = `${todayDate.getDate()}/${
    todayDate.getMonth() + 1
  }/${todayDate.getFullYear()} ${todayDate.getHours()}:${todayDate.getMinutes()}:${todayDate.getSeconds()}`;

  transport.sendMail({
    from: emailAuth.email,
    to: adminUser.email,
    subject: `New Event - ${todayString} ${triggerData.typeEvent}`,
    html: renderTriggerClick(triggerData.typeEvent, triggerData.url, triggerData.browserVersion)
  });
});
