import React from "react";
import ChallengeListItem from "../components/ChallengeListItem";
import Header from "../components/Header";

class ChallengePage extends React.Component {
  state = {
      challenges: [],
  }

  componentDidMount() {
    console.log("Fetch challenges from db");
    this.addDummyChalleges();
  }

  addDummyChalleges() {
    var data = [];
    for (let i = 0; i < 10; i++) {
      data.push({
        gameID: "4b4e6670-5b7b-407e-be34-ff517535ee60t31",
        url: "http://localhost:3000/game/66c4b114-5501-458a-844b-0f3deb11f0fbt123",
        prize: 100,
        participationFees: 10,
        name: "testChallenge",
        creator: "kshitij",
      });
    }
    console.log(data);
    this.setState({
      challenges: data,
    });
  }

  removeFromList(props){
      //Remove this challenge from list if being played
      console.log("click");
      window.open(props.url);
  }

  render() {
    return (
      <div className="Home">
        <Header accounts={this.props.accounts} />
        <div className="header__navbar">
          <h1>Live Challenges</h1>
        </div>
        {this.state.challenges.map((data, id) => {
          return (
            <ChallengeListItem
              gameID={data.gameID}
              url={data.url}
              prize={data.prize}
              participationFees={data.participationFees}
              name={data.name}
              goToGame={this.removeFromList}
              creator={data.creator}
            />
          );
        })}
      </div>
    );
  }
}

export default ChallengePage;
