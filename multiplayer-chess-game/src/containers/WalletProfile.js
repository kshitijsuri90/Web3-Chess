import React from "react";
import "../css/card.css";
import token_img from "../chess/assets/token.png";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import ProfileImage from "../chess/assets/profile.jpg";
import Button from "../components/Button"

const commonStyles = {
  borderColor: "text.primary",
  m: 1,
  borderColor: "secondary.main",
  border: 1,
  width: "80vw",
  height: "80vh",
  padding: "20px",
};

const outBox = {
  width: "100vw",
  height: "100vh",
  display: "flex",
  marginTop: "50px",
};

function WalletProfile(props) {
  return (
    <Box sx={{ ...outBox, justifyContent: "center" }}>
      <Box
        sx={{ ...commonStyles, borderRadius: "16px", justifyContent: "center" }}
      >
        <Grid item xs={12} md={12}>
          <Typography
            component="h1"
            variant="h1"
            fontSize="45px"
            align="center"
            mt={2}
            md={2}
            fontFamily="serif"
          >
            PROFILE
          </Typography>
        </Grid>
        <Grid container spacing={2} mt={2}>
          <Grid item xs={6} md={6} p={2}>
            <img src={ProfileImage} style={{ width: "30vw", height: "50vh" }} />
          </Grid>
          <Grid item xs={6} md={6}>
            <Box>
              <Grid p={2}>
                <Typography
                  component="h4"
                  variant="h4"
                  fontSize="28px"
                  mt={2}
                  md={2}
                  fontFamily="serif"
                >
                  Wallet: "Add wallet address here"
                </Typography>
              </Grid>
              <Grid p={2}>
                <Typography
                  component="h5"
                  variant="h4"
                  fontSize="28px"
                  mt={2}
                  md={2}
                  fontFamily="serif"
                >
                  Tokens: "Add token quantity here"
                </Typography>
              </Grid>
              <Grid p={2}>
                <Typography
                  component="h5"
                  variant="h4"
                  fontSize="28px"
                  mt={2}
                  md={2}
                  fontFamily="serif"
                >
                  Matches: 58
                </Typography>
              </Grid>
              <Grid p={2}>
                <Typography
                  component="h5"
                  variant="h4"
                  fontSize="28px"
                  mt={2}
                  md={2}
                  fontFamily="serif"
                >
                  Won: 34
                </Typography>
              </Grid>
              <Grid p={2}>
                <Typography
                  component="h5"
                  variant="h4"
                  fontSize="28px"
                  mt={2}
                  md={2}
                  fontFamily="serif"
                >
                  Lost: 24
                </Typography>
              </Grid>
            </Box>
          </Grid>
        </Grid>
        <Grid item xs={12} ml={15} mr={15}>
          <Button text="Get Tokens" />
        </Grid>
      </Box>
    </Box>
  );
}

export default WalletProfile;
