import React from "react";
import Logo from "../chess/assets/logo.svg";

function Header () {
  return (
    <div className="header__navbar">
      <img src={Logo} alt="" className="logo" />
      <ul className="navbar">
        <li id="features" className="navbar__item">
          Home
        </li>
        <li id="features" className="navbar__item">
          Tournament
        </li>
        <li id="features" className="navbar__item">
          <a href="/puzzles"> Puzzles </a>
        </li>
        <li id="team" className="navbar__item">
        <a href="/marketplace"> Marketplace </a>
        </li>
        <li id="signin" className="navbar__item">
          Sign In
        </li>
      </ul>
    </div>
  );
}

export default Header 