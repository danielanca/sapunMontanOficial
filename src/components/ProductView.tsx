import styles from './../components/ProductView.module.scss';
import productList from './../data/productList';
import reviewStar from './../media/assets/pics/prezentareCarbune/star_review.png';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import Comments from './Comments';
import ProductAdded from './PopUps/ProductAdded';

interface CartProps {
  notifyMe?: React.Dispatch<React.SetStateAction<number>>;
}

const ProductView = ({ notifyMe }: CartProps) => {
  let data = Array.from(productList);
  let params = useParams();
  var ID = params.productID;

  const [mainPicture, setmainPicture] = useState(0);
  const [popProductInCart, setpopProductInCart] = useState(false);

  const onImageClicked = (event: number) => {
    setmainPicture(event);
  };
  const animEnded = () => {
    setpopProductInCart(false);
  };
  const addToCart_Handler = () => {
    setpopProductInCart(true);
    notifyMe(Number(ID));
    var storedCart = [];
    let expectedData = localStorage.getItem('cartData');
    if (expectedData === null) {
      console.log('Data not found');

      storedCart.push({ id: ID, itemNumber: '1' });

      console.log('After push storedCard is:');
      console.log(storedCart);

      localStorage.setItem('cartData', JSON.stringify(storedCart));
      return;
    }
    var itemFound = false;
    storedCart = JSON.parse(expectedData);
    console.log(storedCart);
    storedCart.map((item) => {
      console.log('mapper');
      console.log(item);
      if (item.id === ID.toString()) {
        item.itemNumber = (Number(item.itemNumber) + 1).toString();
        itemFound = true;
      }
      console.log('mapper after:');
      console.log(item);
    });

    if (!itemFound) {
      storedCart.push({ id: ID, itemNumber: '1' });
    }

    localStorage.setItem('cartData', JSON.stringify(storedCart));
  };

  return (
    <>
      <div className={styles.padder}>
        <div className={'row ' + styles.sectionParent}>
          <div className={'col-md-6 ' + styles.leftSection}>
            <div className={styles.leftContainer}>
              <img className={styles.imageContainer} src={data[ID].productPicture[mainPicture]} />
              <div className={styles.previewImageContainer}>
                <div
                  onClick={() => {
                    onImageClicked(0);
                  }}
                  className={styles.clickableImage}
                >
                  <img className={styles.innerImage} src={data[ID].productPicture[0]} />
                </div>
                <div
                  onClick={() => {
                    onImageClicked(1);
                  }}
                  className={styles.clickableImage}
                >
                  <img className={styles.innerImage} src={data[ID].productPicture[1]} />
                </div>
                <div
                  onClick={() => {
                    onImageClicked(2);
                  }}
                  className={styles.clickableImage}
                >
                  <img className={styles.innerImage} src={data[ID].productPicture[2]} />
                </div>
              </div>
            </div>
          </div>
          <div className={'col-md-6  ' + styles.rightSection}>
            <div className={styles.rightContainer}>
              <h3 className={styles.productTitle}>{data[ID].title}</h3>
              <div className={styles.reviewContainer}>
                <div className={styles.starsContainer}>
                  <img className={styles.reviewStar} src={reviewStar} />
                  <img className={styles.reviewStar} src={reviewStar} />
                  <img className={styles.reviewStar} src={reviewStar} />
                  <img className={styles.reviewStar} src={reviewStar} />
                  <img className={styles.reviewStar} src={reviewStar} />
                </div>
                <span className={styles.reviewHead}>{'23 RECENZII  '}</span>
              </div>
              <div className={styles.shortDescription}>{data[ID].shortDescription}</div>
              <div className={styles.longDescription}>
                {data[ID].firstDescription}

                <ul>
                  <li className={styles.liItem}>{data[ID].ULbeneficii[1]}</li>
                  <li className={styles.liItem}>{data[ID].ULbeneficii[0]}</li>
                </ul>
              </div>
              <div className={styles.priceWrapper}>
                <div className={styles.productPrice}>{productList[ID].price + ' LEI '}</div>
              </div>
              <div className={styles.actionContainer}>
                <button onClick={addToCart_Handler} className={styles.addToCart}>
                  {'ADAUGĂ IN COȘ'}
                </button>
              </div>
              {popProductInCart && <ProductAdded animFin={animEnded} id={ID} />}
            </div>
          </div>
        </div>
      </div>
      <div>
        <Comments />
      </div>
    </>
  );
};

export default ProductView;
