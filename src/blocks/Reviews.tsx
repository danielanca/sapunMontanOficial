import ReactGA from "react-ga4";

import HeaderMessage from '../components/HeaderMessage';
import ReviewCard from '../components/ReviewCard';
import DragItem from '../components/DragItem/DragItem';

import styles from './Reviews.module.scss';
import images from './../data/images';

import strings from './../data/strings.json';
import TheSeparator from '../components/TheSeparator';
import { useState } from 'react';

const Reviews = () => {
  const [CardIndex, setCardIndex] = useState(2);
  let limitLoop = 4;
  console.log('Card Index: ' + CardIndex);
  const tapHandler = (indexIncrement: number) => {
    setCardIndex(indexIncrement);
  };
  const sliderHandler = (data: number) => {
    if (data > 20) {
      internNotifyHandler(1);
    }
    if (data < 20) {
      internNotifyHandler(-1);
    }
  };
  const internNotifyHandler = (value: number) => {
    if (CardIndex + value >= limitLoop || CardIndex + value === 0) return;
    ReactGA.event('User scrolled in reviews')
    setCardIndex(CardIndex + value);
  };
  return (
    <>
      <TheSeparator anchorID="reviews" />
      <div className={styles.reviewContainer}>
        <div className={styles.headerContainer}>
          <HeaderMessage headTitle={strings.reviewsSection.headTitle} headDescription={strings.reviewsSection.smallDescription} />
        </div>
        <div className={styles.reviewSection}>
          <DragItem sliderActiveCoords={sliderHandler} />
          <div className={styles.reviewWall}>
            <div
              className={`${styles.sliderSpace} ${
                CardIndex === 0
                  ? styles.zeroSlide
                  : CardIndex === 1
                  ? styles.oneSlide
                  : CardIndex === 2
                  ? styles.twoSlide
                  : CardIndex === 3
                  ? styles.threeSlide
                  : ''
              }`}
            >
              <div className={styles.interiorPadder}>
                <ReviewCard
                  styler={CardIndex === 0 ? 'onFocus' : CardIndex >= 2 ? 'hide' : ''}
                  testimonials={strings.reviewsSection.reviewersList.reviewer1}
                />
                <ReviewCard
                  styler={CardIndex === 1 ? 'onFocus' : CardIndex >= 3 ? 'hide' : ''}
                  testimonials={strings.reviewsSection.reviewersList.reviewer2}
                />
                <ReviewCard
                  styler={CardIndex === 2 ? 'onFocus' : CardIndex >= 4 ? 'hide' : ''}
                  testimonials={strings.reviewsSection.reviewersList.reviewer3}
                />
                <ReviewCard
                  styler={CardIndex === 3 ? 'onFocus' : CardIndex >= 5 || CardIndex <= 1 ? 'hide' : ''}
                  testimonials={strings.reviewsSection.reviewersList.reviewer4}
                />
                <ReviewCard
                  styler={CardIndex === 4 ? 'onFocus' : CardIndex === 2 || CardIndex <= 2 ? 'hide' : ''}
                  testimonials={strings.reviewsSection.reviewersList.reviewer5}
                />
              </div>
            </div>
          </div>
          <div className={styles.actionPanel}>
            <img
              onClick={() => {
                tapHandler(1);
              }}
              className={styles.inactive}
              src={CardIndex != 1 ? images.review.roundButtonInactive : images.review.roundButton}
            />
            <img
              onClick={() => {
                tapHandler(2);
              }}
              className={styles.active}
              src={CardIndex != 2 ? images.review.roundButtonInactive : images.review.roundButton}
            />
            <img
              onClick={() => {
                tapHandler(3);
              }}
              className={styles.inactive}
              src={CardIndex != 3 ? images.review.roundButtonInactive : images.review.roundButton}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Reviews;
