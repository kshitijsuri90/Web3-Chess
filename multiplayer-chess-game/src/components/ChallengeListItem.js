import React from "react";
import url from "socket.io-client/lib/url";
import '../css/card.css';

function ChallengeListItem(props) {
  return (
    <div
      className="card"
      onClick={() => {
        props.goToGame(props);
      }}
    >
      <div className="container">
        <h1>Name: {props.name} </h1>
        <h3>participationFees: {props.participationFees}</h3>
        <h3>prize: {props.prize}</h3>
        <h3>creator: {props.creator}</h3>
      </div>
    </div>
  );
}

export default ChallengeListItem;
