import React from "react";
import PuzzleListItem from "../components/PuzzleListItem";
import Header from "../components/Header";
import Puzzle from "../chess/ui/play_puzzle";
import Game from "../chess/model/chess";

class PuzzlePage extends React.Component {
  state = {
    puzzles: [],
    isPuzzleClicked: false,
    puzzleMoves: [],
    gameState: null,
  };

  componentDidMount() {
    console.log("Fetch puzzles from db");
    this.addDummyPuzzles();
  }

  addDummyPuzzles() {
    var data = [];
    for (let i = 0; i < 10; i++) {
      data.push({
        //Add NFT table ds here
        name: "Vaibhav's Gambit",
        moves: [
          { selectedId: "wp4", finalPosition: [465, 555] },
          { selectedId: "bn1", finalPosition: [555, 555] },
          { selectedId: "wb2", finalPosition: [285, 465] },
          { selectedId: "bp1", finalPosition: [645, 555] },
          { selectedId: "wq1", finalPosition: [555, 555] },
          { selectedId: "bb1", finalPosition: [645, 645] },
          { selectedId: "wq1", finalPosition: [555, 195] },
        ],
        startIndex: 2,
        endIndex: 6,
        color: true,
      });
    }
    console.log(data);
    this.setState({
      puzzles: data,
    });
  }

  toChessMove(finalPosition, to2D) {
    let move;

    if (finalPosition[0] > 100) {
      move =
        this.toAlphabet[to2D[finalPosition[0]]] +
        this.toCoord[to2D[finalPosition[1]]];
    } else {
      move = this.toAlphabet[finalPosition[0]] + this.toCoord[finalPosition[1]];
    }

    console.log("proposed move: " + move);
    return move;
  }

  setCurrentPuzzle = (data) => {
    console.log('Set puzzle');
    console.log(data);
    var thisgame = new Game(data.color);
    var moves = data.moves;
    var isMyMove = true;
    for (let i = 0; i < data.startIndex && i < data.moves.length; i++) {
      console.log("Inside loop");
      const update = thisgame.movePiece(
        data.moves[i].selectedId,
        data.moves[i].finalPosition,
        isMyMove
      );
      console.log(update);
      isMyMove = !isMyMove;
    }
    moves = moves.slice(data.startIndex , data.endIndex + 1);
    this.setState({
      gameState: thisgame,
      puzzleMoves: moves,
      isPuzzleClicked: true,
    })
  }

  removeFromList(props) {
    //Remove this challenge from list if being played
    console.log("click");
    window.open(props.url);
  }

  render() {
    return this.state.isPuzzleClicked ? (
      <Puzzle moves={this.state.puzzleMoves} gameState={this.state.gameState} />
    ) : (
      <div className="Home">
        {console.log(this.props.accounts)}
        <Header accounts={this.props.accounts} />
        <div className="header__navbar">
          <h1>Puzzles</h1>
        </div>
        {this.state.puzzles.map((data, id) => {
          console.log(data);
          return <PuzzleListItem data={data} onClick={this.setCurrentPuzzle} />;
        })}
      </div>
    );
  }
}

export default PuzzlePage;
