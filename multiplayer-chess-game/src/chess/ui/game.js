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
    startIndexOfNFT: -1,
    endIndexOFNFT: -1,
    gameIndex: -1,
    isMyMove: this.props.color ? true : false,
    initialNFTGameState: null,
    firstMoveInNFt: this.props.color,
    submitNFT: false,
    firstMove: true,
    buttonMessage: "Start NFT",
  };

  componentDidMount() {
    console.log(this.props);
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

  makeStart = () => {
    if (this.state.startIndexOfNFT != -1) {
      console.log(this.state.buttonMessage);
      var index = this.state.gameIndex;
      console.log("Setting end of NFT stage to " + index);
      console.log(this.state.endIndexOFNFT);
      var slicedMoves = this.state.moves.slice(
        this.state.startIndexOfNFT + 1,
        index + 1,
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
      return;
    }
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
      console.log("Inside loop");
      const update = thisgame.movePiece(
        this.state.moves[i].selectedId,
        this.state.moves[i].finalPosition,
        isMyMove
      );
      console.log(update);
      isMyMove = !isMyMove;
    }
    var turn = this.state.playerTurnToMoveIsWhite;
    this.setState({
      startIndexOfNFT: index,
      firstMove: turn,
      initialNFTGameState: thisgame,
      buttonMessage: "End NFT",
    });
  };

  makeEnd = () => {
    
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
              m: 1,
              border: 1,
              margin: "50px",
              borderColor: "#383838",
              height: "20vh",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography
              align="center"
              component="h4"
              variant="h5"
              fontSize="18px"
              fontFamily="Lato"
            >
              {this.state.gameState.moveString}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <div
              className="border_button"
              onClick={this.goToPreviousMove}
              style={{ padding: "10px", width: "200px" }}
            >
              <Typography
                align="center"
                component="h4"
                variant="h4"
                fontSize="28px"
                fontFamily="Lato"
              >
                Previous
              </Typography>
            </div>
            <div
              className="border_button"
              onClick={this.makeNextMove}
              style={{ padding: "10px", width: "200px" }}
            >
              <Typography
                align="center"
                component="h4"
                variant="h4"
                fontSize="28px"
                fontFamily="Lato"
              >
                Next
              </Typography>
            </div>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <div
              className="border_button"
              onClick={this.makeStart}
              style={{ padding: "10px", width: "200px" }}
            >
              <Typography
                component="h4"
                variant="h4"
                fontSize="28px"
                fontFamily="Lato"
              >
                {this.state.buttonMessage}
              </Typography>
            </div>
            {/* <Button text="Start NFT" onClick={this.makeStart} />
            <Button text="End NFT" onClick={this.makeEnd} />
            <Button text="Submit" onClick={this.submit} /> */}
          </Box>
        </Grid>
      </Box>
    );
  }
}

export default ChessGame;
