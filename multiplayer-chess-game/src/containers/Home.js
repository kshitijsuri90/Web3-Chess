import "./Home.css";
import React from "react";
import Hero from "../components/Banner";
import Cta from "../components/Cta";
import Footer from "../components/Footer";
import Form from '../components/Form';

function Home({accounts}) {
  return (
    <div className="Home">
      <Hero accounts={accounts} />
      <Cta />
      <Footer />
    </div>
  );
}

export default Home;
