import { Box } from "@mui/material";
import Grid from "@mui/material/Grid";
import React from "react";
import Background from "../chess/assets/chess_wallpaper.png";
import JoinGame from "../onboard/joingame";
import Button from "./Button";
import Header from "./Header";
import Typography from "@mui/material/Typography";

function createGame() {
  console.log("Create game");
  window.open("/newGame", "_self");
}

function joinGame() {
  console.log("Join game");
}

function Banner({ accounts }) {
  return (
    <div
      style={{
        background: "linear-gradient(#000000, #0F0F0F)",
        justifyContent: "center",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        width: "100vw",
        height: "100vh",
      }}
    >
      <Header accounts={accounts} />
      <Box>
        <Grid
          container
          spacing={2}
          component="main"
          sx={{ height: "100vh", width: "100vw" }}
        >
          <Grid
            item
            xs={12}
            sx={{
              backgroundImage: `url(${Background})`,
              width: "50vw",
              height: "70vh",
              display: "flex",
              flexDirection: "center",
              alignItems: "flex-end",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            <Grid item xs={12} sm={3} md={3} mt={2}></Grid>
            <Grid item xs={12} sm={3} md={3} mt={2}>
              <div className="border_button" onClick={createGame}>
                <Typography
                  component="h1"
                  variant="h5"
                  fontFamily="Lato"
                  color="white"
                  sx={{ fontSize: "25px" }}
                >
                  CREATE GAME
                </Typography>
              </div>
            </Grid>
            <Grid item xs={12} sm={3} md={3} mt={2}>
              <div className="border_button">
                <Typography
                  component="h1"
                  variant="h5"
                  fontFamily="Lato"
                  color="white"
                  sx={{ fontSize: "25px" }}
                >
                  JOIN GAME
                </Typography>
              </div>
            </Grid>
            <Grid item xs={12} sm={3} md={3} pt={6}></Grid>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default Banner;
