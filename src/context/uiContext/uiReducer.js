import * as uiTypes from "./ui_types";

export default (state, action) => {
  switch (action.type) {
    case uiTypes.SHOW_BACKDROP:
      return {
        ...state,
        backdrop: true,
      };
    case uiTypes.HIDE_BACKDROP:
      return {
        ...state,
        backdrop: false,
      };
    default:
      return state;
  }
};
