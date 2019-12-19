import React, { Component } from "react";
import QuestionStrip from "./components/question-strip";
import { DummyData } from "./data";
import ModalWrapper from "./components/modal-wrapper";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      answers: {},
      json: DummyData,
      fakeValue: "fakeValue",
      fakeValueBoolean: true,
      correctAnswerLength: 0,
      wrongAnswerLength: 0,
      modalShow: false
    };
  }

  finalAnswer(answer) {
    let answers = this.state.answers;
    answers[answer.questionId] = answer.answer;
    this.setState({
      answers: answers
    });
    // console.log(this.state.answers);
  }

  modalToggle() {
    this.setState({
      modalShow: !this.state.modalShow
    });
    if (this.state.fakeValueBoolean) {
      this.setState({
        fakeValue: "",
        fakeValueBoolean: false
      });
    } else {
      this.setState({
        fakeValue: "fakeValue",
        fakeValueBoolean: true
      });
    }
  }

  SubmitAnswer(event) {
    event.preventDefault();
    let answersObj = this.state.answers;
    if (DummyData.length === Object.keys(answersObj).length) {
      var trueAnswers = [],
        falseAnswers = [];
      DummyData.forEach(data => {
        if (data["correctAnswer"] === answersObj[data["questionId"]]) {
          trueAnswers.push(data);
        } else {
          falseAnswers.push(data);
        }
      });
      this.setState(
        {
          correctAnswerLength: trueAnswers.length,
          wrongAnswerLength: falseAnswers.length,
          answers: {}
        },
        function() {
          this.modalToggle();
        }
      );
    } else {
      DummyData.forEach(data => {
        if (!answersObj[data["questionId"]]) {
          let elem = document.getElementById(data["questionId"]);
          elem.style.background = "pink";
        }
      });
    }
  }

  ClearAnswer(event) {
    event.preventDefault();
    if (this.state.fakeValueBoolean) {
      this.setState({
        fakeValue: "",
        fakeValueBoolean: false
      });
    } else {
      this.setState({
        fakeValue: "fakeValue",
        fakeValueBoolean: true
      });
    }
  }

  render() {
    return (
      <section className="mainPage">
        <div className="verticalStrip">
          <form onSubmit={this.SubmitAnswer.bind(this)}>
            {this.state.json.map((question, i) => {
              return (
                <QuestionStrip
                  key={i}
                  question={question}
                  onAnswerSelected={this.finalAnswer.bind(this)}
                  fakeValue={this.state.fakeValue}
                />
              );
            })}
            <div className="ButtonBox">
              <button type="submit">Submit</button>
              <button onClick={this.ClearAnswer.bind(this)}>Clear</button>
            </div>
          </form>
        </div>
        <ModalWrapper
          isShow={this.state.modalShow}
          onClose={this.modalToggle.bind(this)}
          correctAnswerLength={this.state.correctAnswerLength}
          wrongAnswerLength={this.state.wrongAnswerLength}
          totalQuestions={this.state.json.length}
        />
      </section>
    );
  }
}

export default App;
