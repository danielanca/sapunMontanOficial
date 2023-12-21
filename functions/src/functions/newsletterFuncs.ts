import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { subscriberProps } from "../types/newsletterTypes";
import { applyCORSpolicy } from "../constants/corsFunc";
import { getTimestamp } from "../constants/utils";

export const subscribeToNewsletter = functions.https.onRequest(async (request, response) => {
  applyCORSpolicy(response);
  let subscriberData: subscriberProps = JSON.parse(request.body);
  functions.logger.info("Pls subscribeToNewsletter headers:", response.getHeaders());
  await databasePost(subscriberData);
  response.send({ subscribeToNewsletter: "SUBSCRIBED" });
});

const databasePost = async (data: subscriberProps) => {
  await admin.firestore().collection("newsletterSubscribers").doc(data.email).set({
    email: data.email,
    fullName: data.fullName,
    subscribeDate: getTimestamp()
  });
};
