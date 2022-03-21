import { useState } from 'react';
import images from './../data/images';

import * as constants from './../constants/constants';

import styles from './ScrollUpComponent.module.scss';

interface IProps {}

const ScrollUp = ({}: IProps) => {
  const [isScrollButtonActive, setScrollButtonActive] = useState(false);

  window.onscroll = function () {
    if (window.pageYOffset < constants.SCROLL_BARRIER) {
      setScrollButtonActive(false);
    } else {
      setScrollButtonActive(true);
    }
  };

  function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  return (
    <div className={isScrollButtonActive ? styles.goTopButton : `${styles.goTopButton} ${styles.hideThis}`}>
      <button className={styles.buttonContainer} onClick={topFunction}>
        <img className={styles.upCircleButton} src={images.scrollUp.upButtonCircle} />
      </button>
    </div>
  );
};

export default ScrollUp;
