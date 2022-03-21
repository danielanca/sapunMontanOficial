import HeaderMessage from '../components/HeaderMessage';
import CardComponent from '../components/CardComponent';
import TheSeparator from '../components/TheSeparator';
import images from './../data/images';

import styles from './OffersBlock.module.scss';
import strings from './../data/strings.json';

import cardBoardStrings from './../data/cardboard_offers.json';

const OffersBlock = () => {
  return (
    <>
      <TheSeparator anchorID="offers" />
      <div>
        <div className={styles.offersWrap}>
          <HeaderMessage headTitle={strings.offersSection.headerTitle} headDescription={strings.offersSection.smallDescription} />
          <div className={styles.cardsWrapper}>
            <CardComponent data={cardBoardStrings.StandardOffer} />
            <div className={styles.delimiterZigZag}>
              <div className={styles.interiorZigger}></div>
            </div>

            <CardComponent data={cardBoardStrings.PremiumOffer} direction={'flex-row-reverse'} />
          </div>
        </div>

        <div className={styles.calltoActions}>
          <button className={styles.airbnbStyle}>
            <img className={styles.bookingIcon} src={images.offers.airbnb} />
          </button>
          <button className={styles.bookNative}>
            <span className={styles.buttonText}>{strings.offersSection.actionButton}</span>
          </button>
          <button className={styles.bookingStyle}>
            <img className={styles.bookingIcon} src={images.offers.bookingcom} />
          </button>
        </div>
      </div>
    </>
  );
};

export default OffersBlock;
