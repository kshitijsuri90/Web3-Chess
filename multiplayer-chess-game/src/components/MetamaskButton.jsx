import React, { useEffect, useState } from "react";
import { getWeb3 } from "./utils.js";

function App() {
  const [web3, setWeb3] = useState(undefined);
  const [accounts, setAccounts] = useState(undefined);
  window.ethereum.on("accountsChanged", (accounts) => {
    setAccounts(accounts);
  });

  const connect = async () => {
    const web3 = await getWeb3();
    const accounts = await web3.eth.getAccounts();
    const networkId = await web3.eth.net.getId();
    console.log("accounts", accounts[0]);
    console.log(networkId);
  };

  return (
    <div className="container">
      <button onClick={() => connect()}> Connect </button>
      {console.log(accounts) && accounts[0]}{" "}
    </div>
  );
}

export default App;
