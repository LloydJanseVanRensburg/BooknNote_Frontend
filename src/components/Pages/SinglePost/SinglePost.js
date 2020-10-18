import React from "react";

//stylus
import styles from "./Singlepost.module.css";

//Components
import Footer from "../../Layout/Footer/Footer";

const SinglePost = () => {
  return (
    <>
      <div className={styles.sppage}>
        <div className={styles.sppage__container}>
          <div className={styles.sppage__gridbox}>
            <div className={styles.gridbox__col1}>
              <div className={styles.col1__image}>
                <img
                  src="https://store-images.s-microsoft.com/image/apps.3179.13899725065627034.cde70839-621b-4895-8adf-f523b0117ad5.abc02c28-8d42-4aa4-b4d7-1c63ffe3992e?mode=scale&q=90&h=300&w=300"
                  alt=""
                />
              </div>
              <div className={styles.col1__btngroup}>
                <button className={styles.btngroup__Contact}>
                  Contact Seller
                </button>
                <button className={styles.btngroup__EditBtn}>Edit Post</button>
              </div>
            </div>
            <div className={styles.gridbox__col2}>
              <p className={styles.col2__title}>
                Creative Problem Solving and Management
              </p>
              <p>Subject: BMAN 223</p>
              <p className={styles.col2__description}>
                Business managers might oversee a specific department within a
                large company. In smaller companies, they might oversee all
                departments. In either case, they're the captains that manage
                daily activities, supervise work, and push toward financial and
                operational objectives.
              </p>
              <p className={styles.col2__rating}>Rating: 4/5</p>
              <p className={styles.col2__price}>R 150.00</p>
            </div>
          </div>
          <div className={styles.sppage__reviews}>
            <div className={styles.reviews__flexgroup}>
              <h2 className={styles.flexgroup__title}>Reviews (3)</h2>
              <button className={styles.flexgroup__addBtn}>Add Review</button>
            </div>
            <div className={styles.reviews__container}>
              <div className={styles.reviews__single}>
                <span>Lloyd Janse van Rensburg - 12:52pm 17 Oktober 2020</span>
                <p>4/5</p>
                <p>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Placeat maxime adipisci id provident perspiciatis enim!
                </p>
              </div>
              <div className={styles.reviews__single}>
                <span>Lloyd Janse van Rensburg - 12:52pm 17 Oktober 2020</span>
                <p>4/5</p>
                <p>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Placeat maxime adipisci id provident perspiciatis enim!
                </p>
              </div>
              <div className={styles.reviews__single}>
                <span>Lloyd Janse van Rensburg - 12:52pm 17 Oktober 2020</span>
                <p>4/5</p>
                <p>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Placeat maxime adipisci id provident perspiciatis enim!
                </p>
              </div>
              <div className={styles.reviews__single}>
                <span>Lloyd Janse van Rensburg - 12:52pm 17 Oktober 2020</span>
                <p>4/5</p>
                <p>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Placeat maxime adipisci id provident perspiciatis enim!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SinglePost;
