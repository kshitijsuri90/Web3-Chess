import "./Home.css";
import React from "react";
import Hero from "../../components/Banner";
import Footer from "../../components/Footer";

function Home() {
  return (
    <div className="Home">
      <Hero/>
       <h2> Puzzles </h2>
      <Footer />
    </div>
  );
}

export default Home;
