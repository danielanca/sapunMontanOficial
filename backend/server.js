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

const administratorEmail = "steptu94@gmail.com";


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
        to: req.body.orderData.emailAddress,
        subject: "Comanda inregistrata, "+  req.body.orderData.firstName,
        html: ` <!doctype html>
        <html>
          <head>
            <meta name="viewport" content="width=device-width">
            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
            <title>Comanda inregistrata</title>
          <style>
        @media only screen and (max-width: 620px) {
          table[class=body] h1 {
            font-size: 28px !important;
            margin-bottom: 10px !important;
          }
        
          table[class=body] p,
        table[class=body] ul,
        table[class=body] ol,
        table[class=body] td,
        table[class=body] span,
        table[class=body] a {
            font-size: 16px !important;
          }
        
          table[class=body] .wrapper,
        table[class=body] .article {
            padding: 10px !important;
          }
        
          table[class=body] .content {
            padding: 0 !important;
          }
        
          table[class=body] .container {
            padding: 0 !important;
            width: 100% !important;
          }
        
          table[class=body] .main {
            border-left-width: 0 !important;
            border-radius: 0 !important;
            border-right-width: 0 !important;
          }
        
          table[class=body] .btn table {
            width: 100% !important;
          }
        
          table[class=body] .btn a {
            width: 100% !important;
          }
        
          table[class=body] .img-responsive {
            height: auto !important;
            max-width: 100% !important;
            width: auto !important;
          }
        }
        @media all {
          .ExternalClass {
            width: 100%;
          }
        
          .ExternalClass,
        .ExternalClass p,
        .ExternalClass span,
        .ExternalClass font,
        .ExternalClass td,
        .ExternalClass div {
            line-height: 100%;
          }
        
          .apple-link a {
            color: inherit !important;
            font-family: inherit !important;
            font-size: inherit !important;
            font-weight: inherit !important;
            line-height: inherit !important;
            text-decoration: none !important;
          }
        
          .btn-primary table td:hover {
            background-color: #d5075d !important;
          }
        
          .btn-primary a:hover {
            background-color: #d5075d !important;
            border-color: #d5075d !important;
          }
        }
        </style></head>
          <body class style="background-color: #eaebed; font-family: sans-serif; -webkit-font-smoothing: antialiased; font-size: 14px; line-height: 1.4; margin: 0; padding: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;">
            <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="body" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; background-color: #eaebed; width: 100%;" width="100%" bgcolor="#eaebed">
              <tr>
                <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;" valign="top">&nbsp;</td>
                <td class="container" style="font-family: sans-serif; font-size: 14px; vertical-align: top; display: block; max-width: 580px; padding: 10px; width: 580px; Margin: 0 auto;" width="580" valign="top">
                  <div class="header" style="padding: 20px 0;">
                    <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; width: 100%;" width="100%">
                      <tr>
                        <td class="align-center" style="font-family: sans-serif; font-size: 14px; vertical-align: top; text-align: center;" valign="top" align="center">
                          <a href="https://danianca.ro" style="color: #ec0867; text-decoration: underline;"><img src="https://i.imgur.com/YC0z5T5.png" height="90" alt="Postdrop" style="border: none; -ms-interpolation-mode: bicubic; max-width: 100%;"></a>
                        </td>
                      </tr>
                    </table>
                  </div>
                  <div class="content" style="box-sizing: border-box; display: block; Margin: 0 auto; max-width: 580px; padding: 10px;">
        
                    <!-- START CENTERED WHITE CONTAINER -->
                    <span class="preheader" style="color: transparent; display: none; height: 0; max-height: 0; max-width: 0; opacity: 0; overflow: hidden; mso-hide: all; visibility: hidden; width: 0;">Am inregistrat comanda dvs.</span>
                    <table role="presentation" class="main" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; background: #ffffff; border-radius: 3px; width: 100%;" width="100%">
        
                      <!-- START MAIN CONTENT AREA -->
                      <tr>
                        <td class="wrapper" style="font-family: sans-serif; font-size: 14px; vertical-align: top; box-sizing: border-box; padding: 20px;" valign="top">
                          <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; width: 100%;" width="100%">
                            <tr>
                              <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;" valign="top">
                                <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; margin-bottom: 15px;">Buna, `+ req.body.orderData.firstName + `</p>
                                <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; margin-bottom: 15px;">Nu voiam sa te deranjam, doar sa-ti spunem ca am inregistrat comanda ce ai <br>facut-o pe DaniAnca.Ro</p>
                                <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="btn btn-primary" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; box-sizing: border-box; min-width: 100%; width: 100%;" width="100%">
                                  <tbody>
                                    <tr>
                                      <td align="center" style="font-family: sans-serif; font-size: 14px; vertical-align: top; padding-bottom: 15px;" valign="top">
                                        <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: auto; width: auto;">
                                          <tbody>
                                            <tr>
                                              <td style="font-family: sans-serif; font-size: 14px; vertical-align: top; border-radius: 5px; text-align: center; background-color: #e7e7e7;" valign="top" align="center" bgcolor="#e7e7e7"> <a href="https://danianca.ro" target="_blank" style="border: solid 1px #df94b3; border-radius: 5px; box-sizing: border-box; cursor: pointer; display: inline-block; font-size: 14px; font-weight: bold; margin: 0; padding: 12px 25px; text-decoration: none; text-transform: capitalize; background-color: #181818; border-color: #ffffff; color: #ffffff;">Anuleaza comanda</a> </td>
                                            </tr>
                                          </tbody>
                                        </table>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                                <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; margin-bottom: 15px;">Te vom contacta telefonic in scurt timp pentru a confirma detaliile comenzii.</p>
                                <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; margin-bottom: 15px;">Lista de produse se afla mai sus.</p>
        
                                 <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; margin-bottom: 15px;">Ganduri bune,</p>
                                  <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; margin-bottom: 15px;">echipa DaniAnca.Ro</p>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
        
                    <!-- END MAIN CONTENT AREA -->
                    </table>
        
                    <!-- START FOOTER -->
                    <div class="footer" style="clear: both; Margin-top: 10px; text-align: center; width: 100%;">
                      <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; width: 100%;" width="100%">
                        <tr>
                          <td class="content-block" style="font-family: sans-serif; vertical-align: top; padding-bottom: 10px; padding-top: 10px; color: #9a9ea6; font-size: 12px; text-align: center;" valign="top" align="center">
                            <span class="apple-link" style="color: #9a9ea6; font-size: 12px; text-align: center;">Strada Camatarilor, Armata Rosie, Turda, Cluj</span>
                            <br> Nu doresti sa primesti emailuri? <a href="https://danianca.ro" style="text-decoration: underline; color: #9a9ea6; font-size: 12px; text-align: center;">Dezabonare</a>.
                          </td>
                        </tr>
                        <tr>
                          <td class="content-block powered-by" style="font-family: sans-serif; vertical-align: top; padding-bottom: 10px; padding-top: 10px; color: #9a9ea6; font-size: 12px; text-align: center;" valign="top" align="center">
                            Dezvoltat de  <a href="https://danianca.ro" style="color: #9a9ea6; font-size: 12px; text-align: center; text-decoration: none;">DaniAnca.Ro</a>.
                          </td>
                        </tr>
                      </table>
                    </div>
                    <!-- END FOOTER -->
        
                  <!-- END CENTERED WHITE CONTAINER -->
                  </div>
                </td>
                <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;" valign="top">&nbsp;</td>
              </tr>
            </table>
          </body>
        </html>`
      })

       transport.sendMail({
        from: 'contact@danianca.ro',
        to: administratorEmail,
        subject: 'Comanda de la  '+ req.body.orderData.firstName,
        html: ` 
        <!doctype html>
<html>
  <head>
    <meta name="viewport" content="width=device-width">
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>Comanda inregistrata</title>
  <style>
@media only screen and (max-width: 620px) {
  table[class=body] h1 {
    font-size: 28px !important;
    margin-bottom: 10px !important;
  }

  table[class=body] p,
table[class=body] ul,
table[class=body] ol,
table[class=body] td,
table[class=body] span,
table[class=body] a {
    font-size: 16px !important;
  }

  table[class=body] .wrapper,
table[class=body] .article {
    padding: 10px !important;
  }

  table[class=body] .content {
    padding: 0 !important;
  }

  table[class=body] .container {
    padding: 0 !important;
    width: 100% !important;
  }

  table[class=body] .main {
    border-left-width: 0 !important;
    border-radius: 0 !important;
    border-right-width: 0 !important;
  }

  table[class=body] .btn table {
    width: 100% !important;
  }

  table[class=body] .btn a {
    width: 100% !important;
  }

  table[class=body] .img-responsive {
    height: auto !important;
    max-width: 100% !important;
    width: auto !important;
  }
}
@media all {
  .ExternalClass {
    width: 100%;
  }

  .ExternalClass,
.ExternalClass p,
.ExternalClass span,
.ExternalClass font,
.ExternalClass td,
.ExternalClass div {
    line-height: 100%;
  }

  .apple-link a {
    color: inherit !important;
    font-family: inherit !important;
    font-size: inherit !important;
    font-weight: inherit !important;
    line-height: inherit !important;
    text-decoration: none !important;
  }

  .btn-primary table td:hover {
    background-color: #d5075d !important;
  }

  .btn-primary a:hover {
    background-color: #d5075d !important;
    border-color: #d5075d !important;
  }
}
</style></head>
  <body class style="background-color: #eaebed; font-family: sans-serif; -webkit-font-smoothing: antialiased; font-size: 14px; line-height: 1.4; margin: 0; padding: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;">
    <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="body" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; background-color: #eaebed; width: 100%;" width="100%" bgcolor="#eaebed">
      <tr>
        <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;" valign="top">&nbsp;</td>
        <td class="container" style="font-family: sans-serif; font-size: 14px; vertical-align: top; display: block; max-width: 580px; padding: 10px; width: 580px; Margin: 0 auto;" width="580" valign="top">
          <div class="header" style="padding: 20px 0;">
            <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; width: 100%;" width="100%">
              <tr>
                <td class="align-center" style="font-family: sans-serif; font-size: 14px; vertical-align: top; text-align: center;" valign="top" align="center">
                  <a href="https://danianca.ro" style="color: #ec0867; text-decoration: underline;"><img src="https://i.imgur.com/YC0z5T5.png" height="90" alt="Postdrop" style="border: none; -ms-interpolation-mode: bicubic; max-width: 100%;"></a>
                </td>
              </tr>
            </table>
          </div>
          <div class="content" style="box-sizing: border-box; display: block; Margin: 0 auto; max-width: 580px; padding: 10px;">

            <!-- START CENTERED WHITE CONTAINER -->
            <span class="preheader" style="color: transparent; display: none; height: 0; max-height: 0; max-width: 0; opacity: 0; overflow: hidden; mso-hide: all; visibility: hidden; width: 0;">Am inregistrat comanda dvs.</span>
            <table role="presentation" class="main" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; background: #ffffff; border-radius: 3px; width: 100%;" width="100%">

              <!-- START MAIN CONTENT AREA -->
              <tr>
                <td class="wrapper" style="font-family: sans-serif; font-size: 14px; vertical-align: top; box-sizing: border-box; padding: 20px;" valign="top">
                  <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; width: 100%;" width="100%">
                    <tr>
                      <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;" valign="top">
                        <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; margin-bottom: 15px;">Avem o noua comanda. Este de la  `+ req.body.orderData.firstName + ` ` + req.body.orderData.lastName +  `</p>
                        <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; margin-bottom: 15px;">DATE CLIENT: Adresa de Livrare: ` + req.body.orderData.city +`/ jud.` + req.body.orderData.county + ` </p>
                        <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; margin-bottom: 15px;"> Subtotal: `+ req.body.orderData.cartSum +`  </p>
                        <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="btn btn-primary" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; box-sizing: border-box; min-width: 100%; width: 100%;" width="100%">
                          <tbody>
                            <tr>
                              <td align="center" style="font-family: sans-serif; font-size: 14px; vertical-align: top; padding-bottom: 15px;" valign="top">
                                <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: auto; width: auto;">
                                  <tbody>
                                    <tr>
                                      <td style="font-family: sans-serif; font-size: 14px; vertical-align: top; border-radius: 5px; text-align: center; background-color: #e7e7e7;" valign="top" align="center" bgcolor="#e7e7e7"> <a href="https://danianca.ro" target="_blank" style="border: solid 1px #df94b3; border-radius: 5px; box-sizing: border-box; cursor: pointer; display: inline-block; font-size: 14px; font-weight: bold; margin: 0; padding: 12px 25px; text-decoration: none; text-transform: capitalize; background-color: #181818; border-color: #ffffff; color: #ffffff;">Anuleaza comanda</a> </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; margin-bottom: 15px;">Te vom contacta telefonic in scurt timp pentru a confirma detaliile comenzii.</p>
                        <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; margin-bottom: 15px;">Lista de produse se afla mai sus.</p>

                         <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; margin-bottom: 15px;">Ganduri bune,</p>
                          <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; margin-bottom: 15px;">echipa DaniAnca.Ro</p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

            <!-- END MAIN CONTENT AREA -->
            </table>

            <!-- START FOOTER -->
            <div class="footer" style="clear: both; Margin-top: 10px; text-align: center; width: 100%;">
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; width: 100%;" width="100%">
                <tr>
                  <td class="content-block" style="font-family: sans-serif; vertical-align: top; padding-bottom: 10px; padding-top: 10px; color: #9a9ea6; font-size: 12px; text-align: center;" valign="top" align="center">
                    <span class="apple-link" style="color: #9a9ea6; font-size: 12px; text-align: center;">Strada Camatarilor, Armata Rosie, Turda, Cluj</span>
                    <br> Nu doresti sa primesti emailuri? <a href="https://danianca.ro" style="text-decoration: underline; color: #9a9ea6; font-size: 12px; text-align: center;">Dezabonare</a>.
                  </td>
                </tr>
                <tr>
                  <td class="content-block powered-by" style="font-family: sans-serif; vertical-align: top; padding-bottom: 10px; padding-top: 10px; color: #9a9ea6; font-size: 12px; text-align: center;" valign="top" align="center">
                    Dezvoltat de  <a href="https://danianca.ro" style="color: #9a9ea6; font-size: 12px; text-align: center; text-decoration: none;">DaniAnca.Ro</a>.
                  </td>
                </tr>
              </table>
            </div>
            <!-- END FOOTER -->

          <!-- END CENTERED WHITE CONTAINER -->
          </div>
        </td>
        <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;" valign="top">&nbsp;</td>
      </tr>
    </table>
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