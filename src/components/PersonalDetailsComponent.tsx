import images from '../data/images';
import styles from './../components/PersonalDetailsComponent.module.scss';
import strings from './../data/strings.json';

interface IProps {
  setShowBooking: (showBooking: boolean) => void;
  setShowPersonal: (showPersonal: boolean) => void;
  setShowPayment: (showPayment: boolean) => void;
  setOtherDeatils: (otherDetails: string) => void;
  persons: number;
  name: string;
  email: string;
  phoneNumber: string;
  otherDetails: string;
  checkOutString: string;
  checkInString: string;
  resetStates: () => void;
}

const PersonalDetails = ({
  setShowPersonal,
  setShowBooking,
  name,
  email,
  phoneNumber,
  otherDetails,
  checkOutString,
  checkInString,
  persons,
  setOtherDetails,
  setShowPayment,
  resetStates,
  sendAnalyticsForPayPress
}: any) => {
  return (
    <div className={styles.container}>
      <img className={styles.closeImage} src={images.booking.closeButton} onClick={() => {setShowPersonal(false); setOtherDetails('')}} />
      <span className={styles.title}>{strings.personalComponent.personalDetails}</span>
      <div className={styles.detailsContainer}>
        <div className={styles.details}>{name}</div>
        <div className={styles.details}>{email}</div>
        <div className={styles.details}>{phoneNumber}</div>
        <div className={styles.details}>{strings.personalComponent.otherDetails}{otherDetails}</div>
        <div className={styles.details}>
          {checkInString + '-' + checkOutString + ',' + ' ' + persons + ' ' + strings.checkinComponent.personsNumber}
        </div>
      </div>
      <div className={styles.buttonsContainer}>
        <button
          className={styles.backButton}
          onClick={() => {
            setShowPersonal(false);
            setShowBooking(true);
            setOtherDetails('');
          }}
        >
          <span className={styles.buttonsText}>{strings.personalComponent.back}</span>
        </button>
        <button className={styles.payButton} onClick={() => {setShowPayment(true); setShowPersonal(false); resetStates(); sendAnalyticsForPayPress()}}>
          <span className={styles.buttonsText}>{strings.personalComponent.pay}</span>
        </button>
      </div>
    </div>
  );
};

export default PersonalDetails;
