import React from "react";
import PuzzleListItem from "../components/PuzzleListItem";
import Header from "../components/Header";

class PuzzlePage extends React.Component {
  state = {
    puzzles: [],
  };

  componentDidMount() {
    console.log("Fetch puzzles from db");
    this.addDummyPuzzles();
  }

  addDummyPuzzles() {
    var data = [];
    for (let i = 0; i < 10; i++) {
      data.push({
        //Add NFT table ds here
        initialState: [],
        moveList: [],
      });
    }
    console.log(data);
    this.setState({
      puzzles: data,
    });
  }

  removeFromList(props) {
    //Remove this challenge from list if being played
    console.log("click");
    window.open(props.url);
  }

  render() {
    return (
      <div className="Home">
        <Header />
        <div className="header__navbar">
          <h1>Puzzles</h1>
        </div>
        {this.state.puzzles.map((data, id) => {
          return (
            <PuzzleListItem
                
            />
          );
        })}
      </div>
    );
  }
}

export default PuzzlePage;
