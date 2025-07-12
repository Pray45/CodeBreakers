import React from 'react';
import Header from '../components/Header';
import Categories from '../components/Categories';
import Features from '../components/Features';
import Footer from '../components/Footer';
import Hero from '../components/Hero';


const Home = () => {
  return (
    <div className="bg-[#1e1e1e] text-white">
      <Header />
      <Hero/>
      <Categories />
      <Features />
      <Footer />
    </div>
  );
};

export default Home;
