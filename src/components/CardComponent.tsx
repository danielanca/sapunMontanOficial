import styles from './CardComponent.module.scss';

import cardimage2 from './../media/assets/pics/offers_cardboard/CRS_7243-HDR.jpg';

interface InData {
  title: string;
  period: string;
  periodDays: string;
  price: string;
  secondPeriod: string;
  secondPeriodDays: string;
  secondPrice: string;
}

interface IProps {
  direction?: string | undefined;
  data?: InData;
}

const CardComponent = ({ data, direction }: IProps) => {
  let customDirection: string;
  if (!direction) customDirection = 'flex-row';
  else customDirection = direction;

  return (
    <div className={customDirection + ' ' + styles.cardboard}>
      <div className={styles.wrap}>
        <img className={styles.cardimgStyle} src={cardimage2} />
      </div>
      <div className={styles.column4}>
        <div className={styles.padder}>
          <h3 className={styles.headCardTitle}>{data?.title}</h3>
          <span className={styles.textInner}>{data?.period}</span>
          <span className={styles.textInner}>{data?.periodDays}</span>
          <span className={styles.textInner}>{'|'}</span>
          <span className={styles.fancyPrice}>{data?.price}</span>
          <span className={styles.textInner}> {data?.secondPeriod}</span>
          <span className={styles.textInner}>{data?.secondPeriodDays}</span>
          <span>{'|'}</span>
          <span className={styles.fancyPrice}>{data?.secondPrice}</span>
        </div>
      </div>
    </div>
  );
};

export default CardComponent;
