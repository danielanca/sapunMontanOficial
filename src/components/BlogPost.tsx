import styles from "./BlogPost.module.scss";
import { NavHashLink } from "react-router-hash-link";

const BlogPost = () => {
  const gotoElement = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <div className={"container "}>
        <div className={styles.blogPostCont}>
          <div className={styles.topTitle}>
            <h3 className={styles.centerTitle}>{"Ce este dermatita? Si cum poti scapa de ea?"}</h3>
            <span className={styles.date}>{"Septembrie 25 - 2021"}</span>
            <span className={styles.fineLine} />
            <span className={styles.postcategory}>{"Ingrijire personala, cosmetice"}</span>
          </div>
          <div className={styles.previewArea}>
            <p className={styles.firstWords}>
              {
                "When it comes to creating is a website for your busi-ness, an attreactive design will only get you far. With people increasingly using their tablets and smartphones and website for your business, an attractive design will only get you far. With people increasingly using their tablets and smartphones shop online,..."
              }
            </p>
          </div>
        </div>
        <div className={styles.actualBlogContent}>
          <img
            className={styles.pictureThumbnail}
            src="https://i.pinimg.com/originals/39/0c/74/390c74fe1e6f3dacbfc758e984b704ae.jpg"
          />
          <div className={styles.textContainer}>
            <p>{"text b text btext btext btext btext btext b"}</p>
          </div>

          <div className={styles.endOfPost}>
            <p className={styles.tags}>{"Tags:  "}</p>
            <p className={styles.tags}>{"dermatita, "}</p>
            <p className={styles.tags}>{"sanatate, "}</p>
            <p className={styles.tags}>{"cosuri, "}</p>
          </div>
        </div>
        <div className={styles.endOfLine} />
        <div className={styles.relatedContainer}>
          <h3>{"Subiecte similare"}</h3>
          <div className={"row " + styles.relatedListing}>
            <div className={styles.relPostItem}>
              <NavHashLink onClick={gotoElement} className={styles.HashLinkStyle} to={"/blogid/2"}>
                <img
                  className={styles.pictureStyle}
                  src="https://htmlguru.net/genial/assets/img/post-details/related-01.jpg"
                />
                <h3>{"Titlu pentru acest post"}</h3>
              </NavHashLink>
            </div>
            <div className={styles.relPostItem}>
              <NavHashLink onClick={gotoElement} className={styles.HashLinkStyle} to={"/blogid/2"}>
                <img
                  className={styles.pictureStyle}
                  src="https://htmlguru.net/genial/assets/img/post-details/related-01.jpg"
                />
                <h3>{"Titlu pentru acest post"}</h3>
              </NavHashLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogPost;
