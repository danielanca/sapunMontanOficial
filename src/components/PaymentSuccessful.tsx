import images from '../data/images';
import styles from './../components/PaymentSuccessful.module.scss';
import strings from './../data/strings.json';

interface IProps {
  setShowPayment: (showPayment: boolean) => void;
  sendAnalyticsForClosePaymentConfirmation: () => void;
}

const PaymentSuccessful: React.FC<IProps> = ({setShowPayment,sendAnalyticsForClosePaymentConfirmation}) => {
  return (
    <div className={styles.container}>
      <img src={images.paymentComponent.smiley} className={styles.smiley}/>
      <div className={styles.title}>{strings.paymentComponent.title}</div>
      <div>
        <div className={styles.details}>{strings.paymentComponent.thankYou}</div>
        <div className={styles.details}>{strings.paymentComponent.invoice}</div>
        <div className={styles.details}>{strings.paymentComponent.please}</div>
        <div className={styles.details}>{strings.paymentComponent.contactUs}</div>
      </div>
      <button
        className={styles.okButton}
        onClick={() => {
          sendAnalyticsForClosePaymentConfirmation();
          setShowPayment(false);
        }}
      >
        <span className={styles.buttonsText}>{strings.paymentComponent.ok}</span>
      </button>
    </div>
  );
};

export default PaymentSuccessful;
