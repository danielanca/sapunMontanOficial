import DragItem from './DragItem/DragItem';

import images from './../data/images';

import styles from './Carousel.module.scss';

const galleryArray = [
  images.oasisResidenceImage.room1,
  images.oasisResidenceImage.room2,
  images.oasisResidenceImage.room3,
  images.oasisResidenceImage.room4,
  images.oasisResidenceImage.room5,
  images.oasisResidenceImage.room6,
  images.oasisResidenceImage.room7,
  images.oasisResidenceImage.room8,
  images.oasisResidenceImage.room9,
  images.oasisResidenceImage.room10,
];
interface IProps {
  galleryIndexIn: number;
  onIndexNotification: (value: number) => void;
}

const Carousel = ({ galleryIndexIn, onIndexNotification }: IProps) => {
  const sliderHandler = (data: number) => {
    if (data > 20) {
      onIndexNotification(1);
    }
    if (data < 20) {
      onIndexNotification(-1);
    }
  };

  return (
    <>
      <DragItem sliderActiveCoords={sliderHandler} />

      <div className={styles.carouselSpace}>
        <div
          id="slipperSwipe"
          className={`${styles.slipper} ${
            galleryIndexIn === 1
              ? styles.oneSlide
              : galleryIndexIn === 2
              ? styles.twoSlide
              : galleryIndexIn === 3
              ? styles.threeSlide
              : galleryIndexIn === 4
              ? styles.forthSlide
              : galleryIndexIn === 5
              ? styles.fifthSlide
              : galleryIndexIn === 6
              ? styles.sixthSlide
              : ''
          }`}
        >
          <div className={`${styles.item}   `}>
            <img
              draggable="false"
              className={`${styles.itemPicture} ${galleryIndexIn >= 3 ? styles.hide : ''} `}
              src={galleryArray[0]}
            />
          </div>
          <div className={`${styles.item}  `}>
            <img
              draggable="false"
              className={`${styles.itemPicture} ${galleryIndexIn >= 4 ? styles.hide : ''} 
              ${galleryIndexIn == 1 ? `${styles.focusItem} ` : ''}  `}
              src={galleryArray[1]}
            />
          </div>
          <div className={`${styles.item}  `}>
            <img
              draggable="false"
              className={`${styles.itemPicture} ${galleryIndexIn >= 5 ? styles.hide : ''}  ${
                galleryIndexIn == 2 ? styles.focusItem : ''
              } `}
              src={galleryArray[2]}
            />
          </div>
          <div className={`${styles.item}  `}>
            <img
              draggable="false"
              className={`${styles.itemPicture} ${galleryIndexIn >= 6 || galleryIndexIn < 1 ? styles.hide : ''}  ${
                galleryIndexIn == 3 ? styles.focusItem : ''
              }`}
              src={galleryArray[3]}
            />
          </div>
          <div className={`${styles.item}  `}>
            <img
              draggable="false"
              className={`${styles.itemPicture} ${galleryIndexIn >= 7 || galleryIndexIn < 2 ? styles.hide : ''}  ${
                galleryIndexIn == 4 ? styles.focusItem : ''
              } `}
              src={galleryArray[4]}
            />
          </div>
          <div className={`${styles.item}  `}>
            <img
              draggable="false"
              className={`${styles.itemPicture} ${galleryIndexIn >= 8 || galleryIndexIn < 3 ? styles.hide : ''} ${
                galleryIndexIn == 5 ? styles.focusItem : ''
              } `}
              src={galleryArray[5]}
            />
          </div>
          <div className={`${styles.item}  `}>
            <img
              draggable="false"
              className={`${styles.itemPicture} ${galleryIndexIn >= 9 || galleryIndexIn < 4 ? styles.hide : ''} ${
                galleryIndexIn == 6 ? styles.focusItem : ''
              } `}
              src={galleryArray[6]}
            />
          </div>
          <div className={`${styles.item}  `}>
            <img
              draggable="false"
              className={`${styles.itemPicture} ${galleryIndexIn >= 10 || galleryIndexIn < 5 ? styles.hide : ''} ${
                galleryIndexIn == 4 ? styles.focusItem : ''
              } `}
              src={galleryArray[7]}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Carousel;
