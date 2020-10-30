import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";

//styles
import styles from "./Home.module.css";

//Components
import Row from "./RowComp/RowComp";
import Footer from "../../Layout/Footer/Footer";
import AdvertContext from "../../../context/adverts/advertContext";
import Spinner from "../../Layout/Spinner/Spinner";

const Home = () => {
  const advertContext = useContext(AdvertContext);
  const { loading, adverts, getHomePageData, getAllBooks } = advertContext;

  useEffect(() => {
    window.scrollTo(0, 0);
    getHomePageData();

    //eslint-disable-next-line
  }, []);

  const onViewBooks = () => {
    console.log("All Books");
    getAllBooks();
  };

  const onViewNotes = () => {
    console.log("All Notes");
  };

  const onViewRatedNotes = () => {
    console.log("All Rated Notes");
  };

  if (loading) {
    return <Spinner />;
  } else {
    return (
      <div className={styles.homepage}>
        <div className={styles.homepage__outerBanner}>
          <div className={styles.homepage__innerBanner}>
            <h1>The Place To Buy And Sell Your Books And Notes</h1>
          </div>
        </div>
        {!loading ? (
          <>
            <Row title="Highest Rated Notes" data={adverts[0]} />
            <div
              className={styles.rowcomp__viewMore}
              onClick={onViewRatedNotes}
            >
              <Link to="/allnotes" className={styles.viewMore__btn}>
                View More
              </Link>
            </div>
            <Row title="Recently Added Books" data={adverts[1]} />
            <div className={styles.rowcomp__viewMore} onClick={onViewBooks}>
              <Link to="/allbooks" className={styles.viewMore__btn}>
                View More
              </Link>
            </div>
            <Row title="Recently Added Notes" data={adverts[2]} />
            <div className={styles.rowcomp__viewMore} onClick={onViewNotes}>
              <Link to="/allnotes" className={styles.viewMore__btn}>
                View More
              </Link>
            </div>
          </>
        ) : (
          <Spinner />
        )}

        <Footer />
      </div>
    );
  }
};

export default Home;
