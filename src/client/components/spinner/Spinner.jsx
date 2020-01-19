import React from "react";
import spinner from "../../images/spinner.gif";
import "./Spinner.css";

export const Spinner = () => {
  return (
    <div className="container" style={{ height: "100vh" }}>
      <img src={spinner} height="200px" width="200px" alt="fetching data" />
    </div>
  );
};
