import "./Home.css";
import React from "react";
import ChessGame from "../chess/ui/game";
import chessMove from "../chess/assets/moveSoundEffect.mp3";
import useSound from "use-sound";

function NFTCreatePage(props) {
  const [play] = useSound(chessMove);
    console.log(props)
  return (
    <div className="Home">
      <ChessGame
        playAudio={play}
        gameId={props.gameId}
        color={props.color}
        moves={props.moves}
      />
    </div>
  );
}

export default NFTCreatePage;
