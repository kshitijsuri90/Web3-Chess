import JoinGame from "./joingame";
import ChessGame from "../chess/ui/chessgame";
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";

/**
 * Onboard is where we create the game room.
 */

class JoinRoom extends React.Component {
  state = {
    didGetUserName: false,
    inputText: "",
    stake: "",
  };

  typingUserName = (e) => {
    // grab the input text from the field from the DOM
    const typedText = e.target.value;
    console.log(typedText);
    // set the state with that text
    this.setState({
      inputText: typedText,
    });
  };

  stakesCollected = (e) => {
    const typedText = e.target.value;
    // set the state with that text
    console.log(typedText);
    this.setState({
      stake: typedText,
    });
  };

  send = () => {
    this.props.startGameBlack(1, "id");
    console.log("Submit");
    console.log(this.state);
    this.setState({
      didGetUserName: true,
    });
  }

  render() {
    console.log(this.props);
    return this.state.didGetUserName ? (
      <React.Fragment>
        <JoinGame
          userName={this.state.inputText}
          stake={this.state.stake}
          isCreator={false}
        />
        <ChessGame myUserName={this.state.inputText} stake={this.state.stake} />
      </React.Fragment>
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
              Join Game
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={() => {
                this.setState({
                  didGetUserName: true,
                });
              }}
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

export default JoinRoom;
