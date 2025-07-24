import { NavLink } from 'react-router-dom';
import { FaHome, FaPlusCircle, FaSearch, FaClock } from 'react-icons/fa';
import { useEffect, useState } from 'react';

function Navbar() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navLinks = [
    { to: '/', label: 'Home', icon: <FaHome /> },
    { to: '/add', label: 'Add', icon: <FaPlusCircle /> },
    { to: '/book', label: 'Book', icon: <FaSearch /> },
    { to: '/history', label: 'History', icon: <FaClock /> }
  ];

  return (
    <>
      {/* Desktop Navbar */}
      {!isMobile && (
        <nav className="w-full flex items-center justify-between px-12 py-10 bg-black">
          {/* Left: Logo */}
          <div className="text-[#ff7300] font-extrabold text-4xl tracking-wider">FleetLink</div>

          {/* Center: Nav Links wrapped with border */}
          <div className="flex items-center gap-6 px-7 py-3 rounded-full border border-gray-700 bg-transparent shadow-inner">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `text-lg font-medium transition-all duration-300 ${
                    isActive ? 'text-[#ff7300]' : 'text-white'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* Right: Search Input */}
          <div>
            <input
              type="text"
              placeholder="Search..."
              className="bg-[#181818] border border-gray-700 text-sm px-3 py-1 rounded-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ff7300]"
            />
          </div>
        </nav>
      )}

      {/* Mobile Bottom Navbar */}
      {isMobile && (
        <>
        <div className="h-16 bg-[#ff7300]"><h2 className='text-3xl font-bold text-black text-center pt-4'>FleetLink</h2></div>
        <nav className="fixed bottom-0 left-0 right-0 z-50 bg-black border-t border-gray-800 px-6 py-2 flex justify-between items-center">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center text-xs ${
                  isActive ? 'text-[#ff7300]' : 'text-white'
                }`
              }
            >
              <div className="text-xl">{link.icon}</div>
              <span>{link.label}</span>
            </NavLink>
          ))}
        </nav>
        </>
      )}
    </>
  );
}

export default Navbar;
