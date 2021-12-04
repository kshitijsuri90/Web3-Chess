import "./../../containers/Home.css";
import React from "react";
import Hero from "../../components/Header";
import Footer from "../../components/Footer";

function Home() {
  return (
    <div className="Home">
      <Hero/>
      <section className="banner_section_local">
      <h2> Moves Marketplace </h2>
        </section>
      <Footer />
    </div>
  );
}

export default Home;
