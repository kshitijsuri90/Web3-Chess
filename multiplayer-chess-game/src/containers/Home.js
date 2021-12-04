import "./Home.css";
import React from "react";
import Hero from "../components/Banner";
import Cta from "../components/Cta";
import Footer from "../components/Footer";
import Form from '../components/Form';

function Home() {
  return (
    <div className="Home">
      <Hero/>
      <Cta />
      <Footer /> 
    </div>
  );
}

export default Home;
