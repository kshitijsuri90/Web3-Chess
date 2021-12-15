import React from "react";
import "../css/card.css";
import token_img from "../chess/assets/token.png";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import Grid from "@mui/material/Grid";
import video from "../chess/assets/chess_video.mp4";

function PuzzleListItem(props) {
  return (
    <div
      className="border_button"
      style={{
        marginLeft: "80px",
        marginRight: "80px",
        marginTop: "80px",
      }}
    >
      <Grid
        item
        xs={12}
        sx={{
          display: "flex",
          justifyContent: "left",
        }}
      >
        <Grid
          item
          xs={8}
          ml={12}
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography

            component="h1"
            color="white"
            variant="h4"
            fontSize="32px"
            mt={2}
            fontFamily="Lato"
          >
            English Trap
          </Typography>
          <Typography

            component="h1"
            variant="h5"
            fontSize="20px"
            mt={2}
            fontFamily="Lato"
          >
            Vaibhav
          </Typography>
        </Grid>
        <Grid
          item
          xs={2}
          ml={12}
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div className="border_button" style={{ padding: "10px" }}>
            <Typography
              align="center"
              component="h4"
              variant="h4"
              fontSize="18px"
              fontFamily="Lato"
            >
              BUY NOW
            </Typography>
          </div>
          <div
            className="border_button"
            onClick={() => {
              props.onClick(props.data);
            }}
            style={{ padding: "10px" }}
          >
            <Typography
              align="center"
              component="h4"
              variant="h4"
              fontSize="18px"
              fontFamily="Lato"
            >
              PLAY NOW
            </Typography>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default PuzzleListItem;
