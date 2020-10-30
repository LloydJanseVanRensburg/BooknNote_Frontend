import React, { useReducer, useContext } from "react";

import axios from "axios";

import AdvertContext from "./advertContext";
import AlertContext from "../alerts/alertContext";
import AuthContext from "../auth/authContext";
import advertReducer from "./advertReducer";

import * as advertTypes from "./advert_types";

const AdvertState = (props) => {
  const intialState = {
    adverts: null,
    currentAd: null,
    loading: true,
    error: null,
    search: null,
  };

  const [state, dispatch] = useReducer(advertReducer, intialState);

  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;

  const authContext = useContext(AuthContext);
  const { loadUser } = authContext;

  //@route - GET /adverts/homepage
  //@desc - Get all homepage data from database
  //@access - Public
  const getHomePageData = async () => {
    try {
      const res = await axios.get("http://localhost:5000/adverts/homepage");

      dispatch({
        type: advertTypes.GET_HOMEPAGE_SUCCESS,
        payload: res.data,
      });
    } catch (err) {
      console.log(err.response);
      dispatch({
        type: advertTypes.GET_HOMEPAGE_ERROR,
        payload: err.response.data.msg,
      });
    }
  };

  //@route - GET /adverts/allbooks
  //@desc - Gets all the book adverts
  //@access - Public
  const getAllBooks = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/adverts/allbooks`);

      dispatch({
        type: advertTypes.GET_ALLBOOK_SUCCESS,
        payload: res.data.books,
      });
    } catch (err) {
      console.log(err.response);
      dispatch({
        type: advertTypes.GET_ALLBOOK_ERROR,
        payload: err.response.data.msg,
      });
    }
  };

  //@route - GET /adverts/allnotes
  //@desc - Gets all the note adverts
  //@access - Public
  const getAllNotes = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/adverts/allnotes`);

      console.log(res.data.notes);
      dispatch({
        type: advertTypes.GET_ALLNOTES_SUCCESS,
        payload: res.data.notes,
      });
    } catch (err) {
      console.log(err);
      dispatch({
        type: advertTypes.GET_ALLNOTES_ERROR,
        payload: err.response.data.msg,
      });
    }
  };

  //@route - GET /adverts/search
  //@desc - Query based on searchbar contents
  //@access Public
  const searchAdverts = async (text) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/adverts/search/${text}`
      );

      dispatch({
        type: advertTypes.SEARCH_ADVERTS_SUCCESS,
        payload: res.data.adverts,
      });
    } catch (err) {
      console.log(err);
      dispatch({
        type: advertTypes.SEARCH_ADVERTS_ERROR,
        payload: err.response.data.msg,
      });
    }
  };

  //@route - GET /adverts/singleadvert:id
  //@desc - Get advert by id
  //@access Public
  const loadCurrentAd = async (id) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/adverts/singleadvert/${id}`
      );

      dispatch({
        type: advertTypes.GET_SINGLEPOST_SUCCESS,
        payload: res.data.advert,
      });
    } catch (err) {
      dispatch({
        type: advertTypes.GET_SINGLEPOST_ERROR,
        payload: err.response.data.msg,
      });
    }
  };

  const clearCurrentAd = () => {
    dispatch({
      type: advertTypes.CLEAR_CURRENT_AD,
    });
  };

  //@route - POST /adverts/
  //@desc - create a new post entry in database
  //@access - Private
  const createAdvert = async (formData) => {
    try {
      const res = await axios.post("http://localhost:5000/adverts", formData);

      clearCurrentAd();

      dispatch({
        type: advertTypes.CREATE_AD_SUCCESS,
        payload: res.data.advert,
      });

      setAlert("Advert Create Success", "success");
    } catch (err) {
      const errorPayload = err.response.data.msg || err.response.data.errors;
      errorPayload.forEach((err) => {
        setAlert(err.msg, "danger");
      });
      dispatch({
        type: advertTypes.CREATE_AD_ERROR,
        payload: errorPayload,
      });
    }
  };

  //@route - PUT /adverts/:id
  //@desc - Update post with id
  //@access - Private
  const updateAdvert = async (formData, id) => {
    try {
      const res = await axios.put(
        `http://localhost:5000/adverts/${id}`,
        formData
      );

      dispatch({
        type: advertTypes.UPDATE_AD_SUCCESS,
        payload: res.data.advert,
      });

      clearCurrentAd();
      setAlert("Advert Successfully Updated", "success");
    } catch (err) {
      const errorPayload = err.response.data.msg || err.response.data.errors;
      errorPayload.forEach((err) => {
        setAlert(err.msg, "danger");
      });
      dispatch({
        type: advertTypes.UPDATE_AD_ERROR,
        payload: errorPayload,
      });
    }
  };

  //@route - PUT /adverts/review/new/:advertId
  //@desc - Create new review on post
  //@access Private
  const createReview = async (formData, id) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.put(
        `http://localhost:5000/adverts/review/new/${id}`,
        formData,
        config
      );

      clearCurrentAd();

      dispatch({
        type: advertTypes.CREATE_REVIEW_SUCCESS,
        payload: res.data.advert,
      });

      setAlert("Successfully Created Review", "success");
    } catch (err) {
      const errorPayload = err.response.data.msg || err.response.data.errors;
      setAlert(errorPayload, "danger");
      dispatch({
        type: advertTypes.CREATE_REVIEW_ERROR,
        payload: errorPayload,
      });
    }
  };

  //@route - PUT /adverts/review/remove/:reviewId
  //@desc - Delete review by id
  //@access Private
  const deleteReview = async (id) => {
    try {
      const res = await axios.put(
        `http://localhost:5000/adverts/review/remove/${id}`
      );

      dispatch({
        type: advertTypes.DELETE_REVIEW_SUCCESS,
        payload: res.data.advert,
      });

      setAlert(res.data.msg, "success");
    } catch (err) {
      const errorPayload = err.response.data.msg || err.response.data.errors;
      setAlert(errorPayload, "danger");
      dispatch({
        type: advertTypes.DELETE_REVIEW_ERROR,
        payload: errorPayload,
      });
    }
  };

  //@route - DELETE /adverts/:id
  //@desc - Delete advert with id
  //@access - Private
  const deleteAdvert = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/adverts/${id}`);

      dispatch({
        type: advertTypes.DELETE_AD_SUCCESS,
        payload: id,
      });

      setAlert("Successfully Deleted Post", "success");
      loadUser();
    } catch (err) {
      const errorPayload = err.response.data.msg || err.response.data.errors;

      errorPayload.forEach((err) => {
        setAlert(err.msg, "danger");
      });

      dispatch({
        type: advertTypes.DELETE_AD_ERROR,
        payload: errorPayload,
      });
    }
  };

  return (
    <AdvertContext.Provider
      value={{
        adverts: state.adverts,
        currentAd: state.currentAd,
        error: state.error,
        loading: state.loading,
        search: state.search,
        getHomePageData,
        loadCurrentAd,
        clearCurrentAd,
        createAdvert,
        deleteAdvert,
        getAllBooks,
        updateAdvert,
        createReview,
        deleteReview,
        getAllNotes,
        searchAdverts,
      }}
    >
      {props.children}
    </AdvertContext.Provider>
  );
};

export default AdvertState;
