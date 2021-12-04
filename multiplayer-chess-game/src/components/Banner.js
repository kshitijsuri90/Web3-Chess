import React from "react";
import Heroimg from "../chess/assets/illustration-intro.png";
import JoinGame from "../onboard/joingame";
import Button from "./Button";
import Header from "./Header";

function createGame(){
  console.log("Create game");
  window.open("/newGame", "_self");
}

function joinGame(){
  console.log("Join game");
}

function Banner() {
  return (
    <div style={{ height: "auto" }}>
      <Header />
      <section className="banner_section">
        <img src={Heroimg} alt="" className="hero__img" />
        <div className="hero__section">
          <h1 className="hero__CTA">Earn your way while playing Chess.</h1>
          <p className="hero__desc">
            Challenge your friends for a chess watch. Winner takes all. Mint
            NFTs and earn coins too.
          </p>
          <div className="header__navbar">
            <Button text="Create Game" onClick={createGame}/>
            <Button text="Join Game" onClick={joinGame}/>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Banner;
