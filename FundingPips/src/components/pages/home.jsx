import React, { useState } from 'react'
import HeroSection from '../views/homeviews/HeroSection'
import Featured from '../views/homeviews/featured'
import Faqs from '../views/homeviews/Faqs'

const Home = () => {
//   const [a,setA] = useState(0)
//   const handleClick = () => {
//     setA(a + 1)
//     console.log(a)
//   }
  return (
    <div className="w-full space-y-8">
      {/* 1. Hero Section */}
      {/* <button onClick = {handleClick} color='White'> Increment</button> */}
      
      <HeroSection />

      {/* 2. Featured Highlights */}
      <Featured />

      {/* 3. Frequently Asked Questions */}
      <Faqs />
    </div>
  )
}

export default Home