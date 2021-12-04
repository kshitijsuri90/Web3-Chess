import img from "../chess/assets/illustration-stay-productive.png";
import icon from "../chess/assets/icon-arrow.svg";
import React from "react";

function Cta() {
  return (
    <section className="Cta__section">
      <div className="Cta__text">
        <h2 className="Cta__title"> Stay Productive, wherever you are</h2>
        <div className="Cta__desc">
          <p className="desc">
            Never let location be an issue when accessing your files. Fylo has
            you covered for all of your file storage needs.
          </p>
          <p className="desc">
            Securely share files and folders with friends, family and colleagues
            for live collaboration. No email attachments required.
          </p>
        </div>
        <a href="frontendmentor.io" className="Cta__link">
          See how Fylo works
          <img src={icon} alt="" />
        </a>
      </div>
      <img src={img} alt="" className="Cta__img" />
    </section>
  );
}

export default Cta; 