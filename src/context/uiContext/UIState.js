import React, { useReducer } from "react";

import uiReducer from "./uiReducer";
import UIContext from "./uiContext";

import * as uiTypes from "./ui_types";

const UIState = (props) => {
  const initialState = {
    backdrop: false,
  };

  const [state, dispatch] = useReducer(uiReducer, initialState);

  const showBackDrop = () => {
    dispatch({
      type: uiTypes.SHOW_BACKDROP,
    });
  };

  const hideBackDrop = () => {
    dispatch({
      type: uiTypes.HIDE_BACKDROP,
    });
  };

  return (
    <UIContext.Provider
      value={{
        backdrop: state.backdrop,
        showBackDrop,
        hideBackDrop,
      }}
    >
      {props.children}
    </UIContext.Provider>
  );
};

export default UIState;
