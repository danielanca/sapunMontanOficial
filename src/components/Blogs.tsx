import React from "react";
import BlogItem from "./ConstantComponents/BlogItem";
import HeadlineTitle from "./HeadlineTitle";
import HelmetHead from "./MiniComponents/HelmetHead/HelmetHead";
import { blogs } from "./../data/blogStrings";
import styles from "./../components/Blogs.module.scss";
import strings from "./../data/strings.json";
import "./../data/customCSS.scss";

const Blogs = () => {
  let { blogsArea: blogString } = strings;
  return (
    <>
      <HelmetHead title={blogString.blogTitle} description={blogString.blogSubtitle} />
      <div className={styles.blogsSection}>
        <HeadlineTitle title={blogString.blogTitle} />
        <div className={styles.blogPostsList}>
          {Object.values(blogs.posts).map((data, index) => (
            <BlogItem key={index} data={JSON.stringify(data)} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Blogs;
