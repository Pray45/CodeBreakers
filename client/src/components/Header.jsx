import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Shop', path: '/shop' },
  { name: 'Sell', path: '/sell' },
  { name: 'About', path: '/about' },
];

const Header = () => {
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = sessionStorage.getItem('user');
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const handleLogout = async () => {
    try {
      await axios.get('http://localhost/CodeBreakers/logic/logout.php', {
        withCredentials: true,
      });
      sessionStorage.clear();
      setUser(null);
      setMenuOpen(false);
      navigate('/'); // redirect to home
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  // Close menu if clicked outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="bg-surface pl-16 py-4 flex justify-between items-center border-b border-muted relative">
      <div className="text-clr font-bold text-4xl">ReWear</div>

      {/* Navigation Links */}
      <nav className="hidden gap-6 xl:gap-10 2xl:gap-14 text-base xl:text-xl font-semibold">
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
      <div className="flex items-center gap-4 pr-6 relative">
        <input
          type="text"
          placeholder="Search"
          className="px-4 py-2 rounded-2xl bg-background text-white focus:outline-none border-1 border-white transition duration-200 w-40 md:w-80"
        />

        {/* Auth Section */}
        {!user ? (
          <button
            className="bg-primary text-white px-5 py-2 rounded-2xl font-semibold hover:opacity-90 transition"
            onClick={() => navigate('/login')}
          >
            Login
          </button>
        ) : (
          <div className="relative" ref={menuRef}>
            <div
              onClick={() => setMenuOpen((prev) => !prev)}
              className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center cursor-pointer font-bold hover:opacity-90"
              title="Account"
            >
              {user.name?.charAt(0).toUpperCase() || 'U'}
            </div>

            {/* Dropdown Menu */}
            {menuOpen && (
              <div className="absolute right-0 top-12 bg-white shadow-lg rounded-md text-black w-40 z-50">
                <Link
                  to="/orders"
                  className="block px-4 py-2 hover:bg-gray-100"
                  onClick={() => setMenuOpen(false)}
                >
                  My Orders
                </Link>
                <Link
                  to="/listings"
                  className="block px-4 py-2 hover:bg-gray-100"
                  onClick={() => setMenuOpen(false)}
                >
                  My Listings
                </Link>
                <Link
                  to="/profile"
                  className="block px-4 py-2 hover:bg-gray-100"
                  onClick={() => setMenuOpen(false)}
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
