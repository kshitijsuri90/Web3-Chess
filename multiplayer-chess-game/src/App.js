import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Navigate,
  Routes,
} from "react-router-dom";
import JoinRoom from "./onboard/joinroom";
import { ColorContext } from "./context/colorcontext";
import Onboard from "./onboard/onboard";
import JoinGame from "./onboard/joingame";
import ChessGame from "./chess/ui/chessgame";
import Home from "./containers/Home";
import firebase from "firebase";

import { getWeb3 } from "./utils";

import Token from "./chesstopia/artifacts/contracts/Token.sol/Token.json";
import Betting from "./chesstopia/artifacts/contracts/Betting.sol/Staking.json";
import PuzzlesC from "./chesstopia/artifacts/contracts/NFT.sol/Puzzles.json";

import Challenge from "./containers/Challenges";
import WalletProfile from "./containers/WalletProfile";
import PuzzlePage from "./containers/PuzzlesPage";

const IPFS = require("ipfs");
const OrbitDB = require("orbit-db");
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
  const [web3, setWeb3] = useState(undefined);
  const [accounts, setAccounts] = useState(undefined);
  const [networkId, setNetworkId] = useState(undefined);
  const [didRedirect, setDidRedirect] = React.useState(false);

  const [token, setToken] = useState(undefined);
  const [betting, setBetting] = useState(undefined);
  const [puzzles, setPuzzles] = useState(undefined);
  const [balance, setBalance] = useState(0);

  const playerDidRedirect = React.useCallback(() => {
    setDidRedirect(true);
  }, []);

  const playerDidNotRedirect = React.useCallback(() => {
    setDidRedirect(false);
  }, []);

  useEffect(() => {
    const init = async () => {
      const web3 = await getWeb3();
      const accountsmain = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const accountsa = await web3.eth.getAccounts();
      const net = await web3.eth.net.getId();
      const deployedNetworkToken = Token.networks[net];

      const contractToken = new web3.eth.Contract(
        Token.abi,
        deployedNetworkToken && deployedNetworkToken.address
      );
      contractToken.options.address =
        "0x91391B107f329d13C2066982C01D00d0b89EF943";
      const balance = await contractToken.methods
        .balanceOf(accountsmain[0])
        .call();
      console.log("balance", balance);
      setBalance(balance);
      setToken(contractToken);

      const deployedNetworkBetting = Betting.networks[networkId];
      const contractBetting = new web3.eth.Contract(
        Betting.abi,
        deployedNetworkBetting && deployedNetworkBetting.address
      );
      contractBetting.options.address =
        "0x2B2370BB8D6F5A5Ffb6cAB9262CcF183D40a81bb";
      setBetting(contractBetting);

      const puzzleAddress = "0xa16B2B4fD8fe9be8089ac91050157e040c7c6eBf";
      const deployedNetworkPuzzle = PuzzlesC.networks[networkId];
      const contractPuzzle = new web3.eth.Contract(
        PuzzlesC.abi,
        deployedNetworkPuzzle && deployedNetworkPuzzle.address
      );
      contractPuzzle.options.address = puzzleAddress;
      setPuzzles(contractPuzzle);

      contractBetting.options.address =
        "0x2B2370BB8D6F5A5Ffb6cAB9262CcF183D40a81bb";
      setBetting(contractBetting);

      setWeb3(web3);

      console.log(web3.utils.asciiToHex("2016052820160528"));

      setAccounts(accountsa);
    };
    init();
    window.ethereum.on("accountsChanged", (accounts) => {
      setAccounts(accounts);
    });
  }, []);
  const getTokens = async (address) => {
    if (token !== undefined) {
      await Promise.all([
        token.methods.faucet(address, 10000000).send({ from: address }),
        // token.methods
        //   .approveContract("0xa16B2B4fD8fe9be8089ac91050157e040c7c6eBf")
        //   .send({ from: accounts[0] }),
        // token.methods
        //   .approveContract("0x2B2370BB8D6F5A5Ffb6cAB9262CcF183D40a81bb")
        //   .send({ from: accounts[0] }),
        token.methods
          .approve(
            "0x2B2370BB8D6F5A5Ffb6cAB9262CcF183D40a81bb",
            "100000000000000000000"
          )
          .send({ from: accounts[0] }),
      ]);
    }
  };
  const approveContract = async (address) => {
    await token.methods.approveContract(address).send({ from: accounts[0] });
  };

  const setData = async (id, data) => {
    const ipfs = await IPFS.create();
    const orbitdb = await OrbitDB.createInstance(ipfs);

    const db = await orbitdb.log(id);
    await db.load();
    const hash = await db.add(data);
  };

  const getData = async (id) => {
    const ipfs = await IPFS.create();
    const orbitdb = await OrbitDB.createInstance(ipfs);

    const db = await orbitdb.log(id);
    await db.load();
    const result = db.iterator({ limit: -1 }).collect();
    console.log("result", result);
    return result;
  };

  const mintPuzzle = async (url) => {
    await puzzles.methods.mint(accounts[0], url).send({ from: accounts[0] });
  };

  const purchasePuzzle = async (tokenId, contractAddress) => {
    const deployedNetwork = PuzzlesC.network[networkId];
    const contract = new web3.eth.Contract(
      PuzzlesC.abi,
      deployedNetwork && deployedNetwork.address
    );
    await contract.methods
      .transferFrom(contractAddress, accounts[0], tokenId)
      .send({ from: accounts[0] });
  };
  const claimPuzzle = async (counter) => {
    const deployedNetwork = PuzzlesC.network[networkId];
    const contract = new web3.eth.Contract(
      PuzzlesC.abi,
      deployedNetwork && deployedNetwork.address
    );
    await contract.methods.claimReward(counter).send({ from: accounts[0] });
  };

  const startGameWhite = async (amount, id) => {
    const matchId =
      "0x6c00000000000000000000000000000000000000000000000000000000000000";
    console.log("betting", betting);
    await betting.methods
      .startMatchWhite(amount, matchId)
      .send({ from: accounts[0] });
  };

  const startGameBlack = async (amount, id) => {
    const matchId =
      "0x6c00000000000000000000000000000000000000000000000000000000000000";
    //const matchId = web3.fromAscii(id);
    await betting.methods
      .startMatchBlack(amount, matchId)
      .send({ from: accounts[0] });
  };

  const finishGame = async (winner, id) => {
    const matchId =
      "0x6c00000000000000000000000000000000000000000000000000000000000000";
    // only to be called by the winner.
    await betting.methods
      .claimReward(winner, matchId)
      .send({ from: accounts[0] });
  };

  const [userName, setUserName] = useState("");
  const [time, setTime] = useState();
  const [stake, setStake] = useState();
  const firebaseApp = firebase.apps[0];

  return (
    <ColorContext.Provider
      value={{
        didRedirect: didRedirect,
        playerDidRedirect: playerDidRedirect,
        playerDidNotRedirect: playerDidNotRedirect,
      }}
    >
      <Router>
        <Routes>
          <Route
            path="/"
            element={accounts !== undefined && <Home accounts={accounts[0]} />}
          ></Route>
          <Route
            path="/newGame"
            element={
              puzzles !== undefined && (
                <Onboard
                  startGameWhite={startGameWhite}
                  setUserName={setUserName}
                  setTime={setTime}
                  setStake={setStake}
                  mintPuzzle={mintPuzzle}
                  claimReward={finishGame}
                />
              )
            }
          ></Route>
          <Route
            path="/wallet"
            element={
              <WalletProfile
                accounts={accounts}
                balance={balance}
                getTokens={getTokens}
              />
            }
          ></Route>
          <Route
            path="/puzzles"
            element={
              accounts !== undefined && <PuzzlePage accounts={accounts[0]} />
            }
          ></Route>
          <Route
            path="/challenges"
            element={
              accounts !== undefined && <Challenge accounts={accounts[0]} />
            }
          ></Route>
          <Route
            path="/game/:gameid"
            element={
              didRedirect ? (
                <React.Fragment>
                  <JoinGame
                    userName={userName}
                    isCreator={true}
                    time={time}
                    stake={stake}
                  />
                  <ChessGame
                    mintPuzzle={puzzles !== undefined && mintPuzzle}
                    claimReward={finishGame}
                    myUserName={userName}
                    time={time}
                    stake={stake}
                  />
                </React.Fragment>
              ) : (
                <JoinRoom
                  mintPuzzle={puzzles !== undefined && mintPuzzle}
                  claimReward={finishGame}
                  startGameBlack={startGameBlack}
                />
              )
            }
          ></Route>
        </Routes>
      </Router>
    </ColorContext.Provider>
  );
}

export default App;
