import React from 'react'

const Hero = () => {
  return (
    <div className="hero relative">

      <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-full md:w-1/2 px-6 md:px-12 lg:px-20">
        <div className="text-left">
          <h2 className="text-white text-3xl md:text-5xl font-bold mb-4">
            Fresh Groceries Delivered to Your Doorstep
          </h2>

          <p className="text-white text-sm md:text-base mb-6">
            Shop from a wide selection of fresh fruits, vegetables,
            dairy products, beverages, snacks, household essentials, and daily necessities.
            Enjoy high-quality products, affordable prices, convenient online ordering, and fast delivery that
            brings everything you need directly to your home, saving you time and making grocery shopping easier than ever.
          </p>

          {/* Button */}
          <button className="bg-[#ffb20a] text-black px-6 py-3 rounded-lg hover:opacity-90 transition">
            Shop Now
          </button>
        </div>
      </div>

    </div>
  )
}

export default Hero