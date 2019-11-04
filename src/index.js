import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Square extends React.Component { //Each of these is a react component 
  render() {
    return (
      <button 
        className="square" 
        onClick={() => this.props.onClick()} // The onClick function by the Board is called 
      >
        {this.props.value}
      </button>
    );
  }
}

// immutability makes complex features become simple 
// since we keep creating copies of the same data (with modifications), we can access a history of our actions/data 
// let's use keep previous versions of the games history intact and reuse them later, not only particular for games but real world apps

// good for detecting changes 
// if immutable object that is being referenced is different than the previous one, than the object has changed 

// main benefit of immutability : build PURE COMPONENTS 

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null), //the boards initial state contains an array of 9 nulls corresponding to 9 squares 
    };
  }

  handleClick(i) {
    const squares = this.state.squares.slice(); // creating a copy of squares array 
    squares[i] = 'X';
    this.setState({squares: squares});
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
    const status = 'Next player: X';

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

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
