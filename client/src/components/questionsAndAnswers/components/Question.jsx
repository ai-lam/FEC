import React, { useState, useEffect } from 'react';
import AnswerList from './AnswerList.jsx';
import QuestionList from './QuestionList.jsx';
import _ from 'underscore';


const Question = (props) => {

  const [count, setCount] = useState(2);

  var answerKeys = [];
  var answers = [];
  // console.log(`props.answer: ${props.answer}`);
  props.answer.map(a => {
    // if (a !== undefined) {
    //   answerKeys = Object.keys(a);
    // } else {
    //   answerKeys.push(a);
    // }
    answerKeys = Object.keys(a);
  });
  // console.log(answerKeys);


  answerKeys.map((id) => {
    answers.push(props.answer[0][id]);
  });

  var unsortedAnswers = _.sortBy(answers, 'helpfulness');
  for (let i = 0; i < unsortedAnswers.length; i ++) {
    if (unsortedAnswers[i].answerer_name === 'Seller') {
      unsortedAnswers.push(unsortedAnswers[i]);
      unsortedAnswers.splice(i, 1);
    }
  }

  var sortedAnswers = unsortedAnswers.reverse();
  var displayAnswers = [];

  const addAnswers = () => {
    for (let i = 0; i < count; i++) {
      if (!sortedAnswers[i]) {
        return;
      }
      displayAnswers.push(sortedAnswers[i]);
    }
  };

  if (sortedAnswers.length > 0) {
    addAnswers();
  }

  if (displayAnswers.length === 0) {
    return (
      <div>
        <QuestionList question={props.question} helpfulness={props.helpfulness} name={props.name}
          id={props.id} update={props.update} darkMode={props.darkMode}
        />
      </div>
    );
  } else if (displayAnswers.length < sortedAnswers.length) {
    return (
      <div>
        <QuestionList question={props.question} helpfulness={props.helpfulness} name={props.name}
          id={props.id} update={props.update} darkMode={props.darkMode}
        />
        <AnswerList displayAnswers={displayAnswers} update={props.update} darkMode={props.darkMode}/>
        <div className="expand-collapse-answers" onClick={() => setCount(sortedAnswers.length)}><small>LOAD MORE ANSWERS</small></div >
      </div>
    );
  } else if ((displayAnswers.length === sortedAnswers.length) && sortedAnswers.length > 2) {
    return (
      <div>
        <QuestionList question={props.question} helpfulness={props.helpfulness} name={props.name}
          id={props.id} update={props.update} darkMode={props.darkMode}
        />
        <AnswerList displayAnswers={displayAnswers} update={props.update} darkMode={props.darkMode}/>
        <div className="expand-collapse-answers" onClick={() => setCount(2)}><small>COLLAPSE ANSWERS</small></div>
      </div>
    );
  } else {
    return (
      <div>
        <QuestionList question={props.question} helpfulness={props.helpfulness} name={props.name}
          id={props.id} update={props.update} darkMode={props.darkMode}
        />
        <AnswerList displayAnswers={displayAnswers} update={props.update} darkMode={props.darkMode}/>
      </div>
    );
  }
};

export default Question;