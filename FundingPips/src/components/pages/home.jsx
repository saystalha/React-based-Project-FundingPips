import React from 'react'
import HeroSection from '../views/homeviews/HeroSection' // Ensure path matches your folder structure
import Featured from '../views/homeviews/featured'       // Ensure path matches your folder structure
import Faqs from '../views/homeviews/Faqs'               // Ensure path matches your folder structure

const Home = () => {
  return (
    <div className="w-full space-y-8">
      {/* 1. Hero Section (Top Banner) */}
      <HeroSection />

      {/* 2. Featured Highlights */}
      <Featured />

      {/* 3. Frequently Asked Questions */}
      <Faqs />
    </div>
  )
}

export default Home