const express = require('express');
const app = express();
require('dotenv').config();

const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());
NODE_TLS_REJECT_UNAUTHORIZED = '0';

const transport = nodemailer.createTransport({
  host: 'mail.danianca.ro',
  port: '465',
  auth: {
    user: 'contact@danianca.ro',
    pass: 'huhububucucu2',
  },
});
transport.sendMail({
  from: 'contact@danianca.ro',
  to: 'ancadaniel1994@gmail.com',
  subject: 'Test EmilutShop',
  html: ` <div> Va multumim ca ati cumparat de la EmilutShop </div>`,
});

app.post('/send_mail', cors(), async (req, res) => {
  let { text } = req.body;
  console.log('FIREEED');
  const transport = nodemailer.createTransport({
    host: 'mail.danianca.ro',
    port: '465',
    auth: {
      user: 'contact@danianca.ro',
      pass: 'huhububucucu2',
    },
  });

  await transport.sendMail({
    from: 'contact@danianca.ro',
    to: 'ancadaniel1994@gmail.com',
    subject: 'Test EmilutShop',
    html: ` <div> Va multumim ca ati cumparat de la EmilutShop </div>`,
  });
});

app.listen(
  (3000,
  () => {
    console.log('Server is listening on port 3000');
  }),
);
