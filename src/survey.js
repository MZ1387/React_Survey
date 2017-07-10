import React, { Component } from 'react';

var firebase= require('firebase');
var uuid = require('uuid');

var config = {
  apiKey: "AIzaSyDMNWaSiKEceWToASpz_PI3Vv6DSlOEhyo",
  authDomain: "react-survey-93d4b.firebaseapp.com",
  databaseURL: "https://react-survey-93d4b.firebaseio.com",
  projectId: "react-survey-93d4b",
  storageBucket: "react-survey-93d4b.appspot.com",
  messagingSenderId: "940229047386"
};

firebase.initializeApp(config);

class Survey extends Component {
  constructor(props) {
    super(props);

    this.state = {
      uid: uuid.v1(),
      studentName: '',
      answers: {
        answer1: '',
        answer2: '',
        answer3: ''
      },
      isSubmitted: false
    };

    this.nameSubmit = this.nameSubmit.bind(this);
    this.answerSelected = this.answerSelected.bind(this);
    this.questionSubmit = this.questionSubmit.bind(this);
  }

  nameSubmit(event) {
    var studentName = this.refs.name.value;
    this.setState({ studentName }, function() {
      console.log(this.state);
    });
  }

  answerSelected(event) {
    var answers =this.state.answers;

    if (event.target.name === 'answer1') {
      answers.answer1 = event.target.value;
    } else if (event.target.name === 'answer2') {
      answers.answer2 = event.target.value;
    } else if (event.target.name === 'answer3') {
      answers.answer3 = event.target.value;
    }

    this.setState({ answers }, function() {
      console.log(this.state);
    })
  }

  questionSubmit() {
    firebase.database().ref(`survey/${this.state.uid}`).set({
      studentName: this.state.studentName,
      answers: this.state.answers
    });

    this.setState({isSubmitted: true});
  }


  render() {
    var studentName;
    var questions;

    if (this.state.studentName === '' && this.state.isSubmitted === false) {
      studentName = (
        <div>
          <h1>What is your name?</h1>
          <form onSubmit={this.nameSubmit}>
            <input type='text' placeholder='Enter Name' ref='name' />
          </form>
        </div>
      );

      questions = '';

    } else if (this.state.studentName !== '' && this.state.isSubmitted === false) {

      studentName = (<h1>Welcome, {this.state.studentName}</h1>);
      questions = (
        <div>
          <h2>Here are some questions:</h2>
          <form onSubmit={this.questionSubmit}>
            <div>
              <label>What's your first language?</label><br />
              <input type='radio' name='answer1' value='Spanish' onChange={this.answerSelected} />Spanish
              <input type='radio' name='answer1' value='English' onChange={this.answerSelected} />English
              <input type='radio' name='answer1' value='French' onChange={this.answerSelected} />French
            </div>
            <div>
              <label>Have you traveled?</label><br />
              <input type='radio' name='answer2' value='Yes' onChange={this.answerSelected} />Yes
              <input type='radio' name='answer2' value='No' onChange={this.answerSelected} />No
            </div>
            <div>
              <label>Do you want to learn a new language?</label><br />
              <input type='radio' name='answer3' value='Yes' onChange={this.answerSelected} />Yes
              <input type='radio' name='answer3' value='No' onChange={this.answerSelected} />No
              <input type='radio' name='answer3' value='Maybe' onChange={this.answerSelected} />Maybe
            </div>
            <input type='submit' value='submit' />
          </form>
        </div>
      );
    } else if (this.state.isSubmitted === true && this.state.studentName !== '') {
      studentName = (
        <h1>Thanks, {this.state.studentName}</h1>
      );
    }

    return (
      <div>
        {studentName}
        ---------------------------------------
        {questions}
      </div>
    );
  }
}

export default Survey;
