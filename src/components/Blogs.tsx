import React from "react";
import BlogItem from "./ConstantComponents/BlogItem";
import HeadlineTitle from "./HeadlineTitle";
import { blogs } from "./../data/blogStrings";
import HelmetHead from "./MiniComponents/HelmetHead/HelmetHead";
import strings from "./../data/strings.json";
import styles from "./../components/Blogs.module.scss";

const Blogs = () => {
  let { blogsArea: blogString } = strings;
  return (
    <>
      <HelmetHead title={blogString.blogTitle} description={blogString.blogSubtitle} />
      <div className={styles.blogsSection}>
        <HeadlineTitle title={blogString.blogTitle} />
        <div className={styles.blogPostsList}>
          {Object.values(blogs.posts).map((data, index) => (
            <BlogItem data={JSON.stringify(data)} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Blogs;
