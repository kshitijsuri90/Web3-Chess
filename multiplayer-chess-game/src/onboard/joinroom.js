import React from 'react'
import JoinGame from './joingame'
import ChessGame from '../chess/ui/chessgame'

/**
 * Onboard is where we create the game room.
 */

class JoinRoom extends React.Component {
  state = {
    didGetUserName: false,
    inputText: "",
    stake: "",
  };

  constructor(props) {
    super(props);
    this.textArea1 = React.createRef();
    this.textArea2 = React.createRef();
  }

  typingUserName = () => {
    // grab the input text from the field from the DOM
    const typedText = this.textArea1.current.value;

    // set the state with that text
    this.setState({
      inputText: typedText,
    });
  };

  stakesCollected = () => {
    const typedText = this.textArea2.current.value;
    // set the state with that text
    this.setState({
      stake: typedText,
    });
  };

  render() {
    return (
      <React.Fragment>
        {this.state.didGetUserName ? (
          <React.Fragment>
            <JoinGame userName={this.state.inputText} stake={this.state.stake} isCreator={false} />
            <ChessGame myUserName={this.state.inputText} stake={this.state.stake} />
          </React.Fragment>
        ) : (
          <div>
            <h1
              style={{
                textAlign: "center",
                marginTop: "100px",
              }}
            >
              Your Username:
            </h1>
            <div className="hero__section">
              <div className="hero__section">
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
                  Stakes
                  <input
                    type="number"
                    id=""
                    style={{
                      width: "240px",
                      margin: "10px",
                    }}
                    ref={this.textArea2}
                    onInput={this.stakesCollected}
                  ></input>
                </label>

                <button
                  className="btn btn-primary"
                  style={{
                    width: "120px",
                  }}
                  disabled={!(this.state.inputText.length > 0)}
                  onClick={() => {
                    // When the 'Submit' button gets pressed from the username screen,
                    // We should send a request to the server to create a new room with
                    // the uuid we generate here.
                    this.setState({
                      didGetUserName: true,
                    });
                  }}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default JoinRoom