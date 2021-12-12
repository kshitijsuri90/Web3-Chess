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
        <li>
          <Dropdown text="Account" pointing className="link item">
            {(() => {
              if (false) {
                return (
                  <Dropdown.Menu>
                    <Dropdown.Item className="button-disconnect">
                      Disconnect Wallet
                    </Dropdown.Item>
                  </Dropdown.Menu>
                );
              } else {
                if (true) {
                  return (
                    <Dropdown.Menu>
                      <Dropdown.Item style={{ fontSize: "13px" }}>
                        {accounts.toString().substring(0, 8)}
                        ...
                        {accounts.toString().substring(35, 41)}
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  );
                } else {
                  return (
                    <Dropdown.Menu>
                      <Dropdown.Item>Retry</Dropdown.Item>
                    </Dropdown.Menu>
                  );
                }
              }
            })()}
          </Dropdown>
        </li>

        <li
          id="features"
          className="navbar__item"
          onClick={goToHome}
          id="features"
          className="navbar__item"
        >
          <a href="/">App</a>
        </li>
        <li id="features" className="navbar__item" onClick={goToChallengePage}>
          <a href="/challenges"> Challenge </a>
        </li>
        <li id="features" className="navbar__item" onClick={goToPuzzles}>
          <a href="/puzzles"> Puzzles </a>
        </li>
        <li id="team" className="navbar__item">
          <a href="/puzzles"> Marketplace </a>
        </li>
        <li id="signin" className="navbar__item" onClick={goToProfile}>
          <a href="/wallet"> Wallet </a>
        </li>
      </ul>
    </div>
  );
}

export default Header;
