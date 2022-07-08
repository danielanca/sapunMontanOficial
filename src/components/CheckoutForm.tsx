import React, { useEffect, useState } from "react";
import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import styles from "./PaymentComponents.module.scss";

import { reserveDate } from "../functions/firebase";
import { sendReservationMail } from "../services/emails";

export default function CheckoutForm({
  setShowPayment,
  setShowPaymentField,
  reservationObject,
  sendAnalyticsForPaymentSuccesfull,
  sendAnalyticsForPaymentFailed
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const isPaymentDisabled = isLoading || !stripe || !elements;
  // For when we need to let the user change the currency
  // const [currency,setCurrency] = useState('eur')
  // const options = [
  //   { value: 'eur', label: 'EUR' },
  //   { value: 'ron', label: 'RON' },
  //   { value: 'usd', label: 'USD' },
  // ];

  const handleSubmitPaymentForm = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "http://localhost:3000/"
      },
      redirect: "if_required"
    });

    if (!error) {
      reserveDate(
        reservationObject.fullname,
        reservationObject.email,
        reservationObject.phoneNumber,
        reservationObject.details,
        reservationObject.checkInDates
      );
      sendReservationMail(
        reservationObject.fullname,
        reservationObject.email,
        reservationObject.phoneNumber,
        reservationObject.details,
        reservationObject.datesForEmail,
        reservationObject.persons
      );
      setShowPaymentField(false);
      setShowPayment(true);
      sendAnalyticsForPaymentSuccesfull();
    }
    if (error) {
      sendAnalyticsForPaymentFailed();
    }
    setIsLoading(false);
  };

  return (
    <form className={styles.formPay} id="payment-form" onSubmit={handleSubmitPaymentForm}>
      <PaymentElement id="payment-element" />
      {
        // For when we need to let the user change the currency
        /* <Select
        className={styles.textCurrency}
        placeholder="Select Currency"
        defaultValue={currency}
        onChange={setCurrency}
        options={options}
      /> */
      }
      <button className={styles.submit} disabled={isPaymentDisabled} id="submit">
        <span className={styles.textPay} id="button-text">
          {isLoading ? <div className={styles.spinner} id="spinner"></div> : "PAY NOW"}
        </span>
      </button>
    </form>
  );
}
