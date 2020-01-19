import React from "react";
import "./Question.css";

export const Question = props => {
  return (
    <h3>
      {props.que_num < 3 &&
        props.random_ques[props.que_num].question
          .replace(/&quot;/gi, '"')
          .replace(/&#039;/gi, "")
          .replace(/&amp;/gi, "&")}
    </h3>
  );
};
