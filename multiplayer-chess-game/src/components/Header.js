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
        <Typography
          component="h1"
          variant="h5"
          fontFamily="Lato"
          color="black"
          sx={{ fontSize: "30px" }}
        >
          PROJECT CHESSTOPIA
        </Typography>
      </div>
      <ul className="navbar">
        <li>
          <Dropdown text="Account" pointing className="link item" color="white" fontFamily="Lato">
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
          <Typography
            component="h1"
            variant="h5"
            fontFamily="Lato"
            color="white"
            sx={{ fontSize: "22px" }}
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
            sx={{ fontSize: "22px" }}
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
            sx={{ fontSize: "22px" }}
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
            sx={{ fontSize: "22px" }}
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
            sx={{ fontSize: "22px" }}
          >
            WALLET
          </Typography>
        </li>
      </ul>
    </div>
  );
}

export default Header;
