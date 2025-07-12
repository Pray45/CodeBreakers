import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="p-4">
        <div className="w-full rounded-xl overflow-hidden">
          <img
            src="/your-banner-image.jpg" // replace with actual image path
            alt="Hero Banner"
            className="w-full h-auto rounded-xl object-cover"
          />
        </div>
        <h1 className="text-4xl text-center mt-4 font-bold text-[#00FF88]">
          Anomaly's Dark Abyss
        </h1>
      </section>
  );
};

export default Hero;
