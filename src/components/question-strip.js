import React, { Component } from "react";
import PowerSelect from './power-select';
import ReactDOM from 'react-dom'

export default class QuestionStrip extends Component {

  constructor(props){
    super(props);
    this.state = {
            'selectOption': props.question.options,
    };
  }

  SelectedAnswer(answer){
    let node = ReactDOM.findDOMNode( this );
    node.style.background ="transparent";
    this.props.onAnswerSelected(answer)
  }

   render() {
     return (
       <div id={this.props.question.questionId} className="QuestionStrip" ref>
         <p className="question">{this.props.question.questionId}. {this.props.question.question}</p>
         <PowerSelect
           questionId={this.props.question.questionId}
           options={this.state.selectOption}
           onSelectAnswer={this.SelectedAnswer.bind(this)}
           fakeValue={this.props.fakeValue}
         />
       </div>
     )
   }
};
