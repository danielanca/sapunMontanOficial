export const sendReservationMail = async (
  name: string,
  email: string,
  phone: string,
  details: string,
  dates: string,
  persons: number,
) => {
  return await fetch('https://us-central1-oasisresidenceweb-b7f37.cloudfunctions.net/sendEmail', {
    method: 'POST',
    mode: 'no-cors',
    body: JSON.stringify({ email: email, name: name, phone: phone, details: details, dates: dates, persons: persons }),
  })
    .then((res) => res)
    .catch((error) => error);
};

export const sendEmailToOasis = async (name: string, email: string, message: string) => {
  return await fetch('https://us-central1-oasisresidenceweb-b7f37.cloudfunctions.net/sendEmailToOasis', {
    method: 'POST',
    mode: 'no-cors',
    body: JSON.stringify({ name: name, email: email, message: message }),
  })
    .then(() => true)
    .catch(() => false);
};
