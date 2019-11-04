import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) { //This is a function component, a component only with a render method 
  return (
    <button 
      className="square" 
      onClick={props.onClick} // The onClick function by the Board is called 
    >
      {props.value}
    </button>
  );
}

// immutability makes complex features become simple 
// since we keep creating copies of the same data (with modifications), we can access a history of our actions/data 
// let's use keep previous versions of the games history intact and reuse them later, not only particular for games but real world apps

// good for detecting changes 
// if immutable object that is being referenced is different than the previous one, than the object has changed 

// main benefit of immutability : build PURE COMPONENTS 
// immutable data helps us determine when a component requires re-rendering 

// read more about: shouldComponentUpdate() and read: Optimizing Performance 

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null), //the boards initial state contains an array of 9 nulls corresponding to 9 squares 
      xIsNext: true,
    };
  }

  handleClick(i) {
    const squares = this.state.squares.slice(); // creating a copy of squares array 
    if (calculateWinner(squares) || squares[i]) {
      return; 
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O'; 
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
    });
  }

  renderSquare(i) {
    return (
      <Square 
        value={this.state.squares[i]} 
        onClick={() => this.handleClick(i)}
      />
    );
  }

  render() {
    const winner = calculateWinner(this.state.squares);
    let status;
    if (winner) {
      status = 'Winner: ' + winner; 
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O')
    }

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      xIsNext: true,
    }
  }

  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
