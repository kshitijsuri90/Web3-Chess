import React from "react";
import Logo from "../chess/assets/logo.svg";

function Header () {
  
  function goToChallengePage(){
    window.open("/challenges", "_self");
  }

  function goToHome(){
    window.open("/", "_self");
  }

  return (
    <div className="header__navbar">
      <img src={Logo} alt="" className="logo" />
      <ul className="navbar">
        <li id="features" className="navbar__item" onClick={goToHome}>
          Home
        </li>
        <li id="features" className="navbar__item" onClick={goToChallengePage}>
          Live Challenges
        </li>
        <li id="features" className="navbar__item">
          Puzzles
        </li>
        <li id="team" className="navbar__item">
          Marketplace
        </li>
        <li id="signin" className="navbar__item">
          Sign In
        </li>
      </ul>
    </div>
  );
}

export default Header 