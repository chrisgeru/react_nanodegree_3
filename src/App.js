import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

function Score(props) {
    return (
        <div>
            <button onClick={() => props.handleOnClick(true)}>True</button>
            <button onClick={() => props.handleOnClick(false)}>False</button>
            <p className="text">
                Your Score: {props.numCorrect}/{props.numQuestions}
            </p>
        </div>
    )
}

const returnValues = () => {
    const value1 = Math.floor(Math.random() * 100);
    const value2 = Math.floor(Math.random() * 100);
    const value3 = Math.floor(Math.random() * 100);
    return {
        value1: value1,
        value2: value2,
        value3: value3,
        correctAnswer: value1 + value2 + value3,
        proposedAnswer: Math.floor(Math.random() * 3) + value1 + value2 + value3
    }
};

class MentalGame extends Component {

    state = {
        numQuestions: 0,
        numCorrect: 0,
        ...returnValues()
    };

    compareAnswer = answer => {
        const areEqual = this.state.correctAnswer === this.state.proposedAnswer;
        const playerAnswer = answer === areEqual;
        console.log(`A soma correta é ${this.state.correctAnswer}. Você ${playerAnswer ? "ACERTOU" : "ERROU"}`);
        this.setState((previousState) => {
            return {
                'numQuestions': previousState.numQuestions + 1,
                'numCorrect': playerAnswer ? previousState.numCorrect + 1 : previousState.numCorrect,
                ...returnValues()
            }
        })
    };

    render() {
        return <div className="game">
            <h2>Mental Math</h2>
            <div className="equation">
                <p className="text">{`${this.state.value1} + ${this.state.value2} + ${this.state.value3} = ${this.state.proposedAnswer}`}</p>
            </div>
            <Score numCorrect={this.state.numCorrect} numQuestions={this.state.numQuestions}
                   handleOnClick={this.compareAnswer}/>
        </div>;
    }
}

class App extends Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h1 className="App-title">ReactND - Coding Practice</h1>
                </header>
                <MentalGame/>
            </div>
        );
    }
}

export default App;
