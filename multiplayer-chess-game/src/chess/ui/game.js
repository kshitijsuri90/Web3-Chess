import React from "react";
import Game from "../model/chess";
import { Stage, Layer } from "react-konva";
import Board from "../assets/chessBoard.png";
import Piece from "./piece";
import piecemap from "./piecemap";
import Puzzle from "./play_puzzle";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import SimpleCountdownTimer from "../../components/Timer";
import Divider from "@mui/material/Divider";
import Button from "../../components/Button";
import Cookies from "universal-cookie";
import ChessPiece from "../model/chesspiece";
import Square from "../model/square";

const cookies = new Cookies();
console.log("Cookie");

class ChessGame extends React.Component {
  state = {
    gameState: new Game(this.props.color),
    draggedPieceTargetId: "", // empty string means no piece is being dragged
    playerTurnToMoveIsWhite: true,
    whiteKingInCheck: false,
    blackKingInCheck: false,
    moves: [],
    gameOver: false,
    startIndexOfNFT: 0,
    endIndexOFNFT: 0,
    gameIndex: -1,
    isMyMove: this.props.color ? true : false,
    initialNFTGameState: null,
    firstMoveInNFt: this.props.color,
    submitNFT: false,
    firstMove: true,
  };

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
    if (index + 1 >= this.state.moves.length) {
      console.log("End of moves");
      return;
    }
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
    if (index - 1 < 0) {
      console.log("End of moves");
      return;
    }
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
    var slicedMoves = this.state.moves.slice(
      this.state.startIndexOfNFT + 1,
      this.state.endIndexOFNFT + 1
    );
    console.log(slicedMoves);
    this.setState({
      moves: slicedMoves,
    });
    console.log(this.state.startIndexOfNFT);
    console.log(this.state.endIndexOFNFT);
    console.log(this.state.initialNFTGameState);
    this.props.mintPuzzle("url");
    this.setState({
      submitNFT: true,
    });
  };

  toChessMove(finalPosition, to2D) {
    let move;

    if (finalPosition[0] > 100) {
      move =
        this.toAlphabet[to2D[finalPosition[0]]] +
        this.toCoord[to2D[finalPosition[1]]];
    } else {
      move = this.toAlphabet[finalPosition[0]] + this.toCoord[finalPosition[1]];
    }

    console.log("proposed move: " + move)
    return move;
  }

  makeStart = () => {
    if (!this.state.isMyMove) {
      alert("You can only mint NFT's of your moves");
      return;
    }
    var index = this.state.gameIndex;
    console.log("Setting start NFT stage to " + index);
    var thisgame = new Game(this.props.color);
    var moves = this.state.moves;
    var isMyMove = true;
    for (let i = 0; i <= this.state.gameIndex; i++) {
      console.log("Inside loop")
      const update = thisgame.movePiece(
        this.state.moves[i].selectedId,
        this.state.moves[i].finalPosition,
        isMyMove
      );
      console.log(update);
      isMyMove = !isMyMove;
    }
    // var board = this.state.gameState.chessBoard;
    // var startingChessBoard = [];
    // for (var i = 0; i < 8; i++) {
    //   startingChessBoard.push([]);
    //   for (var j = 0; j < 8; j++) {
    //     // j is horizontal
    //     // i is vertical
    //     const coordinatesOnCanvas = [(j + 1) * 90 + 15, (i + 1) * 90 + 15];
    //     const emptySquare = new Square(j, i, null, coordinatesOnCanvas);
    //     startingChessBoard[i].push(emptySquare);
    //   }
    // }
    // for (var j = 0; j < 8; j++) {
    //   for (var i = 0; i < 8; i++) {
    //     var piece = board[j][i].getPiece();
    //     //console.log(piece);
    //     if (piece == null) continue;
    //     startingChessBoard[j][i].setPiece(
    //       new ChessPiece(piece.name, piece.isAttacked, piece.color, piece.id)
    //     );
    //   }
    // }
    // thisgame.chessBoard = startingChessBoard;
    // console.log(startingChessBoard);
    var turn = this.state.playerTurnToMoveIsWhite;
    this.setState({
      startIndexOfNFT: index,
      firstMove: turn,
      initialNFTGameState: thisgame,
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
    return this.state.submitNFT ? (
      <Puzzle
        firstMove={this.state.firstMove}
        moves={this.state.moves}
        gameState={this.state.initialNFTGameState}
      />
    ) : (
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
            width: "20vw",
            height: "80vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              padding: "20px",
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <Button text="Previous" onClick={this.goToPreviousMove} />
            <Button text="Next" onClick={this.makeNextMove} />
          </Box>

          <Box
            sx={{
              padding: "20px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Button text="Start NFT" onClick={this.makeStart} />
            <Button text="End NFT" onClick={this.makeEnd} />
            <Button text="Submit" onClick={this.submit} />
          </Box>
        </Grid>
      </Box>
    );
  }
}

export default ChessGame;
