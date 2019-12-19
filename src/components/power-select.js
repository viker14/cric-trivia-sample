import React, { Component } from "react";

export default class PowerSelect extends Component {

   constructor(props) {
    super( props );
    // var selectedAnswer = this.getSelectedAnswer(this.props);
    this.state = {
            'options':this.props.options,
            'fakeValue':this.props.fakeValue,
    };
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.fakeValue !== this.props.fakeValue){
      this.setState({
        'selectedAnswer':'fakeValue',
      });
    }
  }

  handleChange(e){
    let answer={
      'questionId':this.props.questionId,
      'answer':e.target.value,
    }
    this.props.onSelectAnswer(answer);
    this.setState(
      {'selectedAnswer': e.target.value}
    );
  }

  render(){
    let options = this.state.options.map((option,i) => {
      return (
        <option key={i} value={option}>{option}</option>
      );
    });
    return (
        <select className="form-control"
            value={this.state.selectedAnswer}
            onChange={this.handleChange.bind(this)}>
          <option value={this.state.fakeValue} hidden>Choose here</option>
          {options}
        </select>
    );
  }
}
