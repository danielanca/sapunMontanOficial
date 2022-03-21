import styles from './AddReview.module.scss';

const AddReview = () => {
  return (
    <div className={styles.addSection}>
      <div className={styles.inputContainer}>
        <span>{'Recenzia:'}</span>
        <textarea rows="5" type="reviewInput" id="recenzia" placeholder="Recenzia*"></textarea>
        <span>{'Numele dvs:'}</span>
        <input id="name" placeholder="Nume*"></input>
        <span>{'Email:'}</span>
        <input id="email" placeholder="Email:*"></input>
      </div>
      <button className={styles.submitButton}>{'TRIMITE'}</button>
    </div>
  );
};

export default AddReview;
