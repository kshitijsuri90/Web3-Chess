import React from "react";
import style from "../css/style.css";
import white_rook from "../assets/icons/white_rook.png";
import black_rook from "../assets/icons/black_rook.png";

class Rook {
  constructor(player) {
    this.player = player;
    this.highlight = 0;
    this.possible = 0;
    this.icon =
      player == "w" ? (
        <img src={white_rook} className="piece"></img>
      ) : (
        <img src={black_rook} className="piece"></img>
      );
    this.ascii = player == "w" ? "r" : "R";
  }

  // function that defines piece's valid move shape
  can_move(start, end) {
    var start_row = 8 - Math.floor(start / 8);
    var start_col = (start % 8) + 1;
    var end_row = 8 - Math.floor(end / 8);
    var end_col = (end % 8) + 1;

    var row_diff = end_row - start_row;
    var col_diff = end_col - start_col;

    if (row_diff > 0 && col_diff == 0) {
      return true;
    } else if (row_diff == 0 && col_diff > 0) {
      return true;
    } else if (row_diff < 0 && col_diff == 0) {
      return true;
    } else if (row_diff == 0 && col_diff < 0) {
      return true;
    }
    return false;
  }
}

export default Rook;
