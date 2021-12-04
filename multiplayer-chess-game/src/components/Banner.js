import React from "react";
import Heroimg from "../chess/assets/banner.png";
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
    <div style={{ height: "100vh" }}>
      <Header />
      <section className="banner_section">
        <img src={Heroimg} alt="" className="hero__img" />
        <div className="hero__section">
          <h1 className="hero__CTA">Welcome to Chesstopia</h1>
          <h3 className="hero__desc">
            Winner takes all. Mint NFTs and earn coins too.
          </h3>
          <div className="button_section">
            <Button text="Create Game" onClick={createGame} />
            <Button text="Create Challenge" onClick={joinGame} />
          </div>
        </div>
      </section>
    </div>
  );
}

export default Banner;
