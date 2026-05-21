import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const text = "Welcome Hamro Grocery";
  const letters = text.split("");
  const [bgColors, setBgColors] = useState(["#FCD34D", "#A855F7", "#22C55E"]);
const navigate = useNavigate();

useEffect(() => {
  const timer = setTimeout(() => {
    navigate("/home"); // redirect to Home page
  }, 5000); // 5000ms = 5 seconds (change as needed)

  return () => clearTimeout(timer);
}, [navigate]);

  useEffect(() => {
    const interval = setInterval(() => {
      setBgColors([
        `hsl(${Math.random() * 360}, 70%, 60%)`,
        `hsl(${Math.random() * 360}, 70%, 60%)`,
        `hsl(${Math.random() * 360}, 70%, 60%)`,
      ]);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative flex items-center justify-center min-h-screen overflow-hidden bg-gradient-to-br from-gray-50 to-gray-200">
      {/* Animated Circular Backgrounds */}
      <div
        className="absolute rounded-full blur-3xl opacity-30 animate-pulse circle-1"
        style={{
          width: "400px",
          height: "400px",
          top: "10%",
          left: "-10%",
          backgroundColor: bgColors[0],
          transition: "background-color 1.5s ease",
        }}
      ></div>
      <div
        className="absolute rounded-full blur-3xl opacity-30 animate-bounce circle-2"
        style={{
          width: "500px",
          height: "500px",
          bottom: "-20%",
          right: "-10%",
          backgroundColor: bgColors[1],
          transition: "background-color 1.5s ease",
        }}
      ></div>
      <div
        className="absolute rounded-full blur-3xl opacity-30 animate-ping circle-3"
        style={{
          width: "300px",
          height: "300px",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: bgColors[2],
          transition: "background-color 1.5s ease",
        }}
      ></div>

      {/* Additional floating circles */}
      <div
        className="absolute rounded-full blur-xl opacity-20 animate-spin circle-4"
        style={{
          width: "200px",
          height: "200px",
          top: "60%",
          left: "15%",
          backgroundColor: bgColors[0],
          transition: "background-color 1.5s ease",
        }}
      ></div>
      <div
        className="absolute rounded-full blur-xl opacity-20 animate-pulse circle-5"
        style={{
          width: "250px",
          height: "250px",
          top: "20%",
          right: "15%",
          backgroundColor: bgColors[1],
          transition: "background-color 1.5s ease",
        }}
      ></div>

      {/* Main Text */}
      <div className="relative z-10">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-purple-400 flex flex-wrap justify-center gap-x-1">
          {letters.map((char, index) => (
            <span
              key={index}
              className="inline-block animate-letter-bounce letter-span"
              style={{
                animationDelay: `${index * 0.05}s`,
                animationDuration: "0.6s",
              }}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </h1>
      </div>
    </div>
  );
};

export default Welcome;