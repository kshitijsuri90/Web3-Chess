import Logo from "../chess/assets/logo.svg";
import locationIcon from "../chess/assets/icon-location.svg";
import phoneIcon from "../chess/assets/icon-phone.svg";
import emailIcon from "../chess/assets/icon-email.svg";
import React from "react";

function Footer() {
  return (
    <section className="footer">
      <div className="footer__content">
      <div className="footer__info">
        <div className="info contact__location">
          <img src={locationIcon} alt="" className="info__icon location"/>
          <p className="info__text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</p>
        </div>
        <div className="info contact__phone">
          <img src={phoneIcon} alt="" className="info__icon"/>
          <p className="info__text">+1-543-123-4567</p>
        </div>
        <div className="info contact__email">
          <img src={emailIcon} alt="" className="info__icon" />
          <p className="info__text">example@fylo.com</p>
        </div>
      </div>
      <div className="footer__nav1">
        <a href="Brendamichellle.com" className="nav__link">About Us</a>
        <a href="Brendamichellle.com" className="nav__link">Jobs</a>
        <a href="Brendamichellle.com" className="nav__link">Press</a>
        <a href="Brendamichellle.com" className="nav__link">Blog</a>
      </div>
      <div className="footer__nav2">
        <a href="Brendamichellle.com" className="nav__link">Contact Us</a>
        <a href="Brendamichellle.com" className="nav__link">Terms</a>
        <a href="Brendamichellle.com" className="nav__link">Privacy</a>
      </div>
      </div>
    </section>
  )
}

export default Footer;