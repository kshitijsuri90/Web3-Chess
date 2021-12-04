import React from "react";
import { Redirect } from "react-router-dom";
import uuid from "uuid/v4";
import { ColorContext } from "../context/colorcontext";
const socket = require("../connection/socket").socket;
/**
 * Onboard is where we create the game room.
 */

class CreateNewGame extends React.Component {
  state = {
    didGetUserName: false,
    userName: "",
    colour: "0",
    time: "",
    gameId: "",
    stake: "",
  };

  constructor(props) {
    super(props);
    this.textArea1 = React.createRef();
    this.textArea2 = React.createRef();
    this.textArea3 = React.createRef();
  }

  send = () => {
    /**
     * This method should create a new room in the '/' namespace
     * with a unique identifier.
     */
    var newGameRoomId = uuid();
    newGameRoomId+="t"+this.state.time;
    // set the state of this component with the gameId so that we can
    // redirect the user to that URL later.
    this.setState({
      gameId: newGameRoomId,
    });

    // emit an event to the server to create a new room
    socket.emit("createNewGame", newGameRoomId);
  };

  typingUserName = () => {
    // grab the input text from the field from the DOM
    const typedText = this.textArea1.current.value;
    // set the state with that text
    this.setState({
      userName: typedText,
    });
  };

  timeSelection = () => {
    // grab the input text from the field from the DOM
    const typedText = this.textArea2.current.value;
    // set the state with that text
    this.setState({
      time: typedText,
    });
  };

  colourSelection = (e) => {
    const {name,value} = e.target;
    this.setState({
      colour: value,
    });
  };

  stakesCollected = () => {
    const typedText = this.textArea3.current.value;
    // set the state with that text
    this.setState({
        stake: typedText,
    });
  }

  render() {
    // !!! TODO: edit this later once you have bought your own domain.

    return (
      <React.Fragment>
        {this.state.didGetUserName ? (
          <Redirect to={"/game/" + this.state.gameId}>
            <button
              className="btn btn-success"
              style={{
                marginLeft: String(window.innerWidth / 2 - 60) + "px",
                width: "120px",
              }}
            >
              Start Game
            </button>
          </Redirect>
        ) : (
          <div>
            <h1 style={{ textAlign: "center", margin: "10px" }}>
              Enter game details
            </h1>
            <div className="hero__section">
              <div className="header__navbar">
                White
                <input
                  style={{ marginRight: "20px" }}
                  id="white"
                  value="0"
                  name="white"
                  type="radio"
                  checked={this.state.colour == "0"}
                  onChange={this.colourSelection}
                />
                Black
                <input
                  id="black"
                  style={{ marginRight: "20px" }}
                  value="1"
                  name="black"
                  type="radio"
                  checked={this.state.colour == "1"}
                  onChange={this.colourSelection}
                />
              </div>
              <label>
                Username
                <input
                  id=""
                  style={{
                    width: "240px",
                    margin: "10px",
                  }}
                  ref={this.textArea1}
                  onInput={this.typingUserName}
                ></input>
              </label>
              <label>
                Time
                <input
                  type="number"
                  id=""
                  style={{
                    width: "240px",
                    margin: "10px",
                  }}
                  ref={this.textArea2}
                  onInput={this.timeSelection}
                ></input>
              </label>
              <label>
                Stakes
                <input
                  type="number"
                  id=""
                  style={{
                    width: "240px",
                    margin: "10px",
                  }}
                  ref={this.textArea3}
                  onInput={this.stakesCollected}
                ></input>
              </label>
            </div>
            <button
              className="btn btn-primary"
              style={{
                marginLeft: String(window.innerWidth / 2 - 60) + "px",
                width: "120px",
                marginTop: "62px",
              }}
              disabled={!(this.state.userName.length > 0)}
              onClick={() => {
                // When the 'Submit' button gets pressed from the username screen,
                // We should send a request to the server to create a new room with
                // the uuid we generate here.
                this.props.didRedirect();
                this.props.setUserName(this.state.userName);
                this.props.setTime(this.state.time);
                this.props.setStake(this.state.stake);
                this.setState({
                  didGetUserName: true,
                });
                this.send();
              }}
            >
              Submit
            </button>
          </div>
        )}
      </React.Fragment>
    );
  }
}

const Onboard = (props) => {
  const color = React.useContext(ColorContext);

  return (
    <CreateNewGame
      didRedirect={color.playerDidRedirect}
      setUserName={props.setUserName}
      setTime={props.setTime}
      setStake={props.setStake}
    />
  );
};

export default Onboard;
