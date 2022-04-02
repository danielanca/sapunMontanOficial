import axios from 'axios';

import images from './../../data/images';
import { addDoc, collection, getFirestore } from 'firebase/firestore';
import app from './../../firebase';
import productList from './../../data/productList';
import { componentStrings } from '../../data/componentStrings';
import { useState, useEffect } from 'react';

import styles from './../CartPage/FinishOrder.module.scss';

interface orderProps {
  firstName: string;
  lastName: string;
  deliveryAddress: string;
  city: string;
  county: string;
  phoneNo?: string;
  emailAddress?: string;
  orderNotes?: string;
  cartProducts: string;
  cartSum?: number;
  shippingTax?: number;
  paymentMethod: string;
  orderDateTimeStamp?: {
    day: number;
    month: number;
    year: number;
  };
}
interface ErrorProps {
  paymentSelected: boolean;
  termsNotAccepted: boolean;
  inputNotCompleted: boolean;
}

const FinishOrder = () => {
  const [sent, setSent] = useState(false);
  
  const handleSend = async () => {
    setSent(true);
    console.log('FRONT-END set sent TRUE');
 
    try {
      await axios.post('http://localhost:5000/send_mail', { orderData }, {headers:{
        'Content-Type': 'application/json',
      }}).then((res) => {
        console.log('REZULTAT:' + res);
      });
    } catch (error) {
      console.log(error);
    }
  };
  const [orderData, setorderData] = useState<orderProps>({
    firstName: '',
    lastName: '',
    emailAddress:'',
    deliveryAddress: '',
    city: '',
    county: '',
    paymentMethod: '',
    cartProducts: '',
    cartSum: subtotalPrepare,
    shippingTax: deliveryFee,
  });
  const db = getFirestore(app);
  const [checkBoxTerms, setCheckBoxTerms] = useState(false);
  const [completionState, setError] = useState<ErrorProps>({
    paymentSelected: false,
    termsNotAccepted: false,
    inputNotCompleted: false,
  });

  const sendOrderData = () => {
    if (checkBoxTerms !== true) {
    }
    console.log('Data prepared to be sent!');
    console.log(orderData);
    addDoc(collection(db, 'orders'), {
      orders: { orderData },
    });
    handleSend();
  };

  var storedCart = [];
  var subtotalPrepare = 0;
  var deliveryFee = 15;
  let expectedData = localStorage.getItem('cartData');
  if (expectedData != null) {
    storedCart = JSON.parse(expectedData);
    console.log('We have');
    console.log(storedCart);

    storedCart.map((item) => {
      console.log('finish order' + Number(productList[item.id].price));
      console.log('finish order:' + Number(item.itemNumber));
      console.log('finish order' + storedCart.length);
      console.log('Index ' + subtotalPrepare);
      subtotalPrepare += Number(productList[item.id].price) * Number(item.itemNumber);
    });
  }
  const termAcceptHandler = () => {
    setCheckBoxTerms(!checkBoxTerms);
  };

  useEffect(() => {
    setorderData({
      ...orderData,
      cartSum: subtotalPrepare,
      shippingTax: deliveryFee,
      orderDateTimeStamp: {
        day: new Date().getDay(),
        month: new Date().getMonth(),
        year: new Date().getFullYear(),
      },
      cartProducts: expectedData,
    });
  }, [subtotalPrepare]);

  return (
    <div className={styles.FinishSection}>
      <div className={styles.topTitle}>
        <div className={styles.cartLine} />
        <h3 className={styles.finishOrderTitle}>{'Finalizeaza comanda'}</h3>
        <div className={styles.cartLine} />
      </div>
      <div className={'row ' + styles.finishOrderContainer}>
        <div className={'col-6  col-sm-12 ' + styles.leftContainer}>
          <div>
            <h3 className={styles.topBillText}>{'Detalii pentru facturare'}</h3>
          </div>
          <div className={styles.groupInput}>
            <div className={styles.inputBox}>
              <label>
                {'Nume'}
                <span className={styles.alertAsterisk}>{'*'}</span>
              </label>

              <input
                onChange={(event) => {
                  setorderData({ ...orderData, firstName: event.target.value });
                }}
                value={orderData.firstName}
                name="firstname"
                type={'large'}
              ></input>
            </div>
            <div className={styles.inputBox}>
              <label>
                {'Prenume'}
                <span className={styles.alertAsterisk}>{'*'}</span>
              </label>
              <input
                name="lastname"
                type={'large'}
                onChange={(event) => {
                  setorderData({ ...orderData, lastName: event.target.value });
                }}
                value={orderData.lastName}
              ></input>
            </div>
          </div>
          <div className={styles.groupInput}>
            <div className={styles.inputBox}>
              <label>
                {'Strada'}
                <span className={styles.alertAsterisk}>{'*'}</span>
              </label>
              <input
                type={'large'}
                onChange={(event) => {
                  setorderData({ ...orderData, deliveryAddress: event.target.value });
                }}
                value={orderData.deliveryAddress}
              ></input>
            </div>
          </div>
          <div className={styles.groupInput}>
            <div className={styles.inputBox}>
              <label>
                {'Oras'}
                <span className={styles.alertAsterisk}>{'*'}</span>
              </label>
              <input
                type={'large'}
                onChange={(event) => {
                  setorderData({ ...orderData, city: event.target.value });
                }}
                value={orderData.city}
              ></input>
            </div>
          </div>
          <div className={styles.groupInput}>
            <div className={styles.inputBox}>
              <label>
                {'Judet'}
                <span className={styles.alertAsterisk}>{'*'}</span>
              </label>
              <input
                list={'county'}
                type={'large'}
                onChange={(event) => {
                  setorderData({ ...orderData, county: event.target.value });
                }}
                value={orderData.county}
              ></input>
              <datalist id="county">
                {Object.values(componentStrings.FinishOrder.countyList).map((item) => (
                  <option value={item} />
                ))}
              </datalist>
            </div>
          </div>
          <div className={styles.groupInput}>
            <div className={styles.inputBox}>
              <label>
                {'Telefon'}
                <span className={styles.alertAsterisk}>{'*'}</span>
              </label>
              <input type={'large'}></input>
            </div>
          </div>
          <div className={styles.groupInput}>
            <div className={styles.inputBox}>
              <label>{'Adresa de Email:'}</label>
              <input
                type={'large'}
                onChange={(event) => {
                  setorderData({ ...orderData, emailAddress: event.target.value });
                }}
                value={orderData.emailAddress}
              ></input>
            </div>
          </div>
          <div className={styles.groupInput}>
            {/* <div className={styles.checkBoxStyle}>
              <input name="alternativeShipping" type={'checkbox'}></input>
              <label htmlFor="alternativeShipping" className={styles.deliverOption}>
                {'Livrare la altă adresa?'}
              </label>
            </div> */}
          </div>
          <div className={styles.groupInput}>
            <div className={styles.inputBox}>
              <label className={styles.optionalNote}>{'Note comandă [opțional]'}</label>
              <textarea
                rows={2}
                onChange={(event) => {
                  setorderData({ ...orderData, orderNotes: event.target.value });
                }}
                value={orderData.orderNotes}
              ></textarea>
            </div>
          </div>
        </div>
        <div className={'col-6 col-sm-12 ' + styles.rightContainer}>
          <div className={styles.rightChild}>
            <div className={styles.legendsTable}>
              <span>{'Produs'}</span>
              <span>{'Subtotal'}</span>
            </div>
            <ul className={styles.itemUl}>
              {storedCart.map((item) => (
                <li className={styles.itemLi}>
                  <span className={styles.productSummarizeTitle}>{productList[item.id].title}</span>
                  <span className={styles.count}>{Number(item.itemNumber) + ' x'}</span>
                  <span className={styles.price}>{Number(productList[item.id].price)}</span>
                </li>
              ))}
            </ul>
            <span className={styles.subTotal}>{' Subtotal: RON  ' + subtotalPrepare}</span>
            <span className={styles.subTotal}>{' Transport: RON  ' + deliveryFee}</span>
            <span className={styles.subTotal}>{' - - - - - - - - -  - - - -'}</span>
            <span className={styles.subTotal}>{' Total:  RON ' + (Number(subtotalPrepare) + Number(deliveryFee))}</span>
            <span className={styles.VATincluded}>{'TVA Inclus'}</span>
          </div>
          <div>
            <span className={styles.deliveryInfo}>{'Livrarea produselor se va face in 24-48 ore'}</span>
            <img className={styles.carShip} src={images.deliveryCar} />
          </div>
          <div>
            <div className={styles.deliveryCheckbox}>
              <span className={styles.paymentDetails}>{'MODALITATE DE PLATA'}</span>
              {/* <div className={styles.checkboxer}>
                <input id="cardcheck" type="radio" name="radio" value="1" />
                <label htmlFor="cardcheck">Plata prin Card</label>
              </div> */}
              <div className={styles.checkboxer}>
                <input id="delivercheck" type="radio" name="radio" value="1" />
                <label htmlFor="delivercheck">Plata Ramburs</label>
              </div>
            </div>
          </div>
        </div>
        <div className={'col-12 ' + styles.paymentShipContainer}>
          <div className={styles.paymentContainer}>
            <p className={styles.GDPRNotify}>
              {
                'Datele dumneavoastre personale vor fi folosite pentru a vă procesa comanda, pentru a vă susține experiența pe tot acest site web și pentru alte scopuri descrise în '
              }
              <a className={styles.extensiveGdpr}>{'politica de confidentialitate'}</a>
            </p>

            <div className={styles.groupInputTerms}>
              <div className={styles.checkBoxStyle}>
                <input defaultChecked={checkBoxTerms} onChange={termAcceptHandler} name="acceptTerms" type={'checkbox'}></input>
                <label htmlFor="acceptTerms" className={styles.acceptTerms}>
                  {'Am citit și sunt de acord cu termenii și condiții site-ului web '}
                </label>
              </div>
            </div>
              <button onClick={handleSend} type='submit' className={styles.finishOrder}>
                {'TRIMITE COMANDA'}
              </button>
           
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinishOrder;
