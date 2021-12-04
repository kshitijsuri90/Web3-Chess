import React from "react";

function Button(props) {
  return (
    <div>
      <div className="custom_button" onClick={props.onClick}>
        <h3>{props.text}</h3>
      </div>
    </div>
  );
}

export default Button;
