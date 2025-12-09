import React, { useState } from 'react'
import HeroSection from '../views/homeviews/HeroSection' // Ensure path matches your folder structure
import Featured from '../views/homeviews/featured'       // Ensure path matches your folder structure
import Faqs from '../views/homeviews/Faqs'               // Ensure path matches your folder structure

const Home = () => {
  const [a,seta] = useState(0)
  const handleClick = () => {
    seta(a + 1)
    console.log(a)
  }
  return (
    <div className="w-full space-y-8">
      {/* 1. Hero Section (Top Banner) */}
      <button onClick = {handleClick} color='White'> Increment</button>
      <HeroSection />

      {/* 2. Featured Highlights */}
      <Featured />

      {/* 3. Frequently Asked Questions */}
      <Faqs />
    </div>
  )
}

export default Home