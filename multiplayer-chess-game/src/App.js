import React , {useState, useEffect} from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import JoinRoom from './onboard/joinroom';
import { ColorContext } from './context/colorcontext';
import Onboard from './onboard/onboard';
import JoinGame from './onboard/joingame';
import ChessGame from './chess/ui/chessgame';
import Puzzles from './pages/puzzles';
import Marketplace from './pages/marketplace';
import Home from './containers/Home';
import firebase from "firebase";
import Header from './components/Header';
import { getWeb3 } from './utils';

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

  const [didRedirect, setDidRedirect] = useState(false)
  const [web3, setWeb3] = useState(undefined);
  const [accounts, setAccounts] = useState(undefined);

  useEffect(() => {
    const init = async () => {
      const web3 = await getWeb3();
      const accountsmain = await window.ethereum.request({ method: 'eth_requestAccounts' });

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
    }
    init();
    window.ethereum.on('accountsChanged', accounts => {
      setAccounts(accounts);
    });
  }, []);

  const playerDidRedirect = React.useCallback(() => {
    setDidRedirect(true)
  }, [])

  const playerDidNotRedirect = React.useCallback(() => {
    setDidRedirect(false)
  }, [])

  const [userName, setUserName] = useState('')
  const [time, setTime] = useState()
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
    </ColorContext.Provider> </>
  );
  
}

export default App;
