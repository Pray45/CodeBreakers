import React from 'react';
import { Link } from 'react-router-dom';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Shop', path: '/shop' },
  { name: 'Sell', path: '/sell' },
  { name: 'About', path: '/about' },
];

const Header = () => {
  return (
    <header className="bg-surface pl-16 py-4 flex justify-between items-center border-b border-muted">
      <div className="text-clr font-bold text-4xl">ReWear</div>

      {/* Navigation Links */}
      <nav className="hidden lg:flex gap-6 xl:gap-10 2xl:gap-14 text-base xl:text-xl font-semibold">
        {navLinks.map((link, index) => (
          <Link
            to={link.path}
            key={index}
            className="relative text-muted text-clr group transition duration-200 hover:text-primary cursor-pointer"
          >
            {link.name}
            <span className="absolute left-0 -bottom-0.5 h-[4px] w-full scale-x-0 bg-white transition-transform duration-300 group-hover:scale-x-100 origin-center" />
          </Link>
        ))}
      </nav>

      {/* Right Actions */}
      <div className="flex items-center gap-3 pr-4">
        {/* 🔍 Search Box */}
        <input
          type="text"
          placeholder="Search"
          className="px-4 py-2 rounded-2xl bg-background text-white focus:outline-none border-1 border-white transition duration-200 w-40 md:w-80"
        />

        {/* Auth Buttons */}
        <button className="bg-primary   text-white px-5 py-2 rounded-2xl font-semibold hover:opacity-90 transition">Shop Now</button>
        <button className="border-2 border-white text-white px-5 py-2 rounded-2xl font-semibold hover:opacity-90 transition">Shop Now</button>
        <button onClick={() => (sessionStorage.clear())} className="border-2 border-white text-white px-5 py-2 rounded-2xl font-semibold hover:opacity-90 transition">Logout</button>
      </div>
    </header>
  );
};

export default Header;
