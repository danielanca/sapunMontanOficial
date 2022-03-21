
import React, { useEffect, useRef, useState } from 'react';
import ReactGA from "react-ga4";
import { Calendar, DayRange, DayValue } from 'react-modern-calendar-datepicker';
import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import { reserveDate, verifyDates } from '../functions/firebase';
import styles from './../components/CheckinComponent.module.scss';

import images from './../data/images';

import strings from './../data/strings.json';
import BookingComponent from './BookingComponent';
import PaymentSuccessful from './PaymentSuccessful';
import PersonalDetails from './PersonalDetailsComponent';
import PaymentComponent from './PaymentComponent';

interface DisabledDays {
  year: number;
  month: number;
  day: number;
}

const CheckinComponent = () => {
  const [showCheckInCalendar, setShowCheckInCalendar] = useState<boolean>(false);
  const [showCheckOutCalendar, setShowCheckOutCalendar] = useState<boolean>(false);
  const [showBooking, setShowBooking] = useState<boolean>(false);
  const [showPersonal, setShowPersonal] = useState<boolean>(false);
  const [showPayment, setShowPayment] = useState<boolean>(false);
  const [showPaymentField, setShowPaymentField] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [otherDetails, setOtherDetails] = useState<string>('');
  const [checkOutString, setCheckOutString] = useState<string>('');
  const [checkInString, setCheckInString] = useState<string>('');
  const [disabledDays, setDisabledDays] = useState<DisabledDays[]>([]);
  const [checkInDates, setCheckInDates] = useState<DayRange>({
    from: null,
    to: null,
  });
  const [reservationObject, setReservationObject] = useState({});
  const [checkOutDate, setCheckOutDate] = useState<DayValue>(null);
  const currentDate = {
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    day: new Date().getDate(),
  };
  const [persons, setPersons] = useState<number>(1);
  const ref = useRef();

  const resetStates = () => {
    setName('');
    setEmail('');
    setPhoneNumber('');
    setOtherDetails('');
    setPersons(1);
    setCheckInString('');
    setCheckOutString('');
    setCheckInDates({ from: null, to: null });
  };
  const currentYear = new Date().getFullYear();
  const nextYear = currentYear + 1;

  const getDisabledDays = async () => {
    const allDates = await verifyDates();

    const nextYearDates = allDates.nextYearDates;
    const currentYearDates = allDates.currentYearDates;

    if (currentYearDates)
      for (let i = 1; i <= 12; i++) {
        currentYearDates[i]?.forEach((day: number) =>
          setDisabledDays((prevState) => {
            let temp = [...prevState];
            temp.push({ year: currentYear, month: i, day: day });
            return temp;
          }),
        );
      }

    if (nextYearDates)
      for (let i = 1; i <= 12; i++) {
        nextYearDates[i]?.forEach((day: number) =>
          setDisabledDays((prevState) => {
            let temp = [...prevState];
            temp.push({ year: nextYear, month: i, day: day });
            return temp;
          }),
        );
      }
  };
  const sendAnalyticsForNextPress = () => {
    ReactGA.event('Filled booking form', { user_name: name, user_email: email });
  };
  const sendAnalyticsForPayPress = () => {
    ReactGA.event('Pressed pay button');
  };
  const sendAnalyticsForPaymentSuccesfull = () => {
    ReactGA.event('Payment Succesfull');
  };
  const sendAnalyticsForClosePaymentConfirmation = () => {
    ReactGA.event('Payment Pop-up close');
  };
  const sendAnalyticsForPaymentFailed = () => {
    ReactGA.event('Payment Failed');
  };

  useEffect(() => {
    getDisabledDays();
    if (checkInDates.to !== null)
      ReactGA.event('Selected Dates', {
        item_name: `${checkInDates.from.day}.${checkInDates.from.month}-${checkInDates.to.day}.${checkInDates.to.month}`,
      });
  }, [checkInDates]);

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

  useEffect(() => {
    if(showBooking || showPersonal || showPayment || showPaymentField) {
    document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [showBooking, showPersonal, showPayment, showPaymentField])

  return (
    <>
      {showBooking && (
        <div className={styles.bookingComponent}>
          <BookingComponent
            setShowBooking={setShowBooking}
            sendAnalyticsForNext={sendAnalyticsForNextPress}
            checkInDates={checkInDates}
            checkOutDate={checkOutDate}
            setCheckInDates={setCheckInDates}
            setCheckOutDate={setCheckOutDate}
            persons={persons}
            setPersons={setPersons}
            setShowPersonal={setShowPersonal}
            name={name}
            setName={setName}
            email={email}
            setEmail={setEmail}
            phoneNumber={phoneNumber}
            setPhoneNumber={setPhoneNumber}
            otherDetails={otherDetails}
            setOtherDetails={setOtherDetails}
            checkOutString={checkOutString}
            setCheckOutString={setCheckOutString}
            checkInString={checkInString}
            setCheckInString={setCheckInString}
            setReservationObject={setReservationObject}
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
              className={styles.calendar}
            >
              <Calendar
                value={checkInDates}
                onChange={setCheckInDates}
                colorPrimary={'#CAA987'}
                colorPrimaryLight={'#F0EAE4'}
                minimumDate={currentDate}
                disabledDays={disabledDays}
              />
            </div>
          )}
        </div>
      )}
      {showPersonal && (
        <div className={styles.bookingComponent}>
          <PersonalDetails
            setShowPersonal={setShowPersonal}
            sendAnalyticsForPayPress={sendAnalyticsForPayPress}
            setShowBooking={setShowBooking}
            persons={persons}
            name={name}
            email={email}
            phoneNumber={phoneNumber}
            otherDetails={otherDetails}
            checkOutString={checkOutString}
            checkInString={checkInString}
            setOtherDetails={setOtherDetails}
            setShowPayment={setShowPaymentField}
            resetStates={resetStates}
          />
        </div>
      )}

      {showPayment && (
        <div className={styles.bookingComponent}>
          <PaymentSuccessful
            sendAnalyticsForClosePaymentConfirmation={sendAnalyticsForClosePaymentConfirmation}
            setShowPayment={setShowPayment}
          />
        </div>
      )}
      {showPaymentField && (
        <div className={styles.bookingComponent}>
          <PaymentComponent
            sendAnalyticsForPaymentFailed={sendAnalyticsForPaymentFailed}
            sendAnalyticsForPaymentSuccesfull={sendAnalyticsForPaymentSuccesfull}
            reservationObject={reservationObject}
            setShowPaymentField={setShowPaymentField}
            setShowPayment={setShowPayment}
          />
        </div>
      )}
      <div className={styles.bottomPanel}>
        <div className={styles.extenderWrapper}>
          <div
            className={styles.centerer}
            onMouseEnter={() => {
              setShowCheckInCalendar(true);
              setShowCheckOutCalendar(false);
            }}
          >
            <span className={styles.textCheck}>{strings.checkinComponent.checkIn}</span>
            <img className={styles.arrow} src={images.checkInComponent.arrowDown} />
            <div className={styles.rightStyle}></div>
            {showCheckInCalendar === true && (
              <div
                onMouseEnter={() => setShowCheckInCalendar(true)}
                onMouseLeave={() =>
                  setTimeout(() => {
                    setShowCheckInCalendar(false);
                  }, 300)
                }
                className={styles.calendar}
                ref={ref}
              >
                <Calendar
                  value={checkInDates}
                  onChange={setCheckInDates}
                  colorPrimary={'#CAA987'}
                  colorPrimaryLight={'#F0EAE4'}
                  disabledDays={disabledDays}
                  minimumDate={currentDate}
                />
              </div>
            )}
          </div>
          <div
            className={styles.centerer}
            onMouseEnter={() => {
              setShowCheckOutCalendar(true);
              setShowCheckInCalendar(false);
            }}
          >
            <span className={styles.textCheck}>{strings.checkinComponent.checkout}</span>
            <img className={styles.arrow} src={images.checkInComponent.arrowDown} />
            <div className={styles.rightStyle}></div>
            {showCheckOutCalendar === true && (
              <div
                onMouseEnter={() => setShowCheckOutCalendar(true)}
                onMouseLeave={() =>
                  setTimeout(() => {
                    setShowCheckOutCalendar(false);
                  }, 300)
                }
                className={styles.calendar}
                ref={ref}
              >
                <Calendar
                  value={checkInDates}
                  onChange={setCheckInDates}
                  colorPrimary={'#CAA987'}
                  colorPrimaryLight={'#F0EAE4'}
                  disabledDays={disabledDays}
                  minimumDate={currentDate}
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

        <button className={styles.bookAction} onClick={() => setShowBooking(true)}>
          <span className={styles.bookText}>{strings.checkinComponent.bookButton}</span>
        </button>
      </div>
    </>
  );
};

export default CheckinComponent;
