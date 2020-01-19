import React, { Component, Fragment } from "react";
import "./Summary.css";
export default class Summary extends Component {
  render() {
    const [crt_ans, incrct_ans, random_que] = this.props.summary;
    return (
      <Fragment>
        <h2>SUMMARY</h2>
        <h3 className="summary">Correct Answers: {crt_ans}</h3>
        <h3 className="summary">Incorrect Answers: {incrct_ans}</h3>{" "}
        <h3 className="summary">Questions Answered: {random_que.length}</h3>{" "}
        <h3 className="summary">
          Final Score: {((crt_ans / random_que.length) * 100).toFixed(2)}%
        </h3>{" "}
      </Fragment>
    );
  }
}
