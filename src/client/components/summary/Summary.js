import React, { Component, Fragment } from "react";
import "./Summary.css";
export default class Summary extends Component {
  render() {
    const [crt_ans, incrct_ans, random_ques] = this.props.summary;
    return (
      <Fragment>
        <h2>SUMMARY</h2>
        <h3 className="summary">Correct Answers: {crt_ans}</h3>
        <h3 className="summary">Incorrect Answers: {incrct_ans}</h3>{" "}
        <h3 className="summary">Questions Answered: {random_ques.length}</h3>{" "}
        <h3 className="summary">
          Final Score: {((crt_ans / random_ques.length) * 100).toFixed(2)}%
        </h3>{" "}
      </Fragment>
    );
  }
}
