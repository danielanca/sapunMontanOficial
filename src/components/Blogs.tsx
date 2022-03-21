import styles from './../components/Blogs.module.scss';
import images from '../data/images';
import BlogItem from './ConstantComponents/BlogItem';
const Blogs = () => {
  return (
    <div className={styles.blogsSection}>
      <div className={'row ' + styles.blogPostsList}>
        <div className="col">
          <BlogItem />
        </div>
        <div className="col">
          <BlogItem />
        </div>
        <div className="col">
          <BlogItem />
        </div>
        <div className="col">
          <BlogItem />
        </div>
      </div>
    </div>
  );
};

export default Blogs;