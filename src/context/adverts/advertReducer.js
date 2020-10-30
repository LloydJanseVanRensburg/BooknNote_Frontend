import * as advertTypes from "./advert_types";

export default (state, action) => {
  switch (action.type) {
    case advertTypes.GET_SINGLEPOST_SUCCESS:
      return {
        ...state,
        loading: false,
        currentAd: action.payload,
      };
    case advertTypes.CLEAR_CURRENT_AD:
      return {
        ...state,
        currentAd: null,
        loading: false,
      };
    case advertTypes.GET_SINGLEPOST_ERROR:
      return {
        ...state,
        currentAd: null,
        error: action.payload,
        loading: false,
      };
    case advertTypes.GET_HOMEPAGE_SUCCESS:
      return {
        ...state,
        adverts: action.payload,
        loading: false,
      };
    case advertTypes.CREATE_AD_SUCCESS:
    case advertTypes.UPDATE_AD_SUCCESS:
      return {
        ...state,
        currentAd: action.payload,
        loading: false,
      };
    case advertTypes.CREATE_AD_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case advertTypes.DELETE_AD_SUCCESS:
      return {
        ...state,
        currentAd: null,
        loading: false,
      };
    case advertTypes.GET_ALLBOOK_SUCCESS:
    case advertTypes.GET_ALLNOTES_SUCCESS:
      return {
        ...state,
        adverts: action.payload,
        loading: false,
      };
    case advertTypes.GET_ALLBOOK_ERROR:
    case advertTypes.GET_ALLNOTES_ERROR:
    case advertTypes.UPDATE_AD_ERROR:
    case advertTypes.DELETE_REVIEW_ERROR:
    case advertTypes.GET_HOMEPAGE_ERROR:
    case advertTypes.DELETE_AD_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case advertTypes.CREATE_REVIEW_SUCCESS:
    case advertTypes.DELETE_REVIEW_SUCCESS:
      return {
        ...state,
        currentAd: action.payload,
        loading: false,
      };
    case advertTypes.SEARCH_ADVERTS_SUCCESS:
      return {
        ...state,
        search: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};
