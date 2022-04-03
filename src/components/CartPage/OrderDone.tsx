
import styles from './OrderDone.module.scss';



const OrderDone = (orderID: number) => {


    return <div className={'row ' + styles.confirmContainer}>
    <div className={'col-12 ' + styles.padder}>
      <h3 className={styles.titleConfirm}>{'Comanda a fost inregistrata! '}</h3>
      <h4 className={styles.bottomConfirm}>{'Detalii despre comanda dvs. gasiti mai jos :)'}</h4>
      <div className={styles.orderDetailsBox}>
        <p>{'Nume: ' + 'Daniel Anca'}</p>
        <p>{'Strada ' + 'Aleea Plopilor nr.3 bl.L1 sc.C ap.26 jud.Cluj oras: Turda'}</p>
        <p>{'Email: ' + 'steptu94@gmail.com'}</p>
        <p>{'Telefon: ' + '0745469907'}</p>
        <div className={styles.productList}>
            <table >
              <tr className={styles.subtableStyle}>
                <th>{'Produs'}</th>
                <th>{'Cantitate'}</th>
                <th>{'Subtotal'}</th>
              </tr>
              <tr>
                <th>{'Sapun Montan'}</th>
                <th>{'2'}</th>
                <th>{'150 LEI'}</th>
              </tr>
            </table>
        </div>
        <div className={styles.bottomAdvices}>
          <p>{'Veti fi contactat telefonic pentru a confirma comanda! Livrarea produselor se realizeaza in 24-48 ore. '}</p>
        </div>
      </div>
    </div> 
  
</div>

}

export default OrderDone;