import React from "react";
import { Dropdown } from "semantic-ui-react";
import "semantic-ui-css/components/dropdown.css";
import "semantic-ui-css/components/menu.css";
import "semantic-ui-css/components/transition.css";
import Logo from "../chess/assets/chess_white.png";
import Typography from "@mui/material/Typography";

function Header({ accounts }) {
  function goToChallengePage() {
    window.open("/challenges", "_self");
  }

  function goToHome() {
    window.open("/", "_self");
  }

  function goToProfile() {
    window.open("/wallet", "_self");
  }

  function goToPuzzles() {
    window.open("/puzzles", "_self");
  }

  return (
    <div className="header__navbar">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <Typography
          component="h1"
          variant="h5"
          fontFamily="Lato"
          color="white"
          sx={{ fontSize: "25px" }}
        >
          PROJECT CHESSTOPIA
        </Typography>
      </div>
      <ul className="navbar">
        <li
          id="features"
          className="navbar__item"
          onClick={goToHome}
          id="features"
          className="navbar__item"
        >
          <Typography
            component="h1"
            variant="h5"
            fontFamily="Lato"
            color="white"
            sx={{ fontSize: "20px" }}
          >
            HOME
          </Typography>
        </li>
        <li id="features" className="navbar__item" onClick={goToChallengePage}>
          <Typography
            component="h1"
            variant="h5"
            fontFamily="Lato"
            color="white"
            sx={{ fontSize: "20px" }}
          >
            CHALLENGES
          </Typography>
        </li>
        <li id="features" className="navbar__item" onClick={goToPuzzles}>
          <Typography
            component="h1"
            variant="h5"
            fontFamily="Lato"
            color="white"
            sx={{ fontSize: "20px" }}
          >
            PUZZLES
          </Typography>
        </li>
        <li id="team" className="navbar__item">
          <Typography
            component="h1"
            variant="h5"
            fontFamily="Lato"
            color="white"
            sx={{ fontSize: "20px" }}
          >
            MARKETPLACE
          </Typography>
        </li>
        <li id="signin" className="navbar__item" onClick={goToProfile}>
          <Typography
            component="h1"
            variant="h5"
            fontFamily="Lato"
            color="white"
            sx={{ fontSize: "20px" }}
          >
            WALLET
          </Typography>
        </li>
      </ul>
    </div>
  );
}

export default Header;
