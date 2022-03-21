import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
/* eslint-disable */
const nodemailer = require('nodemailer');
admin.initializeApp({
  credential: admin.credential.applicationDefault(),
});

const stripe = require('stripe')(
  'sk_test_51K8kipF6DC0ZD14MOKdxgGhtFFtugCKfjSkzFQPseXthbvJbHvjSe7rMc4NP5y0zqP4aTvG6YohFOPo25RDkhgTW002CbdBy3c',
);
const calculateAmount = async (numberOfDays: number) => {
  const priceRef = await admin.firestore().collection('price').doc('price').get();
  const priceObject = priceRef.data();
  const pricePerNight = priceObject?.currentPrice - priceObject?.currentPrice * priceObject?.discountPercentage * 0.01;
  return numberOfDays * pricePerNight * 100;
};
export const createPayment = functions.https.onRequest(async (req, res) => {
  const body = JSON.parse(req.body);
  const paymentIntent = await stripe.paymentIntents.create({
    amount: await calculateAmount(body.numberOfDays),
    currency: 'ron',
    payment_method_types: ['card'],
  });
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');

  if (req.method === 'OPTIONS') {
    res.status(204).send('');
    return;
  }
  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'winzekyi@gmail.com',
    pass: 'ckcpwpqimlrqwhfo',
  },
});

export const sendEmail = functions.https.onRequest(async (req, res) => {
  const data = JSON.parse(req.body);
  const mailOptions = {
    from: 'Oasis Residence',
    to: `${data.email}`,
    subject: 'Your reservation',
    html: `  <html>
    <head>
      <style>
        div.img {
          margin-left: 265px;
        }
        div.container{
          width: 880px;
          height: 800px;
          border-width: 1px;
          border: solid;
          border-color: #caa987;
          border-radius: 10px;
          background-color: rgb(255,255,255);
        }
        div.header1 {
          margin-left: 210px;
          font-size: 35px;
          color: #5c534c;
          font-family: 'SallenasGrande Regular' !important;
        }
        div.header2 {
          margin-left: 290px;
          font-size: 25px;
          color: #5c534c;
          font-family: 'SallenasGrande Regular' !important;
          margin-top: 10px;
        }
        div.dates {
          width: 628px;
          height: 220px;
          border-width: 1px;
          border: solid;
          border-color: #caa987;
          margin-top: 10px;
          margin-left: 126px;
          margin-right: 126px;
        }
        div.apartmentImages {
            margin-left: 153px;
        }
        div.contact {
            margin-left: 285px;
        }
        div.enquiries {
            font-size: 18px;
        }
        div.phone{
          color: #5C534C;
          font-size: 16px;
          margin-top: 5px;
          margin-left: 100px;
        }
        div.email{
          color: #5C534C;
          font-size: 16px;
          margin-left: 60px;
        }
        h2 {
         margin-left: 426px;
        }
        p {
          font-size: 16px;
          font-family: 'Montserrat';
          margin-left: 10px;
          margin-top: 20px;
        }
        div.adress {
          text-align: center;
          display: block;
          margin-left: auto;
          margin-right: auto;
          font-size: 16px;
          color:#5C534C;
        }
        body {
            width: 1000px;
            height: 1200px;
            background-color: rgb(255,255,255);
        }
      </style>
    </head>
    <body>
        <div class="container">
      <div class="img">
        <img src="https://i.postimg.cc/hGt7BQW1/Group-33.png" , alt="LOGO" />
      </div>
      <div class="header1">Your reservation is confirmed!</div>
      <div class="header2">You are going to Baia Mare!</div>
      <div class="dates">
        <p>Name: ${data.name} </p>
        <p>Email: ${data.email}</p>
        <p>Phone: ${data.phone}</p>
        <p>Other Details: ${data.details}</p>
        <p>${data.dates}, ${data.persons} persons</p>
      </div>
      <h2>
        <img src="https://i.postimg.cc/TYK3x8PF/Icon-feather-map-pin.png" , alt="PIN" />
      </h2> 
  
      <div class="adress">Str. Victoriei, Nr. 10, Ap. 10, Sc. B, Et. 1, Baia Mare</div>
      <div class="apartmentImages">
          <img src="https://i.postimg.cc/FR1CM2vg/CRS-7095-HDR.png">
          <img src="https://i.postimg.cc/SN5SHhpV/CRS-7113-HDR.png">
          <img src="https://i.postimg.cc/TwHFhT04/Mask-Group-3.png">
          <img src="https://i.postimg.cc/0QNh8zYS/Mask-Group-2.png">
          <img src="https://i.postimg.cc/QC2zkSRg/Mask-Group-4.png">
      </div>
      <div class="contact">
      <div class="enquiries">
          If you have any enquiries please contact us:
      </div>
      <div class="phone">
          + 40 747 057 615
      </div>
      <div class="email">
          contact@oasisresidence.co
      </div>
      </div>
  </div>
    </body>
  </html>`,
  };
  transporter.sendMail(mailOptions, (err: any, info: any) => {
    if (err) {
      return res.send(err.toString());
    } else return res.send('200');
  });
  res.send('200');
});

export const sendEmailToOasis = functions.https.onRequest(async (req, res) => {
  const data = JSON.parse(req.body);
  const mailOptions = {
    from: `${data.name}`,
    to: 'andreipop02@yahoo.com',
    subject: `Message from ${data.name}`,
    html: `<html>
    <body> 
    <div>Name: ${data.name}</div>
    <div>Email: ${data.email}</div>
    <div>Message: ${data.message}</div>
    </body>
    </html>`,
  };
  transporter.sendMail(mailOptions, (err: any, info: any) => {
    if (err) {
      return res.send(err.toString());
    } else return res.send('200');
  });
  res.send('200');
});
