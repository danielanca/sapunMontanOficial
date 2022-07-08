import React from "react";
import styles from "./../components/Blogs.module.scss";
import BlogItem from "./ConstantComponents/BlogItem";
import HeadlineTitle from "./HeadlineTitle";
import { blogs } from "./../data/blogStrings";
import "./../data/customCSS.scss";

const Blogs = () => {
  return (
    <div className={styles.blogsSection}>
      <HeadlineTitle title="Blog" />
      <div className={styles.blogPostsList}>
        {Object.values(blogs.posts).map((data) => (
          <BlogItem data={JSON.stringify(data)} />
        ))}
      </div>
    </div>
  );
};

export default Blogs;
