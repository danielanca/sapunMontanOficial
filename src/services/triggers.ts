import { orderProps, ProductModel } from "./../utils/OrderInterfaces";
import { getCookie } from "../utils/functions";
import { ReviewsInterface } from "../utils/ReviewsTypes";
import { NewsProps } from "../utils/NewsletterInterface";
import { getUserBrowser } from "../hooks/onScreen";
let destination: string = "";
// const destination = "http://localhost:5000/sapunmontan/us-central1";
if (process.env.NODE_ENV === "development") {
  destination = "http://localhost:5000/diniubire-89ce0/us-central1";
} else {
  destination = "https://us-central1-diniubire-89ce0.cloudfunctions.net";
}
interface eventsTrigger {
  typeEvent: string;
  url: string;
}
export const sendTriggerEmail = async ({ typeEvent, url }: eventsTrigger) => {
  return await fetch(`${destination}/triggerEvent`, {
    method: "POST",
    mode: "cors",
    body: JSON.stringify({
      typeEvent,
      url,
      browserVersion: getUserBrowser()
    })
  })
    .then((res) => res)
    .catch((error) => console.log(error));
};
