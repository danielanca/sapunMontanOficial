
import styles from './OrderDone.module.scss';


const OrderDone = () => {


    return <div className={'row ' + styles.confirmContainer}>
    <div className={'col-12 ' + styles.padder}>
      <h3 className={styles.titleConfirm}>{'Comanda a fost inregistrata! '}</h3>
      <h4 className={styles.bottomConfirm}>{'Detalii despre comanda dvs. gasiti mai jos :)'}</h4>
      <div className={styles.orderDetailsBox}> </div>
    </div> 
  
</div>

}

export default OrderDone;