import styles from './../components/Blogs.module.scss';
import BlogItem from './ConstantComponents/BlogItem';

const Blogs = () => {
  return (
    <div className={styles.blogsSection}>
      <div className={'row ' + styles.blogPostsList}>
        <BlogItem blogID={1} />
        <BlogItem blogID={2} />
        <BlogItem blogID={3} />
        <BlogItem blogID={4} />
      </div>
    </div>
  );
};

export default Blogs;
