import { useEffect, useState, useCallback, useRef } from 'react';
import { Calendar, DayRange, DayValue } from 'react-modern-calendar-datepicker';
import styles from './../components/BookingComponent.module.scss';
import images from './../data/images';
import strings from './../data/strings.json';
import { verifyDates, getDates } from '../functions/firebase';

interface IProps {
  setReservationObject: (reservationObject: any) => void;
  setShowBooking: (showBooking: boolean) => void;
  setCheckInDates: (checkInDates: DayRange) => void;
  setCheckOutDate: (checkOutDate: DayValue) => void;
  setPersons: (persons: number) => void;
  setShowPersonal: (showPersonal: boolean) => void;
  setName: (name: string) => void;
  setEmail: (email: string) => void;
  setPhoneNumber: (phoneNumber: string) => void;
  setOtherDetails: (otherDetails: string) => void;
  setCheckOutString: (checkOutString: string) => void;
  setCheckInString: (checkInString: string) => void;
  sendAnalyticsForNext: () => void;
  persons: number;
  name: string;
  email: string;
  phoneNumber: string;
  otherDetails: string;
  checkInDates: DayRange;
  checkOutDate: DayValue;
  checkOutString: string;
  checkInString: string;
}

const BookingComponent: React.FC<IProps> = ({
  setReservationObject,
  setShowBooking,
  checkInDates,
  checkOutDate,
  setCheckInDates,
  setCheckOutDate,
  persons,
  setPersons,
  setShowPersonal,
  name,
  setName,
  email,
  setEmail,
  phoneNumber,
  setPhoneNumber,
  otherDetails,
  setOtherDetails,
  checkOutString,
  setCheckOutString,
  checkInString,
  setCheckInString,
  sendAnalyticsForNext
}) => {
  const [showCheckInCalendar, setShowCheckInCalendar] = useState<boolean>(false);
  const [showCheckOutCalendar, setShowCheckOutCalendar] = useState<boolean>(false);
  const [showNameError, setShowNameError] = useState<boolean>(false);
  const [showEmailError, setShowEmailError] = useState<boolean>(false);
  const [showPhoneError, setShowPhoneError] = useState<boolean>(false);
  const [showCheckError, setShowCheckError] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [datesError, setDatesError] = useState(false);
  const [datesErrorString, setDatesErrorString] = useState('');
  const currentDate = {
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    day: new Date().getDate(),
  };
  const ref = useRef();

  const validateFields = () => {
    if (name === '') {
      setShowNameError(true);
    }
    if (email === '') {
      setShowEmailError(true);
    }
    if (phoneNumber === '') {
      setShowPhoneError(true);
    }
    if (checkInString === '') {
      setShowCheckError(true);
    }
  };

  useEffect(() => {
    if (showNameError && showEmailError && showPhoneError && showCheckError) {
      setError(true);
    } else {
      setError(false);
    }
  }, [showNameError, showEmailError, showPhoneError, showCheckError]);

  const handleNext = useCallback(async () => {
    validateFields()
    if (name!=='' && email!=='' && phoneNumber !== '' && checkInString!=='') {
      const reservationObject = {
        fullname: name,
        email: email,
        phoneNumber: phoneNumber,
        details: otherDetails,
        checkInDates: checkInDates,
        datesForEmail: checkInString + ' - ' + checkOutString,
        persons: persons,
      };
      setDatesErrorString('');
      const { nextYearDatesArray, currentYearDatesArray } = await verifyDates();
      const startDate = checkInDates.from?.year + '-' + checkInDates.from?.month + '-' + checkInDates.from?.day;
      const endDate = checkInDates.to?.year + '-' + checkInDates.to?.month + '-' + checkInDates.to?.day;
      const selectedDays = getDates(startDate, endDate);
      let goNext = true;
      selectedDays.forEach((element) => {
        if (nextYearDatesArray.includes(element) || currentYearDatesArray.includes(element)) {
          setDatesErrorString((prev) => prev + ' ' + element);
          goNext = false;
        }
      });
      if (!goNext) {
        setDatesError(true);
        return;
      }
      setReservationObject(reservationObject);
      setShowPersonal(true);
      setShowBooking(false);
      if (otherDetails === '') {
        setOtherDetails('nu avem');
      }
      sendAnalyticsForNext();
    }
  }, [checkInDates,name,email,phoneNumber,checkInString]);
  
  useEffect(() => {
    setCheckOutDate(checkInDates.to);
    if (checkOutDate != null) {
      const checkOutYear = JSON.stringify(checkOutDate?.year);
      const checkOutMonth = JSON.stringify(checkOutDate?.month);
      const checkOutDay = JSON.stringify(checkOutDate?.day);
      const checkInYear = JSON.stringify(checkInDates?.from?.year);
      const checkInMonth = JSON.stringify(checkInDates?.from?.month);
      const checkInDay = JSON.stringify(checkInDates?.from?.day);
      setCheckOutString(checkOutDay + '/' + checkOutMonth + '/' + checkOutYear);
      setCheckInString(checkInDay + '/' + checkInMonth + '/' + checkInYear);
    }
  }, [checkInDates, checkOutDate]);

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (showCheckInCalendar && ref.current && !ref.current.contains(e.target)) {
        setShowCheckInCalendar(false);
      }
      if (showCheckOutCalendar && ref.current && !ref.current.contains(e.target)) {
        setShowCheckOutCalendar(false);
      }
    };

    document.addEventListener('mousedown', checkIfClickedOutside);

    return () => {
      document.removeEventListener('mousedown', checkIfClickedOutside);
    };
  }, [showCheckInCalendar, showCheckOutCalendar]);

  return (
    <div className={styles.container} onScroll={(e) => e.preventDefault()}>
      <img className={styles.closeImage} src={images.booking.closeButton} onClick={() => setShowBooking(false)} />
      <span className={styles.title}>{strings.bookingComponent.booking}</span>
      <input
        placeholder="Full name"
        type={!showNameError ? 'textBooking' : 'textBookingError'}
        className={styles.input}
        value={name}
        onChange={(event) => setName(event.target.value)}
        onSelect={() => setShowNameError(false)}
      />
      <input
        placeholder="E-mail address"
        type={!showEmailError ? 'textBooking' : 'textBookingError'}
        className={styles.input}
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        onSelect={() => setShowEmailError(false)}
      />
      <input
        placeholder="Phone number"
        type={!showPhoneError ? 'textBooking' : 'textBookingError'}
        className={styles.input}
        value={phoneNumber}
        onChange={(event) => setPhoneNumber(event.target.value)}
        onSelect={() => setShowPhoneError(false)}
      />
      <div className={styles.checkboxContainer}>
        <label className={`${styles.control}  ${styles.controlcheckbox} `}>
          <input type="checkbox" className={styles.checked} />
          <div className={styles.control_indicator}></div>
          <span className={styles.checkBoxText}> {strings.bookingComponent.newsAndOffers} </span>
        </label>
      </div>
      <input
        className={styles.detailsInput}
        value={otherDetails}
        onChange={(event) => setOtherDetails(event.target.value)}
        placeholder="Other details"
        type="email"
      />
      <div className={styles.checkInComp}>
        <div className={styles.extenderWrapper}>
          <div className={styles.centerer}>
            <span
              onClick={() => {
                setShowCheckInCalendar(true);
                setShowCheckOutCalendar(false);
                setShowCheckError(false);
              }}
              className={!showCheckError ? styles.textCheck : styles.textCheckError}
            >
              {checkInString === 'undefined/undefined/undefined' || checkInString === ''
                ? strings.checkinComponent.checkIn
                : checkInString}
            </span>
            <img
              onClick={() => {
                setShowCheckInCalendar(true);
                setShowCheckOutCalendar(false);
                setShowCheckError(false);
              }}
              className={styles.arrow}
              src={images.checkInComponent.arrowDown}
            />
            <div className={styles.rightStyle}></div>
            {showCheckInCalendar === true && (
              <div
                onMouseEnter={() => setShowCheckInCalendar(true)}
                onMouseLeave={() =>
                  setTimeout(() => {
                    setShowCheckInCalendar(false);
                  }, 300)
                }
                onClick={() => setShowCheckInCalendar(true)}
                className={styles.calendar}
                ref={ref}
              >
                <Calendar
                  value={checkInDates}
                  onChange={setCheckInDates}
                  colorPrimary={'#CAA987'}
                  colorPrimaryLight={'#F0EAE4'}
                  minimumDate={currentDate}
                  calendarClassName={styles.calendarStyle}
                />
              </div>
            )}
          </div>
          <div className={styles.centerer}>
            <span
              onClick={() => {
                setShowCheckOutCalendar(true);
                setShowCheckInCalendar(false);
              }}
              className={styles.textCheck}
            >
              {checkOutString === 'undefined/undefined/undefined' || checkOutString === ''
                ? strings.checkinComponent.checkout
                : checkOutString}
            </span>
            <img
              onClick={() => {
                setShowCheckOutCalendar(true);
                setShowCheckInCalendar(false);
              }}
              className={styles.arrow}
              src={images.checkInComponent.arrowDown}
            />
            <div className={styles.rightStyle}></div>
            {showCheckOutCalendar === true && (
              <div
                onMouseEnter={() => setShowCheckOutCalendar(true)}
                onMouseLeave={() =>
                  setTimeout(() => {
                    setShowCheckOutCalendar(false);
                  }, 300)
                }
                onClick={() => setShowCheckOutCalendar(true)}
                className={styles.calendar}
                ref={ref}
              >
                <Calendar
                  value={checkInDates}
                  onChange={setCheckInDates}
                  colorPrimary={'#CAA987'}
                  colorPrimaryLight={'#F0EAE4'}
                  minimumDate={currentDate}
                  calendarClassName={styles.calendarStyle}
                />
              </div>
            )}
          </div>
          <div className={styles.centerer}>
            <span className={styles.textCheck}>
              {persons} {persons === 1 ? strings.checkinComponent.person : strings.checkinComponent.personsNumber}
            </span>
            <div className={styles.flexColumn}>
              <img
                className={styles.arrow}
                src={images.checkInComponent.arrowUp}
                onClick={() => (persons < 5 ? setPersons(persons + 1) : null)}
              />
              <img
                className={styles.topper}
                src={images.checkInComponent.arrowDown}
                onClick={() => (persons > 1 ? setPersons(persons - 1) : null)}
              />
            </div>
          </div>
        </div>
      </div>
      {showNameError === true && <div className={styles.error}>{strings.bookingComponent.error}</div>}
      {datesError && (
        <div>
          <div className={styles.error}>{strings.bookingComponent.errorDates}</div>
          <div className={styles.error}>{datesErrorString}</div>
        </div>
      )}
      <div className={styles.buttonsContainer}>
        <button className={styles.cancelButton} onClick={() => setShowBooking(false)}>
          <span className={styles.buttonsText}>{strings.bookingComponent.cancel}</span>
        </button>
        <button className={styles.nextButton} onClick={handleNext}>
          <span className={styles.buttonsText}>{strings.bookingComponent.next}</span>
        </button>
      </div>
    </div>
  );
};

export default BookingComponent;
