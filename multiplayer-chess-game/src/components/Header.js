import React from "react";
import Logo from "../chess/assets/chess_white.png";
import Typography from "@mui/material/Typography";

function Header() {
  function goToChallengePage() {
    window.open("/challenges", "_self");
  }

  function goToHome() {
    window.open("/", "_self");
  }

  function goToProfile() {
    window.open("/wallet", "_self");
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
        <img
          src={Logo}
          alt=""
          className="logo"
          style={{ width: "50px", height: "50px", marginRight: "20px" }}
        />
        <Typography component="h1" variant="h5" fontFamily="monospace">
          PROJECT CHESSTOPIA
        </Typography>
      </div>
      <ul className="navbar">
        <li id="features" className="navbar__item" onClick={goToHome}>
          <Typography component="h5" variant="h9" fontFamily="sans-serif">
            HOME
          </Typography>
        </li>
        <li id="features" className="navbar__item" onClick={goToChallengePage}>
          <Typography component="h5" variant="h9" fontFamily="sans-serif">
            BOUNTIES
          </Typography>
        </li>
        <li id="features" className="navbar__item">
          <Typography component="h5" variant="h9" fontFamily="sans-serif">
            PUZZLES
          </Typography>
        </li>
        <li id="team" className="navbar__item">
          <Typography component="h5" variant="h9" fontFamily="sans-serif">
            MARKETPLACE
          </Typography>
        </li>
        <li id="signin" className="navbar__item" onClick={goToProfile}>
          <Typography component="h5" variant="h9" fontFamily="sans-serif">
            SIGN IN
          </Typography>
        </li>
      </ul>
    </div>
  );
}

export default Header;
