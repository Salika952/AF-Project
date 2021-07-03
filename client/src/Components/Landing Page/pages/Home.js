import React from 'react';
import '../../../App.css'
import Cards from '../Cards';
import HeroSection from '../HeroSection';
import Header from "../../navbar/guestHeader";

function Home() {
  return (
    <>
        <Header/>
      <HeroSection />
      <Cards />
    </>
  );
}

export default Home;
