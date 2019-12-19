import React, { Component } from "react";

export default class ModalWrapper extends Component {
  constructor(props){
    super(props);
    this.state = {
      'correctAnswerPercentage':null,
      'wrongAnswerPercentage':null,
    };
  }

  closeModal(){
    this.props.onClose();
  }

  componentWillReceiveProps(){
    let propsObj = this.props;
    let correctAnswerPercentage = (propsObj.correctAnswerLength/propsObj.totalQuestions) * 100 + '%';
    let wrongAnswerPercentage = (propsObj.wrongAnswerLength/propsObj.totalQuestions) * 100 + '%';
    console.log(correctAnswerPercentage,wrongAnswerPercentage);
    this.setState({
      correctAnswerPercentage,
      wrongAnswerPercentage,
    });
  }

  render(){
    let rightAnswer = null;
    let wrongAnswer = null;
    if (this.props.correctAnswerLength > 0){
      rightAnswer = <p>{this.props.correctAnswerLength} questions are correct</p>;
    }
    if (this.props.wrongAnswerLength > 0){
      wrongAnswer = <p>{this.props.wrongAnswerLength} questions are wrong</p>;
    }
    if (this.props.isShow){
      return (
        <div className="ModalWrapperOverlay" onClick={this.closeModal.bind(this)}>
          <div className="chartBox">
            <div className="barBox">
              <div style={{height:this.state.correctAnswerPercentage}} className="barCorrect">
                {rightAnswer}
              </div>
              <div style={{height:this.state.wrongAnswerPercentage}} className="barWrong">
                  {wrongAnswer}
              </div>
            </div>
            <div className="contentBox">
              <div className="correctAnswer">
                <div className="labelBox" style={{background:'green'}}></div>
                <p className="labelText">Correct</p>
              </div>
              <div className="wrongAnswer">
                <div className="labelBox" style={{background:'red'}}></div>
                <p className="labelText">Wrong</p>
              </div>
            </div>
          </div>
        </div>
      );
    } else{
      return null;
    }
  }
}
