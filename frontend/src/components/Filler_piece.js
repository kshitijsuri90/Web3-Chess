import React from "react";
import style from "../css/style.css";

class Filler_piece {
  constructor(player) {
    this.player = player;
    this.highlight = 0;
    this.possible = 0;
    this.icon = null;
    this.ascii = null;
  }

  // function that defines piece's valid move shape
  can_move(start, end) {
    return false;
  }
}

export default Filler_piece;
