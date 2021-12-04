import React from "react";
import "../css/card.css";
import token_img from "../chess/assets/token.png";
function ChallengeListItem(props) {
  return (
    <div
      className="card"
      onClick={() => {
        props.goToGame(props);
      }}
    >
      <div className="container">
        <div>
          <h1>Name: {props.name} </h1>
          <h3>creator: {props.creator}</h3>
        </div>
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <h1>{props.prize}</h1>
            <img
              src={token_img}
              style={{
                margin: "10px",
                width: "50px",
                height: "50px",
                borderRadius: "25px",
              }}
            ></img>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <h3>Entry: {props.participationFees}</h3>
            <img
              src={token_img}
              style={{
                margin: "10px",
                width: "30px",
                height: "30px",
                borderRadius: "25px",
              }}
            ></img>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChallengeListItem;
