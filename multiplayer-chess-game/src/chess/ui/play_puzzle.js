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
    playerTurnToMoveIsWhite: this.props.firstMove,
    whiteKingInCheck: false,
    blackKingInCheck: false,
    moves: this.props.moves,
    gameOver: false,
    startIndexOfNFT: 0,
    endIndexOFNFT: 0,
    gameIndex: -1,
    isMyMove: this.props.color ? true : false,
    firstMove: this.props.firstMove,
    submitNFT: false,
  };

  componentDidMount() {
    console.log(this.props);
    console.log(this.state);
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

  render() {
    // console.log(this.state.gameState.getBoard())
    //  console.log("it's white's move this time: " + this.state.playerTurnToMoveIsWhite)
    /*
            Look at the current game state in the model and populate the UI accordingly
        */
    // console.log(this.state.gameState.getBoard())
    return (
      <Box
        sx={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          marginTop: "50px",
          justifyContent: "center",
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
                                thisPlayersColorIsWhite={this.props.color}
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
            borderColor: "text.primary",
            m: 1,
            borderColor: "secondary.main",
            border: 1,
            width: "30vw",
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
            fontSize="28px"
            mt={2}
            md={2}
            fontFamily="serif"
          >
            Valid Move!
          </Typography>
          <Typography
            align="center"
            component="h4"
            variant="h4"
            fontSize="28px"
            mt={2}
            md={2}
            fontFamily="serif"
          >
            Invalid move!
          </Typography>
        </Grid>
      </Box>
    );
  }
}

export default Puzzle;
