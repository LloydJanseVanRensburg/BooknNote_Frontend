import React, { Fragment } from "react";
import spinner from "./spinner02.gif";

export default () => (
  <Fragment>
    <img
      src={spinner}
      alt="Loading..."
      style={{ width: "200px", margin: "3rem auto", display: "block" }}
    />
  </Fragment>
);
