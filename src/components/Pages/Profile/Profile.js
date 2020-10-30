import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

//stylus
import styles from "./Profile.module.css";

//Component
import AuthContext from "../../../context/auth/authContext";
import UIContext from "../../../context/uiContext/uiContext";
// import AlertContext from "../../../context/alerts/alertContext";
import AdvertCard from "../../Layout/AdvertCard/AdvertCard";
import Footer from "../../Layout/Footer/Footer";
import Backdrop from "../../Layout/Backdrop/Backdrop";
import Modal from "../../Layout/Modal/Modal";
import Spinner from "../../Layout/Spinner/Spinner";

const Profile = (props) => {
  const authContext = useContext(AuthContext);
  const { user, loading, updateProfile, loadUser } = authContext;

  const uiContext = useContext(UIContext);
  const { backdrop, hideBackDrop, showBackDrop } = uiContext;

  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    loadUser();

    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (user !== null && loading === false) {
      setProfileData({
        ...user,
        imageUrl: user.imageUrl,
      });
    }

    //eslint-disable-next-line
  }, [user, loading]);

  const onChangeHandler = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value,
    });
  };

  const onFileChangeHandler = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.files[0],
    });
  };

  const onModalSubmitHandler = () => {
    const data = new FormData();

    if (profileData.imageUrl === undefined) {
      data.append("imageUrl", user.imageUrl);
    } else {
      data.append("imageUrl", profileData.imageUrl);
    }

    data.append("username", profileData.username);
    data.append("firstName", profileData.firstName);
    data.append("lastName", profileData.lastName);
    data.append("campus", profileData.campus);
    data.append("major", profileData.major);

    updateProfile(data, user._id);
    hideBackDrop();
  };

  const valueHandler = () => {
    const adverts = profileData.adverts || [];
    let avgcount = 0,
      count = 0,
      totalNotesRated = 0;

    adverts.forEach((advert) => {
      if (advert.reviews.averageRating) {
        count += Number(advert.reviews.averageRating);
        totalNotesRated++;
      }
    });

    try {
      avgcount = parseFloat(count / totalNotesRated).toFixed(2);

      if (avgcount === "NaN") {
        return "No Rating";
      }

      return avgcount;
    } catch (err) {
      return "Error Calculating Rating";
    }
  };

  if (!loading && profileData !== null) {
    return (
      <>
        {backdrop && profileData ? (
          <>
            <Backdrop clicked={hideBackDrop} />
            <Modal>
              <h2 className={styles.modal__title}>Editing Your Profile</h2>
              <div className={styles.modal__formgroup}>
                <label htmlFor="username">Username:</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  placeholder="Change username"
                  value={profileData.username}
                  onChange={onChangeHandler}
                />
              </div>
              <div className={styles.modal__formgroup}>
                <label htmlFor="username">First Name:</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  placeholder="Change fist name"
                  value={profileData.firstName}
                  onChange={onChangeHandler}
                />
              </div>
              <div className={styles.modal__formgroup}>
                <label htmlFor="username">Last Name:</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  placeholder="Change last name"
                  value={profileData.lastName}
                  onChange={onChangeHandler}
                />
              </div>
              <div className={styles.modal__formgroup}>
                <label htmlFor="imageUrl">Profile Picture:</label>
                <input
                  type="file"
                  id="imageUrl"
                  name="imageUrl"
                  onChange={onFileChangeHandler}
                />
              </div>
              <div className={styles.modal__formgroup}>
                <label htmlFor="campus">Campus:</label>
                <select name="campus" id="campus" onChange={onChangeHandler}>
                  <option value="Potchefstroom">Potchefstroom</option>
                  <option value="Vaal">Vaal</option>
                  <option value="Mafikeng">Mafikeng</option>
                </select>
              </div>
              <div className={styles.modal__formgroup}>
                <label htmlFor="major">Major:</label>
                <select name="major" id="major" onChange={onChangeHandler}>
                  <option value="BSc IT">BSc IT</option>
                  <option value="BSc Rekenaarwetenskap en Wiskunde">
                    BSc Rekenaarwetenskap en Wiskunde
                  </option>
                  <option value="BEd Gondslag fase">BEd Gondslag fase"</option>
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
                  onClick={onModalSubmitHandler}
                >
                  Save
                </button>
              </div>
            </Modal>
          </>
        ) : null}
        {profileData && !loading ? (
          <div className={styles.profilepage}>
            <div className={styles.profilepage__profile}>
              <h1>Your Profile</h1>
              <div className={styles.profile__row1}>
                <img
                  className={styles.row1__pfp}
                  src={
                    user.imageUrl
                      ? `http://localhost:5000/${user.imageUrl}`
                      : "https://cdn.onlinewebfonts.com/svg/img_469356.png"
                  }
                  alt=""
                />
                {user !== null && !loading ? (
                  <div className={styles.row1__info}>
                    <p>
                      {/* Making First Letter of Name UpperCase  and rest lowerCase*/}
                      {profileData.username
                        ? `${profileData.username
                            .slice(0, 1)
                            .toUpperCase()}${profileData.username
                            .slice(1, profileData.username.length)
                            .toLowerCase()}`
                        : "Loading..."}
                      <span>
                        #
                        {profileData._id
                          ? profileData._id.slice(0, 5)
                          : "error"}
                      </span>
                    </p>
                    <p>
                      {profileData.firstName
                        ? profileData.firstName
                        : "<first name>"}
                    </p>
                    <p>
                      {profileData.lastName
                        ? profileData.lastName
                        : "<last name>"}
                    </p>
                    <p>{profileData.email}</p>
                    <p>
                      {profileData.campus ? profileData.campus : "<campus>"}
                    </p>
                    <p>{profileData.major ? profileData.major : "<major>"}</p>
                  </div>
                ) : (
                  <Spinner />
                )}
              </div>
              {profileData !== null && !loading ? (
                <div className={styles.profile__row2}>
                  <div>
                    <p>Successful Trades</p>
                    <p
                      style={{
                        color: "#000",
                        fontSize: "1.2rem",
                        fontWeight: "bold",
                      }}
                    >
                      {profileData.successTrades}
                    </p>
                  </div>
                  <div>
                    <p>Profile Average Rating</p>
                    <p
                      style={{
                        color: "#000",
                        fontSize: "1.2rem",
                        fontWeight: "bold",
                      }}
                    >
                      {valueHandler()}
                    </p>
                  </div>
                  <div>
                    <p>Total Adverts</p>
                    <p
                      style={{
                        color: "#000",
                        fontSize: "1.2rem",
                        fontWeight: "bold",
                      }}
                    >
                      {profileData.adverts ? profileData.adverts.length : 0}
                    </p>
                  </div>
                </div>
              ) : (
                <Spinner />
              )}
              <div className={styles.profile__btnrow}>
                <Link to="/advertisehere">
                  <button className={styles.btnrow__newAdvert}>
                    New Advert
                  </button>
                </Link>
                <button
                  className={styles.btnrow__editProfile}
                  onClick={showBackDrop}
                >
                  Edit Profile
                </button>
              </div>
            </div>
            <div className={styles.profilepage__adverts}>
              <h1>Your Adverts</h1>
              <div>
                {profileData.adverts ? (
                  profileData.adverts.map((advert) => (
                    <AdvertCard key={advert._id} advert={advert} />
                  ))
                ) : (
                  <>
                    <p>"No Adverts for this profile"</p>
                  </>
                )}
              </div>
            </div>
            <Footer />
          </div>
        ) : (
          <Spinner />
        )}
      </>
    );
  } else {
    return <Spinner />;
  }
};

export default Profile;
