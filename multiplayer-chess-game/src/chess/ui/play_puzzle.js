import React from "react";
import Game from "../model/chess";
import Square from "../model/square";
import { Stage, Layer } from "react-konva";
import Board from "../assets/chessBoard.png";
import Piece from "./piece";
import piecemap from "./piecemap";

class Puzzle extends React.Component {
  state = {
    gameState: new Game(this.props.color),
    draggedPieceTargetId: "", // empty string means no piece is being dragged
    playerTurnToMoveIsWhite: true,
    whiteKingInCheck: false,
    blackKingInCheck: false,
    moves: [],
    gameOver: false,
    gameIndex: -1,
    isMyMove: this.props.color ? true : false,
  };

  getNFTData(){
      // Function to get game state and moves currently taking from props
      this.setState({
          gameState: this.props.initialNFTGameState,
          moves: this.props.moves,
      })
      console.log(this.state.gameState);
      console.log(this.props.moves);
  }

  componentDidMount() {
    console.log(this.props.myUserName);
    console.log(this.props.opponentUserName);
    this.setState({
      moves: this.props.moves,
    });
  }

  startDragging = (e) => {
    this.setState({
      draggedPieceTargetId: e.target.attrs.id,
    });
  };

  movePiece = (selectedId, finalPosition, currentGame, isMyMove, isUndo) => {
    var whiteKingInCheck = false;
    var blackKingInCheck = false;
    var blackCheckmated = false;
    var whiteCheckmated = false;

    console.log("Move made: " + selectedId + " " + finalPosition);
    const update = isUndo
      ? currentGame.undoMove(selectedId, finalPosition, isMyMove)
      : currentGame.movePiece(selectedId, finalPosition, isMyMove);
    console.log(update);
    if (update === "moved in the same position.") {
      return;
    } else if (update === "user tried to capture their own piece") {
      return;
    } else if (update === "b is in check" || update === "w is in check") {
      // change the fill of the enemy king or your king based on which side is in check.
      // play a sound or something
      if (update[0] === "b") {
        blackKingInCheck = true;
      } else {
        whiteKingInCheck = true;
      }
    } else if (
      update === "b has been checkmated" ||
      update === "w has been checkmated"
    ) {
      if (update[0] === "b") {
        blackCheckmated = true;
      } else {
        whiteCheckmated = true;
      }
    } else if (update === "invalid move") {
      return;
    }

    this.props.playAudio();
    var ismove = this.state.isMyMove;
    this.setState({
      draggedPieceTargetId: "",
      gameState: currentGame,
      playerTurnToMoveIsWhite: !this.props.color,
      whiteKingInCheck: whiteKingInCheck,
      blackKingInCheck: blackKingInCheck,
      isMyMove: isUndo ? ismove : !ismove,
    });

    if (blackCheckmated) {
      this.setState({
        gameOver: true,
      });
      alert("WHITE WON BY CHECKMATE!");
    } else if (whiteCheckmated) {
      this.setState({
        gameOver: true,
      });
      alert("BLACK WON BY CHECKMATE!");
    }
  };

  endDragging = (e) => {
    const currentGame = this.state.gameState;
    const currentBoard = currentGame.getBoard();
    const finalPosition = this.inferCoord(
      e.target.x() + 90,
      e.target.y() + 90,
      currentBoard
    );
    const selectedId = this.state.draggedPieceTargetId;
    this.movePiece(selectedId, finalPosition, currentGame, true);
  };

  revertToPreviousState = (selectedId) => {
    /**
     * Should update the UI to what the board looked like before.
     */
    const oldGS = this.state.gameState;
    const oldBoard = oldGS.getBoard();
    const tmpGS = new Game(true);
    const tmpBoard = [];

    for (var i = 0; i < 8; i++) {
      tmpBoard.push([]);
      for (var j = 0; j < 8; j++) {
        if (oldBoard[i][j].getPieceIdOnThisSquare() === selectedId) {
          tmpBoard[i].push(new Square(j, i, null, oldBoard[i][j].canvasCoord));
        } else {
          tmpBoard[i].push(oldBoard[i][j]);
        }
      }
    }

    // temporarily remove the piece that was just moved
    tmpGS.setBoard(tmpBoard);

    this.setState({
      gameState: tmpGS,
      draggedPieceTargetId: "",
    });

    this.setState({
      gameState: oldGS,
    });
  };

  inferCoord = (x, y, chessBoard) => {
    // console.log("actual mouse coordinates: " + x + ", " + y)
    /*
            Should give the closest estimate for new position. 
        */
    var hashmap = {};
    var shortestDistance = Infinity;
    for (var i = 0; i < 8; i++) {
      for (var j = 0; j < 8; j++) {
        const canvasCoord = chessBoard[i][j].getCanvasCoord();
        // calculate distance
        const delta_x = canvasCoord[0] - x;
        const delta_y = canvasCoord[1] - y;
        const newDistance = Math.sqrt(delta_x ** 2 + delta_y ** 2);
        hashmap[newDistance] = canvasCoord;
        if (newDistance < shortestDistance) {
          shortestDistance = newDistance;
        }
      }
    }

    return hashmap[shortestDistance];
  };

  makeNextMove = () => {
    var index = this.state.gameIndex;
    this.setState({
      gameIndex: index + 1,
    });
    index++;
    console.log(index);
    console.log(this.state.isMyMove);
    this.movePiece(
      this.state.moves[index].selectedId,
      this.state.moves[index].finalPosition,
      this.state.gameState,
      this.state.isMyMove,
      false
    );
  };

  goToPreviousMove = () => {
    var index = this.state.gameIndex;
    var move = this.state.isMyMove;
    this.setState({
      gameIndex: index - 1,
      isMyMove: !move,
    });
    console.log(index);
    console.log(this.state.isMyMove);
    this.movePiece(
      this.state.moves[index].selectedId,
      this.state.moves[index].finalPosition,
      this.state.gameState,
      this.state.isMyMove,
      true
    );
  };

  submit = () => {
    console.log(this.state.moves);
    console.log(this.state.startIndexOfNFT);
    console.log(this.state.endIndexOFNFT);
    console.log(this.state.initialNFTGameState);
  };

  makeStart = () => {
    var index = this.state.gameIndex;
    console.log("Setting start NFT stage to " + index);
    this.setState({
      startIndexOfNFT: index,
      initialNFTGameState: this.state.gameState,
    });
  };

  makeEnd = () => {
    var index = this.state.gameIndex;
    console.log("Setting end of NFT stage to " + index);
    this.setState({
      endIndexOFNFT: index,
    });
  };

  render() {
    // console.log(this.state.gameState.getBoard())
    //  console.log("it's white's move this time: " + this.state.playerTurnToMoveIsWhite)
    /*
            Look at the current game state in the model and populate the UI accordingly
        */
    // console.log(this.state.gameState.getBoard())
    return (
      <div className="Home">
        <button onClick={this.makeNextMove}>Next</button>
        <button onClick={this.goToPreviousMove}>Previous</button>
        <button onClick={this.submit}>Submit</button>
        <button onClick={this.makeStart}>NFTStart</button>
        <button onClick={this.makeEnd}>NFTEnd</button>
        <h1>Start move : {this.state.startIndexOfNFT} </h1>
        <h1>End move: {this.state.endIndexOFNFT} </h1>
        <React.Fragment>
          <div
            style={{
              backgroundImage: `url(${Board})`,
              width: "720px",
              height: "720px",
            }}
          >
            <Stage width={720} height={720}>
              <Layer>
                {this.state.gameState.getBoard().map((row) => {
                  return (
                    <React.Fragment>
                      {row.map((square) => {
                        if (square.isOccupied()) {
                          return (
                            <Piece
                              x={square.getCanvasCoord()[0]}
                              y={square.getCanvasCoord()[1]}
                              imgurls={piecemap[square.getPiece().name]}
                              isWhite={square.getPiece().color === "white"}
                              draggedPieceTargetId={
                                this.state.draggedPieceTargetId
                              }
                              onDragStart={this.startDragging}
                              onDragEnd={this.endDragging}
                              id={square.getPieceIdOnThisSquare()}
                              thisPlayersColorIsWhite={this.props.color}
                              playerTurnToMoveIsWhite={
                                this.state.playerTurnToMoveIsWhite
                              }
                              whiteKingInCheck={this.state.whiteKingInCheck}
                              blackKingInCheck={this.state.blackKingInCheck}
                              boardInteractive={false}
                            />
                          );
                        }
                        return;
                      })}
                    </React.Fragment>
                  );
                })}
              </Layer>
            </Stage>
          </div>
        </React.Fragment>
      </div>
    );
  }
}

export default Puzzle;
