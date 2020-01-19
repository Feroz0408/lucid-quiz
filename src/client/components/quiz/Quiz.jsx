import React, { Component, Fragment } from "react";
import "./Quiz.css";
import Summary from "../summary/Summary";
import { Spinner } from "../spinner/Spinner";
import { Question } from "../question/Question";

export default class Quiz extends Component {
  constructor() {
    super();
    this.state = {
      que_num: 0,
      crct_ans: 0,
      incrct_ans: 0,
      random_ques: [],
      ans: ""
    };
  }

  // fetching the questions from the server
  async componentDidMount() {
    try {
      await fetch("/api/questions")
        .then(res => res.json())
        .then(data => this.getRandomQuestions(data.results));
    } catch (e) {
      console.error(e.message);
    }
  }

  //Creating Random questions and randomizing the options
  getRandomQuestions = questions => {
    let random_ques = this.state.random_ques;
    while (random_ques.length < 3) {
      const index = questions[Math.floor(Math.random() * questions.length)];
      if (random_ques.includes(index)) continue;
      let options =
        index.incorrect_answers &&
        index.incorrect_answers
          .concat(index.correct_answer)
          .sort(() => Math.random() - 0.5);
      index["options"] = options;
      random_ques.push(index);
    }
    this.setState({ random_ques: random_ques });
  };

  // storing the results and incrementing the question
  onNext = () => {
    const [que_num, crct_ans, incrct_ans, random_ques, ans] = [
      this.state.que_num,
      this.state.crct_ans,
      this.state.incrct_ans,
      this.state.random_ques,
      this.state.ans
    ];
    if (
      random_ques[que_num].correct_answer.toLowerCase() === ans.toLowerCase()
    ) {
      this.setState({
        crct_ans: crct_ans + 1,
        que_num: que_num + 1,
        ans: ""
      });
    } else {
      this.setState({
        incrct_ans: incrct_ans + 1,
        que_num: que_num + 1,
        ans: ""
      });
    }
  };

  // Resetting the state and quiz by reloading the page
  retakeQuiz = () => {
    window.location.reload(false);
  };

  render() {
    const [que_num, crct_ans, incrct_ans, random_ques, ans] = [
      this.state.que_num,
      this.state.crct_ans,
      this.state.incrct_ans,
      this.state.random_ques,
      this.state.ans
    ];
    if (this.state.random_ques.length < 1) {
      return <Spinner />;
    }
    return (
      <Fragment>
        <h1>Welcome To Lucid's UI Assessment</h1>
        <div className="container">
          <div className="quiz-box">
            <Question que_num={que_num} random_ques={random_ques} />

            {que_num < 3 &&
              random_ques[que_num].type !== "text" &&
              random_ques[que_num].options.map((option, i) => {
                return (
                  <label key={i} onClick={() => this.setState({ ans: option })}>
                    <input
                      type="radio"
                      checked={ans === option}
                      readOnly={true}
                    />
                    {option
                      .replace(/&quot;/gi, '"')
                      .replace(/&#039;/gi, "'")
                      .replace(/&amp;/gi, "&")}
                    <br />
                  </label>
                );
              })}

            {que_num < 3 ? (
              random_ques[que_num].type === "text" && (
                <input
                  className="input-text"
                  onChange={e => this.setState({ ans: e.target.value })}
                  placeholder="Enter your answer"
                />
              )
            ) : (
              <Summary summary={[crct_ans, incrct_ans, random_ques]} />
            )}
            <br />
            {que_num !== 3 ? (
              <button onClick={() => this.onNext()}>Next</button>
            ) : (
              <button onClick={() => this.retakeQuiz()}>Restart Quiz</button>
            )}
          </div>
        </div>
      </Fragment>
    );
  }
}
