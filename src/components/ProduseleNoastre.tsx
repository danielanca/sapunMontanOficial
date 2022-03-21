import styles from './../components/ProduseleNoastre.module.scss';
import productList from '../data/productList';
import HeadlineTitle from './HeadlineTitle';
import ProductItem from './ProductItem';
const ProduseleNoastre = () => {
  return (
    <>
      <HeadlineTitle title={'Produsele Noastre'} />
      <div className={styles.blockContainer}>
        <div className={styles.productList}>
          <ProductItem ID={0} />
          <ProductItem ID={1} />
          <ProductItem ID={2} />
        </div>
      </div>
    </>
  );
};
export default ProduseleNoastre;
