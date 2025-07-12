import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-surface py-8 text-center text-muted text-sm border-t border-muted">
      © {new Date().getFullYear()} ReWear. All rights reserved.
    </footer>
  );
};

export default Footer;
