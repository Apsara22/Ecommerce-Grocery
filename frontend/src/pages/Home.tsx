import React from 'react'
import Navbar from '../component/Navbar'  
import Hero from '../component/Hero'    
import Footer from '../component/Footer'  

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Hero />
      </main>
      <Footer />
    </div>
  )
}

export default Home