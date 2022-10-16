import React from "react";
import styles from "./../components/Blogs.module.scss";
import BlogItem from "./ConstantComponents/BlogItem";
import HeadlineTitle from "./HeadlineTitle";
import { blogs } from "./../data/blogStrings";
import "./../data/customCSS.scss";
import { Helmet } from "react-helmet";
import strings from "./../data/strings.json";

const Blogs = () => {
  let { blogsArea: blogString } = strings;
  return (
    <>
      <Helmet>
        <title>{`${blogString.blogTitle} - MontanAir.Ro`}</title>
        <meta name="description" content={blogString.blogSubtitle} />
      </Helmet>
      <div className={styles.blogsSection}>
        <HeadlineTitle title={blogString.blogTitle} />
        <div className={styles.blogPostsList}>
          {Object.values(blogs.posts).map((data) => (
            <BlogItem data={JSON.stringify(data)} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Blogs;
