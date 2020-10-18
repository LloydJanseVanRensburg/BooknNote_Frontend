import React from "react";

//styles
import styles from "./Home.module.css";

//Components
import Row from "./RowComp/RowComp";
import Footer from "../../Layout/Footer/Footer";

const Home = () => {
  return (
    <div className={styles.homepage}>
      <div className={styles.homepage__outerBanner}>
        <div className={styles.homepage__innerBanner}>
          <h1>The Place To Buy And Sell Your Books And Notes</h1>
        </div>
      </div>
      {/* Row 1 */}
      <Row title="Highest Rated Notes" />
      {/* Row 2 */}
      <Row title="Recently Added Books" />
      {/* Row 3 */}
      <Row title="Recently Added Notes" />
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
