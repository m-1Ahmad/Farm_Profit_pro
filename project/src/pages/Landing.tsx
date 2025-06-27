import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Features from '../components/Features';
import UnlockSection from '../components/UnlockSection';
import Footer from '../components/Footer';

function Landing() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <Features />
      <UnlockSection />
      <Footer />
    </div>
  );
}

export default Landing;