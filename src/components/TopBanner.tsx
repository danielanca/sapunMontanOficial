import styles from './../components/TopBanner.module.scss';

const TopBanner = () => {
  return (
    <div className={styles.bigBlanaBanner}>
      <div className={'col-md-3 ' + styles.emailTop}>{'contact@sapun-montan.ro'}</div>
      <div className="col-md-6 ">
        <p className={styles.headTitle}>{'Transport Gratuit pentru comenzi peste 130 lei'}</p>
      </div>
      <div className={'col-md-3 ' + styles.socialsTop}> Instagram HERE</div>
    </div>
  );
};

export default TopBanner;
