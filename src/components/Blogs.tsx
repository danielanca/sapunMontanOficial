import styles from "./../components/Blogs.module.scss";
import BlogItem from "./ConstantComponents/BlogItem";
import { blogs } from "./../data/blogStrings";
import "./../data/customCSS.scss";

const Blogs = () => {
  return (
    <div className={styles.blogsSection}>
      <div className={styles.blogPostsList}>
        {Object.values(blogs.posts).map((data) => (
          <BlogItem data={JSON.stringify(data)} />
        ))}
      </div>
    </div>
  );
};

export default Blogs;
