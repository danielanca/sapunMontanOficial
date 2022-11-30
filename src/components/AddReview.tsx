import React, { useEffect, useState } from "react";
import styles from "./AddReview.module.scss";
import { sendReviewToBack } from "./../services/emails";
import { storage } from "./../firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
interface ReviewProps {
  name: string;
  email: string;
  reviewActual: string;
  reviewProductID: string;
  starsNumber: string;
  mediaLink?: string;
}
interface PassingReview {
  productID: string;
}

const AddReview = ({ productID }: PassingReview) => {
  const [image, setImage] = useState<any>(null);
  const [openReviewComment, setOpenReviewComment] = useState(false);
  const [reviewBuffer, setReviewBuffer] = useState<ReviewProps>({
    reviewProductID: productID,
    name: "",
    starsNumber: "",
    reviewActual: "",
    email: "",
    mediaLink: ""
  });

  const reviewInputer = (data: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = data.target;
    setReviewBuffer((reviewBuffer) => ({
      ...reviewBuffer,
      [name]: value
    }));
  };
  const identificationInserter = (data: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = data.target;
    setReviewBuffer((reviewBuffer) => ({
      ...reviewBuffer,
      [name]: value
    }));
  };
  const handleUploadChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  useEffect(() => {
    console.log("IMage local:", image);
  }, [image]);
  useEffect(() => {
    console.log("ReviewBuffer:", reviewBuffer);
  }, [reviewBuffer]);
  const submitReviewToServer = () => {
    if (image != null) {
      const storageRef = ref(storage, `/reviewsMedia/${image.name}`);
      const uploadTask = uploadBytesResumable(storageRef, image);
      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            setReviewBuffer((reviewBuffer) => ({ ...reviewBuffer, mediaLink: url }));
            console.log("Result stored as:", reviewBuffer);
          });
        }
      );
    } else {
      sendReviewToBack(reviewBuffer);
    }
  };
  useEffect(() => {
    sendReviewToBack(reviewBuffer);
  }, [reviewBuffer.mediaLink]);
  const openReviewContainer = () => {
    setOpenReviewComment(true);
  };
  return (
    <div className={styles.addSection}>
      {!openReviewComment && (
        <button onClick={openReviewContainer} className={styles.addReviewButton}>
          {"SCRIE REVIEW"}
        </button>
      )}

      <div className={openReviewComment ? styles.activeTransition : styles.wrapper}>
        <div className={styles.inputContainer}>
          <span>{"Recenzia:"}</span>
          <textarea
            rows={5}
            onChange={reviewInputer}
            className={styles.textarea}
            name="reviewActual"
            id="reviewActual"
            placeholder="Introduceti mesajul cu privire la experienta dvs. "
          />
          {/* <button onClick={handleUpload}>{"Uploadv"}</button> */}
          <span>{"Numele dvs:"}</span>
          <input onChange={identificationInserter} name="name" id="name" placeholder="Nume*" />
          <span>{"Email:"}</span>
          <input onChange={identificationInserter} name={"email"} id="email" placeholder="Email:*" />
          <span>{"Media:"}</span>
          <div className={styles.fileUploadContainer}>
            {/* <button className={styles.uploadButton}>{"Incarca poza"}</button> */}
            <input
              className={styles.inputTypeFile}
              onChange={handleUploadChange}
              type="file"
              name={"media"}
              id="media"
              placeholder="Poza:"
            />
          </div>
        </div>

        <button onClick={submitReviewToServer} className={styles.submitButton}>
          {"TRIMITE"}
        </button>
      </div>
    </div>
  );
};

export default AddReview;
