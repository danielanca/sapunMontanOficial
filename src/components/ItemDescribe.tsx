import styles from './ItemDescribe.module.scss';

interface welcomeDetails {
  title: string;
  longText: string;
}
interface StyleCustom {
  alignment?: string;
  title?: string;
  descriptionFull?: string;
  data?: welcomeDetails | never;
}

const ItemDescribe = ({ alignment, data }: StyleCustom) => {
  return (
    <div className={`${alignment} ` + styles.ItemContainer}>
      <h3 className={styles.headTextStyle}>{data?.title}</h3>

      <p className={styles.headerDescription}>{data?.longText}</p>
    </div>
  );
};

export default ItemDescribe;
