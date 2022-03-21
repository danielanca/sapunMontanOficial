import React, { useState, useEffect } from 'react';
import { loadStripe, StripeElementsOptions } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { getClientSecret } from '../services/payments';
import CheckoutForm from './CheckoutForm';
import styles from './PaymentComponents.module.scss';
import { appearance } from '../constants/payments';
const stripePromise = loadStripe(`${process.env.REACT_APP_PAYMENT_KEY}`);

export default function App({ setShowPayment, setShowPaymentField, reservationObject , sendAnalyticsForPaymentSuccesfull,sendAnalyticsForPaymentFailed}) {
  const [clientSecret, setClientSecret] = useState('');

  useEffect(() => {
    const diffInDays = calculateBookingDays();
    const getClientS = async () => {
      console.log(diffInDays)
      const clientS = await getClientSecret(diffInDays, 'eur');
      setClientSecret(clientS);
    };
    getClientS();
  }, []);

  const calculateBookingDays = () => {
    const startDate =
      reservationObject.checkInDates.from?.year +
      '-' +
      reservationObject.checkInDates.from?.month +
      '-' +
      reservationObject.checkInDates.from?.day;
    const endDate =
      reservationObject.checkInDates.to?.year +
      '-' +
      reservationObject.checkInDates.to?.month +
      '-' +
      reservationObject.checkInDates.to?.day;
    const diffInMs = new Date(endDate).valueOf() - new Date(startDate).valueOf();
    const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
    return diffInDays;
  };
  const options: StripeElementsOptions = {
    clientSecret: clientSecret,
    appearance,
  };
  return (
    <div className={styles.container}>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm
            sendAnalyticsForPaymentFailed={sendAnalyticsForPaymentFailed}
            sendAnalyticsForPaymentSuccesfull={sendAnalyticsForPaymentSuccesfull}          
            reservationObject={reservationObject}
            setShowPaymentField={setShowPaymentField}
            setShowPayment={setShowPayment}
          />
        </Elements>
      )}
    </div>
  );
}
