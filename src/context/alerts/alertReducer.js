import * as alertTypes from "./alert_types";

export default (state, action) => {
  switch (action.type) {
    case alertTypes.SET_ALERT:
      console.log();
      return [...state, action.payload];
    case alertTypes.REMOVE_ALERT:
      return state.filter((alert) => alert.id !== action.payload);
    default:
      return state;
  }
};
