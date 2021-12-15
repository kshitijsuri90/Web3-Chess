import React from "react";
import Game from "../model/chess";
import Square from "../model/square";
import { Stage, Layer } from "react-konva";
import Board from "../assets/chessBoard.png";
import Piece from "./piece";
import piecemap from "./piecemap";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import SimpleCountdownTimer from "../../components/Timer";
import Divider from "@mui/material/Divider";
import Button from "../../components/Button";

class Puzzle extends React.Component {
  state = {
    gameState: this.props.gameState,
    draggedPieceTargetId: "", // empty string means no piece is being dragged
    playerTurnToMoveIsWhite: this.props.gameState.thisPlayersColorIsWhite,
    whiteKingInCheck: false,
    blackKingInCheck: false,
    moves: this.props.moves,
    gameOver: false,
    gameIndex: 0,
    messageID: "Start Puzzle!",
  };

  componentDidMount() {
    // console.log(this.props);
    // console.log(this.state);
    var gameState = this.state.gameState;
    gameState.moves = this.props.moves;
    this.setState({
      gameState: gameState,
    });
    console.log(this.state);
  }

  startDragging = (e) => {
    console.log("startDragging");
    this.setState({
      draggedPieceTargetId: e.target.attrs.id,
    });
  };

  movePiece = (selectedId, finalPosition, currentGame, isMyMove) => {
    var whiteKingInCheck = false;
    var blackKingInCheck = false;
    var blackCheckmated = false;
    var whiteCheckmated = false;
    console.log(this.state.gameState);
    console.log("Move made: " + selectedId + " " + finalPosition);
    var index = this.state.gameIndex;
    if (index > this.state.moves.length) {
      console.log("out of bounds");
      return;
    }
    var nextID = this.state.moves[index].selectedId;
    var nextPos = this.state.moves[index].finalPosition;
    console.log(nextID + " " + selectedId);
    if(nextID != selectedId){
      this.revertToPreviousState(selectedId);
      this.setState({
        messageID: "Not the best move"
      });
      return;
    }
    console.log(nextPos + " " + finalPosition);
    if (JSON.stringify(nextPos) != JSON.stringify(finalPosition)) {
      this.revertToPreviousState(selectedId);
      this.setState({
        messageID: "Not the best move",
      });
      return;
    }
    const update = currentGame.movePiece(selectedId, finalPosition, isMyMove);
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
      this.revertToPreviousState(selectedId);
      return;
    }

    var index = this.state.gameIndex;
    var playerMove = this.state.playerTurnToMoveIsWhite;
    this.setState({
      draggedPieceTargetId: "",
      gameState: currentGame,
      playerTurnToMoveIsWhite: !playerMove,
      whiteKingInCheck: whiteKingInCheck,
      blackKingInCheck: blackKingInCheck,
      gameIndex: index + 1,
      messageID: "Woah, Keep going!",
    });

    if(index + 1 == this.state.moves.length){
      alert("Hurray you won!");
      this.setState({
        gameOver: true,
        messageID: "Congratulations! You have successfully completed this puzzle!",
      });
      return;
    }
    if (blackCheckmated) {
      this.setState({
        gameOver: true,
        messageID: "Hurray you won!",
      });
      alert("Hurray you won!");
    } else if (whiteCheckmated) {
      this.setState({
        gameOver: true,
        messageID: "Hurray you won!",
      });
      alert("Hurray you won!");
    }

    //Do opponent move
    if (index + 1 >= this.state.moves.length) {
      console.log("Puzzle Over");
      return;
    }
    selectedId = this.state.moves[index + 1].selectedId;
    finalPosition = this.state.moves[index + 1].finalPosition;
    console.log("Move made: " + selectedId + " " + finalPosition);
    const update1 = currentGame.movePiece(
      selectedId,
      finalPosition,
      !isMyMove
    );
    console.log(update1);
    if (update1 === "moved in the same position.") {
      return;
    } else if (update1 === "user tried to capture their own piece") {
      return;
    } else if (update1 === "b is in check" || update === "w is in check") {
      // change the fill of the enemy king or your king based on which side is in check.
      // play a sound or something
      if (update1[0] === "b") {
        blackKingInCheck = true;
      } else {
        whiteKingInCheck = true;
      }
    } else if (
      update1 === "b has been checkmated" ||
      update1 === "w has been checkmated"
    ) {
      if (update1[0] === "b") {
        blackCheckmated = true;
      } else {
        whiteCheckmated = true;
      }
    } else if (update1 === "invalid move") {
      this.revertToPreviousState(selectedId);
      return;
    }

    var index = this.state.gameIndex;

    this.setState({
      draggedPieceTargetId: "",
      gameState: currentGame,
      playerTurnToMoveIsWhite: playerMove,
      whiteKingInCheck: whiteKingInCheck,
      blackKingInCheck: blackKingInCheck,
      gameIndex: index + 1,
    });

    if (index + 1 >= this.state.moves.length) {
      console.log("Hurray, you won!");
      this.setState({
        messageID: "Congratulations! You have successfully completed this puzzle!",
      })
      return;
    }

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
    console.log("endDragging");
    const currentGame = this.state.gameState;
    const currentBoard = currentGame.getBoard();
    const finalPosition = this.inferCoord(
      e.target.x() + 90,
      e.target.y() + 90,
      currentBoard
    );
    const selectedId = this.state.draggedPieceTargetId;
    this.movePiece(
      selectedId,
      finalPosition,
      currentGame,
      true
    );
  };

  revertToPreviousState = (selectedId) => {
    /**
     * Should update the UI to what the board looked like before.
     */
    const oldGS = this.state.gameState;
    const oldBoard = oldGS.getBoard();
    const tmpGS = new Game(this.props.gameState.thisPlayersColorIsWhite);
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

  render() {
    return (
      <Box
        sx={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          paddingTop: "80px",
          paddingLeft: "50px",
          justifyContent: "center",
          background: "#000000",
          justifyContent: "center",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Grid item xs={5} md={6}>
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
                                thisPlayersColorIsWhite={
                                  this.props.gameState.thisPlayersColorIsWhite
                                }
                                playerTurnToMoveIsWhite={
                                  this.state.playerTurnToMoveIsWhite
                                }
                                whiteKingInCheck={this.state.whiteKingInCheck}
                                blackKingInCheck={this.state.blackKingInCheck}
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
        </Grid>
        <Grid
          item
          xs={5}
          ml={4}
          sx={{
            width: "20vw",
            height: "80vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Typography
            align="center"
            component="h4"
            variant="h4"
            fontSize="50px"
            mt={2}
            md={2}
            fontFamily="LATO"
          >
            {this.state.messageID}
          </Typography>
        </Grid>
      </Box>
    );
  }
}

export default Puzzle;
