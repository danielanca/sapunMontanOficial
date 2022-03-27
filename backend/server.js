import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import nodemailer from 'nodemailer';
import path from 'path';
import {fileURLToPath} from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json());
// app.use('/static', express.static(path.join(__dirname, '../client/build//static')));
// app.get('*', function(req, res) {
//   res.sendFile('index.html', {root: path.join(__dirname, '../../client/build/')});
// });
// const router = express().Router();

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;
// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

app.use( function(res,req, next){
  res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  next();
});

app.post('/send_mail', (req,res) => {
    var list = ["Email was sent by DaniAnca.Ro"];
    res.json(list);
    console.log('Email SENT!');
    console.log("Received:");
    console.log(req.body);

    // var objectData = JSON.parse(req.body);
   
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
        subject: 'Ai comandat ceva, '+ req.body.orderData.firstName,
        html: ` 
        <html>
        <head>
          <style>
            .emailContainer{
              width: 100%;
              height: 600px;
              background-color: rgb(46, 147, 165);
            }
            .headTitle{
              display: table;
              margin: auto;
            }
            .headContain{
              padding-top: 50px;
              display: flex;
              justify-content: center;
              flex-direction: column;
              align-items: center;
              row-gap: 20px;
            }
            .middleContain {
              display: flex;
              justify-content: center;
              align-items: center;
              flex-direction: column;
              font-size: 10px;
            }
            </style>
        </head>
        <body>
          <div class="emailContainer">
        <div class="headContain">
            <h2 class="headTitle">{'Comanda a fost inregistrata'}</h2>
            <h3>{'Ne bucuram de comanda dvs. ` +req.body.orderData.firstName +` + '}</h3>
        </div>
        <div class="middleContain">
            <h3>{'Produsele comandate sunt:'}</h3>

            <h4>{'Cost total:' `+ req.body.orderData.cartSum  + `}</h4>
        </div>
    </div>
        </body>
    </html>
`,
      });

});

// Handles any requests that don't match the ones above
app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
});


const port = process.env.PORT || 5000;
app.listen(port);

console.log('App is listening on port ' + port);