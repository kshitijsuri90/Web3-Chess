import React from "react";
import Logo from "../chess/assets/logo.svg";
import { Dropdown } from "semantic-ui-react";
import "semantic-ui-css/components/dropdown.css";
import "semantic-ui-css/components/menu.css";
import "semantic-ui-css/components/transition.css";

function Header({ accounts }) {
  return (
    <div className="header__navbar">
      <img src={Logo} alt="" className="logo" />
      <ul className="navbar">
      <li>
          <Dropdown text="Account" pointing className="link item">
            {(() => {
              if (false) {
                return (
                  <Dropdown.Menu>
                    <Dropdown.Item
                      className="button-disconnect"
                      
                    >
                      Disconnect Wallet
                    </Dropdown.Item>
                  </Dropdown.Menu>
                );
              } else {
                if (true) {
                  return (
                    <Dropdown.Menu>
                      <Dropdown.Item style={{fontSize: "13px"}}>
                        
                        {accounts.toString().substring(0,8)} 
                        ...
                        {accounts.toString().substring(35,41)}  
                      </Dropdown.Item>
                    
                    </Dropdown.Menu>
                  );
                } else {
                  return (
                    <Dropdown.Menu>
                      <Dropdown.Item>Retry</Dropdown.Item>
                    </Dropdown.Menu>
                  );
                }
              }
            })()}
          </Dropdown>
        </li>

        <li id="features" className="navbar__item">
          <a href="/">App</a>
        </li>
        <li id="features" className="navbar__item">
          <a href="/challenge"> Challenge </a>
        </li>
        <li id="features" className="navbar__item">
          <a href="/puzzles"> Puzzles </a>
        </li>
        <li id="team" className="navbar__item">
          <a href="/marketplace"> Marketplace </a>
        </li>
      </ul>
    </div>
  );
}

export default Header;
