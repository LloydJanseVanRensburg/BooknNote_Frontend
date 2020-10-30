import React, { useState, useContext, useEffect } from "react";

import styles from "./AllNotes.module.css";

import AdvertContext from "../../../context/adverts/advertContext";
import Spinner from "../../Layout/Spinner/Spinner";
import AdvertCard from "../../Layout/AdvertCard/AdvertCard";

const AllNotes = () => {
  const [notes, setNotes] = useState([]);
  const advertContext = useContext(AdvertContext);
  const { loading, adverts, getAllNotes } = advertContext;

  useEffect(() => {
    getAllNotes();

    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);

    if (adverts !== null && !loading) {
      setNotes(adverts);
    }

    //eslint-disable-next-line
  }, [loading, adverts]);

  if (loading && adverts.length > 0) {
    return <Spinner />;
  }

  return (
    <>
      <h1 style={{ textAlign: "center", margin: "1rem 0" }}>All Notes</h1>
      <div className={styles.allnotes}>
        {!loading && adverts !== null ? (
          notes.map((note) => {
            return <AdvertCard key={note._id} advert={note} />;
          })
        ) : (
          <Spinner />
        )}
      </div>
    </>
  );
};

export default AllNotes;
