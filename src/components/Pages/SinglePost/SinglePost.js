import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

//stylus
import styles from "./Singlepost.module.css";

//Components
import Footer from "../../Layout/Footer/Footer";
import AdvertContext from "../../../context/adverts/advertContext";
import UIContext from "../../../context/uiContext/uiContext";
import AuthContext from "../../../context/auth/authContext";
import AlertContext from "../../../context/alerts/alertContext";
import Spinner from "../../Layout/Spinner/Spinner";
import Backdrop from "../../Layout/Backdrop/Backdrop";
import Modal from "../../Layout/Modal/Modal";

const SinglePost = (props) => {
  const [advert, setAdvert] = useState(null);

  const [contactForm, setContactForm] = useState();

  const [review, setReview] = useState({
    body: "",
    value: 5,
  });

  const [modalType, setModalType] = useState("");

  const [isOwner, setIsOwner] = useState(false);

  const history = useHistory();

  const advertContext = useContext(AdvertContext);
  const {
    currentAd,
    loading,
    loadCurrentAd,
    deleteAdvert,
    updateAdvert,
    createReview,
    deleteReview,
  } = advertContext;

  const uiContext = useContext(UIContext);
  const { backdrop, showBackDrop, hideBackDrop } = uiContext;

  const authContext = useContext(AuthContext);
  const { user, isAuthenticated, sendEmail } = authContext;
  const authLoading = authContext.loading;

  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;

  useEffect(() => {
    const adId = props.history.location.pathname.slice(12, 36);

    if (isAuthenticated && !authLoading) {
      loadCurrentAd(adId);
    }

    //eslint-disable-next-line
  }, [isAuthenticated, authLoading]);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (currentAd !== null && loading === false) {
      setAdvert({
        ...currentAd,
      });

      setContactForm({
        email: user.email,
        message: "",
      });

      if (user._id && currentAd.creator._id === user._id) {
        setIsOwner(true);
      } else {
        setIsOwner(false);
      }
    }

    //eslint-disable-next-line
  }, [currentAd, loading]);

  const onChangeHandler = (e) => {
    setAdvert({
      ...advert,
      [e.target.name]: e.target.value,
    });
  };

  const onFileChangeHandler = (e) => {
    setAdvert({
      ...advert,
      [e.target.name]: e.target.files[0],
    });
  };

  const onEditSubmitHandler = () => {
    const data = new FormData();

    const { title, price, description, imageUrl, moduleId } = advert;
    let error = false;

    if (!title) {
      setAlert("Please provide Title", "danger");
      error = true;
    }

    if (!price) {
      setAlert("Please provide Price", "danger");
      error = true;
    }

    if (!description) {
      setAlert("Please provide Description", "danger");
      error = true;
    }

    if (!moduleId) {
      setAlert("Please provide Module Id", "danger");
      error = true;
    }

    if (imageUrl === undefined) {
      data.append("imageUrl", currentAd.imageUrl);
    } else {
      data.append("imageUrl", imageUrl);
    }

    if (!error) {
      data.append("title", title);
      data.append("price", price);
      data.append("description", description);
      data.append("moduleId", moduleId);

      updateAdvert(data, advert._id);
      hideBackDrop();
    }
  };

  const onEditPostHandler = (e) => {
    setModalType("Edit Post");
    showBackDrop();
  };

  const onDeletetPostHandler = () => {
    setModalType("Delete Post");
    showBackDrop();
  };

  const deletePost = () => {
    deleteAdvert(advert._id);
    hideBackDrop();
    history.push("/profile");
  };

  const onReviewModal = (e) => {
    setModalType("Maintain Review");
    showBackDrop();
  };

  const onCreateReviewHandler = (e) => {
    setReview({
      ...review,
      [e.target.name]: e.target.value,
    });
  };

  const onContactModal = (e) => {
    setModalType("Contact Seller");
    showBackDrop();
  };

  const onContactChangeHandler = (e) => {
    setContactForm({
      ...contactForm,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmitContactSeller = () => {
    let error = false;

    if (!contactForm.email) {
      setAlert("Please Supply Email", "danger");
      error = true;
    }
    if (!contactForm.message) {
      setAlert("Please Supply Message", "danger");
      error = true;
    }

    if (!error) {
      let data = {
        emailFrom: user.email,
        emailTo: advert.creator.email,
        body: contactForm.message,
        title: advert.title,
        username: user.username,
      };

      sendEmail(data);
      hideBackDrop();
    }
  };

  const onSubmitReviewHandler = () => {
    let error = false;
    const { body, value } = review;
    if (!body) {
      setAlert("Please suplly body to review", "danger");
      error = true;
    }
    if (value > 5 || value < 0 || !value) {
      setAlert("Please supply rating value [0-5]");
      error = true;
    }

    if (!error) {
      createReview(review, advert._id);
    }

    hideBackDrop();
  };

  if (!loading && advert !== null) {
    return (
      <>
        {backdrop && modalType === "Contact Seller" ? (
          <>
            <Backdrop clicked={hideBackDrop} />
            <Modal>
              <div className={styles.contactform}>
                <div className={styles.contactform__formgroup}>
                  <label htmlFor="email">Your Contact Email:</label>
                  <input
                    type="email"
                    onChange={onContactChangeHandler}
                    value={contactForm.email}
                  />
                </div>
                <div className={styles.contactform__formgroup}>
                  <label htmlFor="message">Your Message:</label>
                  <textarea
                    onChange={onContactChangeHandler}
                    value={contactForm.message}
                    name="message"
                    id="message"
                    cols="60"
                    rows="10"
                  ></textarea>
                </div>
                <button
                  className={styles.contactform__sendBtn}
                  onClick={onSubmitContactSeller}
                >
                  Send
                </button>
              </div>
            </Modal>
          </>
        ) : null}
        {backdrop && modalType === "Delete Post" ? (
          <>
            <Backdrop clicked={hideBackDrop} />
            <Modal>
              <div className={styles.deleteConfirm}>
                <label htmlFor="confirm">
                  Are you sure you want to delete this advert?
                </label>
                <button
                  className={styles.deleteAdvert__confirmBtn}
                  onClick={() => deletePost(advert._id)}
                >
                  delete advert
                </button>
              </div>
            </Modal>
          </>
        ) : null}
        {backdrop && modalType === "Edit Post" ? (
          <>
            <Backdrop clicked={hideBackDrop} />
            <Modal>
              <h2 className={styles.modal__title}>Editing Your Advert</h2>
              <div className={styles.modal__formgroup}>
                <label htmlFor="username">Title:</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  placeholder="Change title"
                  value={advert.title}
                  onChange={onChangeHandler}
                />
              </div>
              <div className={styles.modal__formgroup}>
                <label htmlFor="price">Price:</label>
                <input
                  type="text"
                  id="price"
                  name="price"
                  placeholder="Change price"
                  value={advert.price}
                  onChange={onChangeHandler}
                />
              </div>
              <div className={styles.modal__formgroup}>
                <label htmlFor="price">Description:</label>
                <textarea
                  type="text"
                  id="description"
                  name="description"
                  placeholder="Change description"
                  cols="60"
                  rows="5"
                  value={advert.description}
                  onChange={onChangeHandler}
                />
              </div>
              <div className={styles.modal__formgroup}>
                <label htmlFor="imageUrl">Advert Picture:</label>
                <input
                  type="file"
                  id="imageUrl"
                  name="imageUrl"
                  onChange={onFileChangeHandler}
                />
              </div>
              <div className={styles.modal__formgroup}>
                <label htmlFor="moduleId">Module Code:</label>
                <select
                  name="moduleId"
                  id="moduleId"
                  onChange={onChangeHandler}
                  value={advert.moduleId}
                >
                  <option value="BMAN111">BMAN111</option>
                  <option value="CMPG111">CMPG111</option>
                  <option value="MATH111">MATH111</option>
                </select>
              </div>
              <div className={styles.modal__btngroup}>
                <button
                  className={styles.btngroup__cancelBtn}
                  onClick={hideBackDrop}
                >
                  Cancel
                </button>
                <button
                  className={styles.btngroup__saveBtn}
                  onClick={onEditSubmitHandler}
                >
                  Save
                </button>
              </div>
            </Modal>
          </>
        ) : null}
        {backdrop && modalType === "Maintain Review" ? (
          <>
            <Backdrop clicked={hideBackDrop} />
            <Modal>
              <h2 className={styles.modal__title}>Write Review</h2>
              <div className={styles.modal__formgroup}>
                <label htmlFor="body">Body</label>
                <textarea
                  type="text"
                  id="body"
                  name="body"
                  cols="60"
                  rows="10"
                  value={review.body}
                  onChange={onCreateReviewHandler}
                />
              </div>
              <div className={styles.modal__formgroup}>
                <label htmlFor="value">Rating (out of 5)</label>
                <input
                  type="number"
                  max="5"
                  min="0"
                  id="value"
                  name="value"
                  value={review.value}
                  onChange={onCreateReviewHandler}
                />
              </div>

              <div className={styles.modal__btngroup}>
                <button
                  className={styles.btngroup__cancelBtn}
                  onClick={hideBackDrop}
                >
                  Cancel
                </button>
                <button
                  className={styles.btngroup__saveBtn}
                  onClick={onSubmitReviewHandler}
                >
                  Create
                </button>
              </div>
            </Modal>
          </>
        ) : null}
        {advert !== null && loading === false ? (
          <div className={styles.sppage}>
            <div className={styles.sppage__container}>
              <div className={styles.sppage__gridbox}>
                <div className={styles.gridbox__col1}>
                  <div className={styles.col1__image}>
                    <span
                      className={styles.advertcard__typeSleeve}
                      style={
                        advert.type === "note"
                          ? { borderTop: "90px solid var(--success-color)" }
                          : { borderTop: "90px solid var(--warning-color)" }
                      }
                    ></span>
                    <span className={styles.advertcard__typeText}>
                      {advert.type.toUpperCase()}
                    </span>
                    <img
                      src={`http://localhost:5000/${advert.imageUrl}`}
                      alt={advert.title}
                    />
                  </div>
                  <div className={styles.col1__btngroup}>
                    {isOwner ? (
                      <>
                        <button
                          className={styles.btngroup__Contact}
                          onClick={onEditPostHandler}
                        >
                          Edit Post
                        </button>
                        <button
                          className={styles.btngroup__EditBtn}
                          onClick={onDeletetPostHandler}
                        >
                          Delete Post
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className={styles.btngroup__Contact}
                          onClick={onContactModal}
                        >
                          Contact Seller
                        </button>
                      </>
                    )}
                  </div>
                </div>
                <div className={styles.gridbox__col2}>
                  <p className={styles.col2__title}>{advert.title}</p>
                  <p style={{ fontSize: "1rem", color: "#aaa" }}>
                    <em>by {advert.creator.username}</em>
                  </p>
                  <p>
                    Subject code: <b>{advert.moduleId}</b>
                  </p>
                  <p className={styles.col2__description}>
                    {advert.description}
                  </p>
                  {advert.type === "note" ? (
                    <p className={styles.col2__rating}>
                      Rating:{" "}
                      {advert.reviews.averageRating
                        ? advert.reviews.averageRating
                        : ""}
                      /5
                    </p>
                  ) : null}

                  <p className={styles.col2__price}>R {advert.price}</p>
                </div>
              </div>
              {advert.type === "note" ? (
                <div className={styles.sppage__reviews}>
                  <div className={styles.reviews__flexgroup}>
                    <h2 className={styles.flexgroup__title}>
                      Reviews (
                      {advert.reviews.ratings.length
                        ? advert.reviews.ratings.length
                        : "0"}
                      )
                    </h2>
                    {!isOwner ? (
                      <button
                        className={styles.flexgroup__addBtn}
                        onClick={onReviewModal}
                      >
                        Add Review
                      </button>
                    ) : null}
                  </div>

                  <div className={styles.reviews__container}>
                    {advert.reviews.ratings
                      ? advert.reviews.ratings.map((review) => {
                          return (
                            <div
                              key={review._id}
                              className={styles.reviews__single}
                            >
                              <div>
                                <span style={{ fontSize: "0.7rem" }}>
                                  {`${
                                    review.author.username
                                  } - ${review.dateTime.slice(
                                    0,
                                    10
                                  )} ${review.dateTime.slice(11, 16)}`}
                                </span>
                                <p className={styles.ratingValue}>
                                  {review.value}/5
                                </p>
                                <p>{review.body}</p>
                              </div>
                              <div>
                                {user._id === review.author._id ? (
                                  <button
                                    onClick={() => deleteReview(review._id)}
                                    className={styles.single__deleteBtn}
                                  >
                                    Delete Review
                                  </button>
                                ) : null}
                              </div>
                            </div>
                          );
                        })
                      : "null"}
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        ) : (
          <Spinner />
        )}

        <Footer />
      </>
    );
  } else {
    return <Spinner />;
  }
};

export default SinglePost;
