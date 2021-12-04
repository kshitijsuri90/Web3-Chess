import React from "react";
import Logo from "../chess/assets/logo.svg";

import ConnectButton from "./MetamaskButton";

function Header() {

  return (
        <div className="header__navbar">
          <img src={Logo} alt="" className="logo" />
          <ul className="navbar">
            <li id="features" className="navbar__item">
              <a href="/">Home</a>
            </li>
            <li id="features" className="navbar__item">
              <a href="/challenge"> Challenge </a>
            </li>
            <li id="features" className="navbar__item">
              <a href="/puzzles"> Puzzles </a>
            </li>
            <li id="team" className="navbar__item">
              <a href="/marketplace"> Marketplace </a>
            </li>
            <li>
              <ConnectButton />

            </li>
          </ul>
        </div>
  );
}

export default Header;
