import styles from './../../components/ConstantComponents/BlogItem.module.scss';
import images from '../../data/images';
import { NavHashLink } from 'react-router-hash-link';

interface BlogItemsProps {
  blogID: number;
}

const BlogItem = ({ blogID }: BlogItemsProps) => {
  const gotoElement = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={'col-4 ' + styles.blogItem}>
      <NavHashLink onClick={gotoElement} className={styles.HashLinkStyle} to={'/blogid/' + blogID}>
        <div className={styles.topPart}>
          <img alt="" className={styles.thumbnailImage} src={images.blogsPosts.firstPost} />
        </div>
        <div className={styles.bottomPart}>
          <h3 className={styles.titlePost}>{'Ce este dermatita?'}</h3>
          <div className={styles.previewPost}>
            <p className={styles.previewText}>
              {
                'Dermatita face parte din om Dermatita face parte din omDermatita face parte din om Dermatita face parte din om'
              }
            </p>
            <span className={styles.readMore}>{'Mai multe...'}</span>
          </div>
        </div>
      </NavHashLink>
    </div>
  );
};

export default BlogItem;
