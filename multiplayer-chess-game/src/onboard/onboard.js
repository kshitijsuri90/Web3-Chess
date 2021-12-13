import { Navigate } from "react-router-dom";
import uuid from "uuid/v4";
import { ColorContext } from "../context/colorcontext";
import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
/**
 * Onboard is where we create the game room.
 */
const socket = require("../connection/socket").socket;

class CreateNewGame extends React.Component {
  
  state = {
    didGetUserName: false,
    userName: "",
    colour: "0",
    time: "",
    gameId: "",
    stake: "",
  };

  constructor(props) {
    super(props);
    console.log(props);
    console.log("tessss");
    this.textArea1 = React.createRef();
    this.textArea2 = React.createRef();
    this.textArea3 = React.createRef();
  }

  send = () => {
    /**
     * This method should create a new room in the '/' namespace
     * with a unique identifier.
     */
    var newGameRoomId = uuid();
    console.log("Create game");
    this.props.didRedirect();
    this.props.setUserName(this.state.userName);
    this.props.setTime(this.state.time);
    this.props.setStake(this.state.stake);
    this.setState({
      didGetUserName: true,
    });
    newGameRoomId += "t" + this.state.time;
    // set the state of this component with the gameId so that we can
    // redirect the user to that URL later.
    this.setState({
      gameId: newGameRoomId,
      didGetUserName: true,
    });

    // emit an event to the server to create a new room
    socket.emit("createNewGame", newGameRoomId);
  };

  typingUserName = (e) => {
    // grab the input text from the field from the DOM
    const typedText = e.target.value;
    console.log(typedText)
    // set the state with that text
    this.setState({
      userName: typedText,
    });
  };

  timeSelection = (e) => {
    // grab the input text from the field from the DOM
    const typedText = e.target.value;
    // set the state with that text
    console.log(typedText);
    this.setState({
      time: typedText,
    });
  };

  colourSelection = (e) => {
    const { name, value } = e.target;
    this.setState({
      colour: value,
    });
  };

  stakesCollected = (e) => {
    const typedText = e.target.value;
    // set the state with that text
    this.setState({
      stake: typedText,
    });
  };

  render() {
    // !!! TODO: edit this later once you have bought your own domain.
    return this.state.didGetUserName ? (
      <Navigate to={"/game/" + this.state.gameId}>
        <button
          className="btn btn-success"
          style={{
            marginLeft: String(window.innerWidth / 2 - 60) + "px",
            width: "120px",
          }}
        >
          Start Game
        </button>
      </Navigate>
    ) : (
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1588412079929-790b9f593d8e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8Y2hlc3N8ZW58MHx8MHx8&w=1000&q=80)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="h1" variant="h5">
              Create a Game
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={this.send}
              sx={{ mt: 1 }}
            >
              <TextField
                onChange={this.typingUserName}
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
              />
              <TextField
                onChange={this.timeSelection}
                margin="normal"
                required
                fullWidth
                name="time"
                label="Time"
                type="number"
                id="time"
              />
              <TextField
                onChange={this.stakesCollected}
                margin="normal"
                required
                fullWidth
                name="stake"
                label="Stake"
                type="number"
                id="stake"
              />
              <Button
                onClick={this.send}
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Start Game
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    );
  }
}

const Onboard = (props) => {
  const color = React.useContext(ColorContext);

  return (
    <CreateNewGame
      startGameWhite={props.startGameWhite}
      didRedirect={color.playerDidRedirect}
      setUserName={props.setUserName}
      setTime={props.setTime}
      setStake={props.setStake}
    />
  );
};

export default Onboard;
