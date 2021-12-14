import "./Home.css";
import React from "react";
import Banner from "../components/Banner";
import Cta from "../components/Cta";
import Footer from "../components/Footer";
import Form from '../components/Form';

function Home({accounts}) {
  return (
    <div>
      <Banner accounts={accounts} />
      <Cta />
    </div>
  );
}

export default Home;
