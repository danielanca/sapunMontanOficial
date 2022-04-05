import { HashLink } from 'react-router-hash-link';
import productList from './../data/productList';

import styles from './../components/ProductItem.module.scss';

interface ProdProps {
  ID: number;
}
const ProductItem = ({ ID }: ProdProps) => {
  const gotoElement = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <HashLink onClick={gotoElement} className={styles.HashLinkStyle} to={'/produs/' + ID}>
      <div className={'col-md-3 ' + styles.productItem}>
        <div className={styles.imageWrap}>
          <img className={styles.productImage} src={productList[ID].productPicture[0]}></img>
        </div>
        <div className={styles.titleWrap}>
          <span className={styles.productTitle}>{productList[ID].title}</span>
        </div>

        <div className={styles.priceWrap}>
          <span className={styles.productPrice}>{productList[ID].price + ' LEI'}</span>
        </div>
        <div className={styles.addCartWrap}>
          <div className={styles.addButtonCart}>
            <span className={styles.textInside}>{'Vezi produs'}</span>
          </div>
        </div>
      </div>
    </HashLink>
  );
};

export default ProductItem;
