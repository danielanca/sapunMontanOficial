import { collection, addDoc, getFirestore, getDocs, getDoc, doc, setDoc, updateDoc } from 'firebase/firestore';
import moment, { months } from 'moment';
import { DayRange } from 'react-modern-calendar-datepicker';
import app from '../firebase';
import _ from 'lodash';

const base = getFirestore(app);
export function getDates(startDate, stopDate) {
  const dateArray = [];
  let currentDate = moment(startDate);
  var stopDate1 = moment(stopDate);
  while (currentDate <= stopDate1) {
    dateArray.push(moment(currentDate).format('YYYY-MM-DD'));
    currentDate = moment(currentDate).add(1, 'days');
  }
  return dateArray;
}
export const verifyDates = async () => {
  const currentYear = new Date().getFullYear();
  const nextYear = currentYear + 1;
  const currentYearDatesArray = [];
  const nextYearDatesArray = [];
  const currentYearArray = doc(base, 'reservationDates', currentYear.toString());
  const nextYearArray = doc(base, 'reservationDates', nextYear.toString());

  const currentYearData = await getDoc(currentYearArray);
  const nextYearData = await getDoc(nextYearArray);
  const currentYearDates = currentYearData.data();
  const nextYearDates = nextYearData.data();
  for (let i = 1; i <= 12; i++) {
    if (currentYearDates[i])
      currentYearDates[i].forEach((element) => {
        const mounth = i <= 9 ? '0' + i : i;
        const day = element <= 9 ? '0' + element : element;
        currentYearDatesArray.push(currentYear + '-' + mounth + '-' + day);
      });
    if (nextYearDates[i])
      nextYearDates[i].forEach((element) => {
        const mounth = i <= 9 ? '0' + i : i;
        const day = element <= 9 ? '0' + element : element;
        nextYearDatesArray.push(nextYear + '-' + mounth + '-' + day);
      });
  }
  return { currentYearDates, nextYearDates, currentYearDatesArray, nextYearDatesArray };
};

export const reserveDate = async (name: string, email: string, phoneNumber: string, details: string, checkInDates: DayRange) => {
  const startDate = checkInDates.from?.year + '-' + checkInDates.from?.month + '-' + checkInDates.from?.day;
  const endDate = checkInDates.to?.year + '-' + checkInDates.to?.month + '-' + checkInDates.to?.day;
  const diffInMs = new Date(endDate).valueOf() - new Date(startDate).valueOf();
  const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
  let makeReservation: boolean = false;
  const getDatesBetweenDates = (startDate: string | Date, endDate: string | Date) => {
    let dates: any = [];
    const theDate = new Date(startDate);
    while (theDate < endDate) {
      dates = [...dates, new Date(theDate)];
      theDate.setDate(theDate.getDate() + 1);
    }
    dates = [...dates, endDate];
    return dates;
  };

  const daysDateArray = getDatesBetweenDates(new Date(startDate), new Date(endDate));

  const datesArray: string[] = [];

  daysDateArray.forEach((item: Date) => datesArray.push(item.getFullYear() + ' ' + (item.getMonth() + 1) + ' ' + item.getDate()));

  let datesByYear = _.groupBy(datesArray, (item) => item.split(' ')[0]);
  let datesByMonth: any = {};
  Object.keys(datesByYear).map((key) => (datesByMonth[key] = _.groupBy(datesByYear[key], (doc) => doc.split(' ')[1])));

  Object.keys(datesByMonth).map(async (key) => {
    Object.keys(datesByMonth[key]).map((subkey) => {
      const days = datesByMonth[key][subkey].map((item: string) => parseInt(item.split(' ')[2]));
      datesByMonth[key][subkey] = days;
    });
    const year = key;
    const dates = await getDoc(doc(base, 'reservationDates', year));
    const datesData = dates.data();

    function arrayUnique(array: string[]) {
      var a = array.concat();
      for (var i = 0; i < a.length; ++i) {
        for (var j = i + 1; j < a.length; ++j) {
          if (a[i] === a[j]) a.splice(j--, 1);
        }
      }
      return a;
    }
    const mergedDates = _.mergeWith(dates.data(), datesByMonth[year], (a, b) => {
      if (a && b) return arrayUnique(a.concat(b));
      else if (a) return a;
      else return b;
    });

    const verifyDatas = () => {
      if (datesData)
        for (let i = 1; i <= 12; i++)
          if (datesData[i] && datesByMonth[year][i]) {
            if (datesData[i].some((day: number) => datesByMonth[year][i].includes(day))) return false;
          }
      return true;
    };
    if (verifyDatas()) {
      await updateDoc(doc(base, 'reservationDates', year), mergedDates);
      await setDoc(doc(base, 'reservations', name + ' - ' + startDate), {
        fullName: name,
        email: email,
        phoneNumber: phoneNumber,
        details: details,
        checkInDates: startDate + ' - ' + endDate,
        reservationDays: diffInDays,
      });
    } else {
      alert('At least one of your choosen days is already reserved. Please refresh and try again!');
    }
  });
};

export const manualReserveDate = async (checkInDates: DayRange) => {
  const startDate = checkInDates.from?.year + '-' + checkInDates.from?.month + '-' + checkInDates.from?.day;
  const endDate = checkInDates.to?.year + '-' + checkInDates.to?.month + '-' + checkInDates.to?.day;

  const getDatesBetweenDates = (startDate: any, endDate: any) => {
    let dates: any = [];
    const theDate = new Date(startDate);
    while (theDate < endDate) {
      dates = [...dates, new Date(theDate)];
      theDate.setDate(theDate.getDate() + 1);
    }
    dates = [...dates, endDate];
    return dates;
  };

  const daysDateArray = getDatesBetweenDates(new Date(startDate), new Date(endDate));

  const datesArray: string[] = [];

  daysDateArray.forEach((item: Date) => datesArray.push(item.getFullYear() + ' ' + (item.getMonth() + 1) + ' ' + item.getDate()));

  let datesByYear = _.groupBy(datesArray, (item) => item.split(' ')[0]);
  let datesByMonth: any = {};
  Object.keys(datesByYear).map((key) => (datesByMonth[key] = _.groupBy(datesByYear[key], (doc) => doc.split(' ')[1])));

  Object.keys(datesByMonth).map(async (key) => {
    Object.keys(datesByMonth[key]).map((subkey) => {
      const days = datesByMonth[key][subkey].map((item: string) => parseInt(item.split(' ')[2]));
      datesByMonth[key][subkey] = days;
    });
    const year = key;
    const dates = await getDoc(doc(base, 'reservationDates', year));
    const datesData = dates.data();

    function arrayUnique(array: string[]) {
      var a = array.concat();
      for (var i = 0; i < a.length; ++i) {
        for (var j = i + 1; j < a.length; ++j) {
          if (a[i] === a[j]) a.splice(j--, 1);
        }
      }
      return a;
    }
    const mergedDates = _.mergeWith(dates.data(), datesByMonth[year], (a, b) => {
      if (a && b) return arrayUnique(a.concat(b));
      else if (a) return a;
      else return b;
    });

    const verifyDatas = () => {
      if (datesData)
        for (let i = 1; i <= 12; i++)
          if (datesData[i] && datesByMonth[year][i]) {
            if (datesData[i].some((day: number) => datesByMonth[year][i].includes(day))) return false;
          }
      return true;
    };
    if (verifyDatas()) {
      await updateDoc(doc(base, 'reservationDates', year), mergedDates);
    } else {
      alert('At least one of your choosen days is already reserved. Please refresh and try again!');
    }
  });
};

export const manualDeleteDate = async (checkInDates: DayRange) => {
  const startDate = checkInDates.from?.year + '-' + checkInDates.from?.month + '-' + checkInDates.from?.day;
  const endDate = checkInDates.to?.year + '-' + checkInDates.to?.month + '-' + checkInDates.to?.day;

  const getDatesBetweenDates = (startDate: any, endDate: any) => {
    let dates: any = [];
    const theDate = new Date(startDate);
    while (theDate < endDate) {
      dates = [...dates, new Date(theDate)];
      theDate.setDate(theDate.getDate() + 1);
    }
    dates = [...dates, endDate];
    return dates;
  };

  const daysDateArray = getDatesBetweenDates(new Date(startDate), new Date(endDate));

  const datesArray: string[] = [];

  daysDateArray.forEach((item: Date) => datesArray.push(item.getFullYear() + ' ' + (item.getMonth() + 1) + ' ' + item.getDate()));

  let datesByYear = _.groupBy(datesArray, (item) => item.split(' ')[0]);
  let datesByMonth: any = {};
  Object.keys(datesByYear).map((key) => (datesByMonth[key] = _.groupBy(datesByYear[key], (doc) => doc.split(' ')[1])));

  Object.keys(datesByMonth).map(async (key) => {
    Object.keys(datesByMonth[key]).map((subkey) => {
      const days = datesByMonth[key][subkey].map((item: string) => parseInt(item.split(' ')[2]));
      datesByMonth[key][subkey] = days;
    });
    const year = key;
    const dates = await getDoc(doc(base, 'reservationDates', year));
    const datesData = dates.data();

    let deletedDates: number[] = [];

    for (let i = 1; i <= 12; i++) {
      const tempDeletedDates: number[] = [];
      if (datesData && datesByMonth[year][i]) {
        datesData[i].map((item: number) => (!datesByMonth[year][i].includes(item) ? tempDeletedDates.push(item) : null));
      }
      deletedDates = tempDeletedDates;
      await updateDoc(doc(base, 'reservationDates', year), { [i]: deletedDates });
    }
  });
};

export const addEmailToList = async (email: string) => {
  await setDoc(doc(base, 'emailsForNewsLetter', email), { email });
};
