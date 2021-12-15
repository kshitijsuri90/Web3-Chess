import img from "../chess/assets/illustration-stay-productive.png";
import icon from "../chess/assets/icon-arrow.svg";
import React from "react";
import Background from "../chess/assets/chess_wallpaper.png";
import JoinGame from "../onboard/joingame";
import Button from "./Button";
import Header from "./Header";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import Grid from "@mui/material/Grid";
import video from "../chess/assets/chess_video.mp4";

function Cta() {
  return (
    <div
      style={{
        background: "#000000",
        justifyContent: "center",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        width: "100vw",
        height: "80vh",
      }}
    >
      <Box>
        <Grid container component="main" sx={{ height: "80h", width: "100vw" }}>
          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              flexDirection: "flex-end",
            }}
          >
            <Grid item xs={11} sm={8}>
              <Box
                sx={{
                  p: 20,
                  mt: 2,
                }}
              >
                <Grid
                  item
                  xs={12}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Typography
                    component="h1"
                    variant="h4"
                    fontFamily="Lato"
                    color="white"
                    sx={{ fontSize: "45px" }}
                  >
                    SIMPLE. ELEGANT. EXCLUSIVE
                  </Typography>
                  <Box
                    sx={{
                      mt: 12,
                      pr: 20
                    }}
                  >
                    <Typography
                      component="h1"
                      variant="h4"
                      fontFamily="Lato"
                      color="white"
                      sx={{ fontSize: "25px" }}
                    >
                      Welcome to chesstopia, where you earn money while playing. Challenge friends, create bounties and mint NFT's and have fun while doing it!
                    </Typography>
                  </Box>
                </Grid>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4} sx={{ height: "80vh" }}>
              <video className="videoTag" autoPlay loop muted>
                <source src={video} type="video/mp4" />
              </video>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default Cta;
