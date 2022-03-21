import styles from './../../components/ConstantComponents/BlogItem.module.scss';
import images from '../../data/images';
const BlogItem = () => {
  return (
    <div className={styles.blogItem}>
      <div className={styles.topPart}>
        <img className={styles.thumbnailImage} src={images.blogsPosts.firstPost} />
      </div>
      <div className={styles.bottomPart}>
        <h3 className={styles.titlePost}>{'Ce este dermatita?'}</h3>
        <div className={styles.previewPost}>
          <p className={styles.previewText}>
            {'Dermatita face parte din om Dermatita face parte din omDermatita face parte din om Dermatita face parte din om'}
          </p>
          <span className={styles.readMore}>{'Mai multe...'}</span>
        </div>
      </div>
    </div>
  );
};

export default BlogItem;
