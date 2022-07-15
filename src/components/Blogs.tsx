import React from "react";
import styles from "./../components/Blogs.module.scss";
import BlogItem from "./ConstantComponents/BlogItem";
import HeadlineTitle from "./HeadlineTitle";
import { blogs } from "./../data/blogStrings";
import "./../data/customCSS.scss";
import { Helmet } from "react-helmet";
const Blogs = () => {
  return (
    <>
      <Helmet>
        <title>{"Bloguri - MontanAir.Ro"}</title>
        <meta name="description" content={"Afla informatii noi!"} />
      </Helmet>
      <div className={styles.blogsSection}>
        <HeadlineTitle title="Blog" />
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
