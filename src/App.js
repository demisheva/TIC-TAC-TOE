import React from "react";
import "./App.css";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      croos: "X",
      zero: "O",
      moveCount: 0,
      squares: Array(9).fill(null),
      winnerLines: [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],

        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],

        [0, 4, 8],
        [2, 4, 6],
      ],
      winCountX: 0,
      winCountO: 0,
      player: "X",
    };
  }

  clickHandler = (event) => {
    let squareNumber = event.target.getAttribute("data-square-number");
    if (event.target.classList.contains("active")) {
      alert("No-no-no, this square is occupied");
    } else {
      if (this.state.moveCount % 2 === 0) {
        event.target.innerText = this.state.croos;
        this.state.squares[squareNumber] = "X";
      } else {
        event.target.innerText = this.state.zero;
        this.state.squares[squareNumber] = "O";
      }
    }
    this.setState({ moveCount: this.state.moveCount + 1 });
    event.target.classList.add("active");
    this.checkWinner();
  };

  checkWinner = () => {
    let win = false;
    let winnerLines = this.state.winnerLines;
    let squares = this.state.squares;
    let filledSquare = this.state.moveCount % 2 === 0 ? "X" : "O";

    for (let index = 0; index < winnerLines.length; index++) {
      if (
        squares[winnerLines[index][0]] === filledSquare &&
        squares[winnerLines[index][1]] === filledSquare &&
        squares[winnerLines[index][2]] === filledSquare
      ) {
        alert(`${filledSquare} win`);
        win = true;
        this.resetGame();
        if (filledSquare == "X") {
          this.setState({ winCountX: this.state.winCountX + 1 });
        } else {
          this.setState({ winCountO: this.state.winCountO + 1 });
        }
      }
    }

    if (this.state.moveCount >= 8 && win === false) {
      alert("zero-sum game");
      this.resetGame();
      return;
    }
  };

  resetGame = () => {
    this.setState({ squares: Array(9).fill(null) });
    this.setState({ moveCount: 0 });
    this.setState({ player: "X" });
    document.querySelectorAll(".cell").forEach((element) => {
      element.innerText = "";
      element.classList.remove("active");
    });
  };


  ChooseFirstMover = (event) => {
    this.resetGame();
    let player = event.target.value;
    if (player == "O") {
      this.setState({ moveCount: 1 });
      this.setState({ player: "O" });
    }
    if (player == "X") {
      this.setState({ moveCount: 0 });
      this.setState({ player: "X" });
    }
  };

  render() {
    return (
      <div className="game-wrapper">
        <div className="game-info">
          <button className="reset-btn" onClick={this.resetGame}>
            Reset Game
          </button>
          <div className="choose-first-move" onChange={this.ChooseFirstMover}>
            Select figure for first move:
            <input type="radio" id="moveX" name="firstMove" value="X"></input>
            <label for="moveX">X</label>
            <input type="radio" id="moveO" name="firstMove" value="O"></input>
            <label for="moveO">O</label>
          </div>
          <div className="win-count">
            Score X:O {this.state.winCountX}:{this.state.winCountO}
          </div>
        </div>

        <div className="tic-tac-toe">
          <div
            className="cell"
            onClick={this.clickHandler}
            data-square-number="0"
          ></div>
          <div
            className="cell"
            onClick={this.clickHandler}
            data-square-number="1"
          ></div>
          <div
            className="cell"
            onClick={this.clickHandler}
            data-square-number="2"
          ></div>
          <div
            className="cell"
            onClick={this.clickHandler}
            data-square-number="3"
          ></div>
          <div
            className="cell"
            onClick={this.clickHandler}
            data-square-number="4"
          ></div>
          <div
            className="cell"
            onClick={this.clickHandler}
            data-square-number="5"
          ></div>
          <div
            className="cell"
            onClick={this.clickHandler}
            data-square-number="6"
          ></div>
          <div
            className="cell"
            onClick={this.clickHandler}
            data-square-number="7"
          ></div>
          <div
            className="cell"
            onClick={this.clickHandler}
            data-square-number="8"
          ></div>
        </div>
      </div>
    );
  }
}

export default App;
