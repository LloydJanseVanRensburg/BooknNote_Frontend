import React, { useContext, useEffect } from "react";

import styles from "./AllBooks.module.css";

import AdvertContext from "../../../context/adverts/advertContext";
import Spinner from "../../Layout/Spinner/Spinner";
import AdvertCard from "../../Layout/AdvertCard/AdvertCard";

const AllBooks = () => {
  const advertContext = useContext(AdvertContext);
  const { loading, adverts, getAllBooks } = advertContext;

  useEffect(() => {
    getAllBooks();

    //eslint-disable-next-line
  }, []);

  if (!adverts) {
    return <Spinner />;
  }

  return (
    <>
      <h1 style={{ textAlign: "center", margin: "1rem 0" }}>All Books</h1>
      <div className={styles.allbooks}>
        {!loading &&
          adverts.map((book) => {
            console.log(book);
            return <AdvertCard key={book._id} advert={book} />;
          })}
      </div>
    </>
  );
};

export default AllBooks;
