import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import JoinRoom from "./onboard/joinroom";
import { ColorContext } from "./context/colorcontext";
import Onboard from "./onboard/onboard";
import JoinGame from "./onboard/joingame";
import ChessGame from "./chess/ui/chessgame";
import Puzzles from "./pages/puzzles";
import Marketplace from "./pages/marketplace";
import Home from "./containers/Home";
import firebase from "firebase";
import Header from "./components/Header";
import { getWeb3 } from "./utils";

import Token from "./contracts/Token.json";
import Betting from "./contracts/Betting.json";
import Puzzles from "./contracts/NFT.json";

/*
 *  Frontend flow:
 *
 * 1. user first opens this app in the browser.
 * 2. a screen appears asking the user to send their friend their game URL to start the game.
 * 3. the user sends their friend their game URL
 * 4. the user clicks the 'start' button and waits for the other player to join.
 * 5. As soon as the other player joins, the game starts.
 *
 *
 * Other player flow:
 * 1. user gets the link sent by their friend
 * 2. user clicks on the link and it redirects to their game. If the 'host' has not yet
 *    clicked the 'start' button yet, the user will wait for when the host clicks the start button.
 *    If the host decides to leave before they click on the "start" button, the user will be notified
 *    that the host has ended the session.
 * 3. Once the host clicks the start button or the start button was already clicked on
 *    before, that's when the game starts.
 * Onboarding screen =====> Game start.
 *
 * Every time a user opens our site from the '/' path, a new game instance is automatically created
 * on the back-end. We should generate the uuid on the frontend, send the request with the uuid
 * as a part of the body of the request. If any player leaves, then the other player wins automatically.
 *
 */

function App() {
  const ipfs = await IPFS.create();
  const orbitdb = await OrbitDB.createInstance(ipfs);

  const [web3, setWeb3] = useState(undefined);
  const [accounts, setAccounts] = useState(undefined);

  useEffect(() => {
    const init = async () => {
      const web3 = await getWeb3();
      const accountsmain = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      const accounts = await web3.eth.getAccounts();
      console.log("get accounts", accountsmain);
      const networkId = await web3.eth.net.getId();

      // const deployedNetwork = Lottery.networks[networkId];
      // const contract = new web3.eth.Contract(
      //   Lottery.abi,
      //   deployedNetwork && deployedNetwork.address,
      // );

      // const [houseFee, state] = await Promise.all([
      //   contract.methods.houseFee().call(),
      //   contract.methods.currentState().call()
      // ]);

      setWeb3(web3);
      setAccounts(accounts);
      //setContract(contract);
      //setHouseFee(houseFee);
      //setBet({state: 0});
    };
    init();
    window.ethereum.on("accountsChanged", (accounts) => {
      setAccounts(accounts);
    });
  }, []);

  const approveContract = async (address) => {
    const deployedNetwork = Token.network[networkId];
    const contract = new web3.eth.Contract(
      Token.abi,
      deployedNetwork && deployedNetwork.address
    );
    await contract.methods.approveContract(address).send({ from: accounts[0] });
  };

  const setData = async (id, data) => {
    const db = await orbitdb.log(id);
    await db.load();
    const hash = await db.add(data);
  };

  const getData = async (id) => {
    const db = await orbitdb.log(id);
    await db.load();
    const result = db.iterator({ limit: -1 }).collect();
    console.log("result", result);
    return result;
  };

  const mintPuzzle = async (url) => {
    const deployedNetwork = Puzzles.network[networkId];
    const contract = new web3.eth.Contract(
      Puzzles.abi,
      deployedNetwork && deployedNetwork.address
    );
    await contract.methods.mint(accounts[0], url).send({ from: accounts[0] });
  };

  const purchasePuzzle = async (tokenId, contractAddress) => {
    const deployedNetwork = Puzzles.network[networkId];
    const contract = new web3.eth.Contract(
      Puzzles.abi,
      deployedNetwork && deployedNetwork.address
    );
    await contract.methods
      .transferFrom(contractAddress, accounts[0], tokenId)
      .send({ from: accounts[0] });
  };
  const claimPuzzle = async (counter) => {
    const deployedNetwork = Puzzles.network[networkId];
    const contract = new web3.eth.Contract(
      Puzzles.abi,
      deployedNetwork && deployedNetwork.address
    );
    await contract.methods.claimReward(counter).send({ from: accounts[0] });
  };
  const startGameWhite = async (amount, id) => {
    const deployedNetwork = Betting.networks[networkId];
    const contract = new web3.eth.Contract(
      Betting.abi,
      deployedNetwork && deployedNetwork.address
    );
    const matchId = web3.fromAscii(id);
    await contract.methods
      .startMatchWhite(amount, matchId)
      .send({ from: accounts[0] });
  };

  const startGameBlack = async (amount, id) => {
    const deployedNetwork = Betting.networks[networkId];
    const contract = new web3.eth.Contract(
      Betting.abi,
      deployedNetwork && deployedNetwork.address
    );
    const matchId = web3.fromAscii(id);
    await contract.methods
      .startMatchBlack(amount, matchId)
      .send({ from: accounts[0] });
  };

  const finishGame = async (winner, id) => {
    // only to be called by the winner.
    const deployedNetwork = Betting.networks[networkId];
    const contract = new web3.eth.Contract(
      Betting.abi,
      deployedNetwork && deployedNetwork.address
    );
    const matchId = web3.fromAscii(id);
    await contract.methods
      .claimReward(winner, matchId)
      .send({ from: accounts[0] });
  };

  const [userName, setUserName] = useState("");
  const [time, setTime] = useState();
  const [stake, setStake] = useState();
  const firebaseApp = firebase.apps[0];

  return (
    <>
      <Header accounts={accounts !== undefined && accounts} />
      <ColorContext.Provider
        value={{
          didRedirect: didRedirect,
          playerDidRedirect: playerDidRedirect,
          playerDidNotRedirect: playerDidNotRedirect,
        }}
      >
        <Router>
          <Switch>
            <Route path="/" exact>
              <Home />
            </Route>
            <Route path="/newGame" exact>
              <Onboard
                setUserName={setUserName}
                setTime={setTime}
                setStake={setStake}
              />
            </Route>
            <Route path="/puzzles" exact>
              <Puzzles />
            </Route>

            <Route path="/marketplace" exact>
              <Marketplace />
            </Route>

            <Route path="/game/:gameid" exact>
              {didRedirect ? (
                <React.Fragment>
                  <JoinGame
                    userName={userName}
                    isCreator={true}
                    time={time}
                    stake={stake}
                  />
                  <ChessGame myUserName={userName} time={time} stake={stake} />
                </React.Fragment>
              ) : (
                <JoinRoom />
              )}
            </Route>
            <Redirect to="/" />
          </Switch>
        </Router>
      </ColorContext.Provider>{" "}
    </>
  );
}

export default App;
