import { useEffect, useState } from 'react';
import truck from '../assets/truchpng.png'; // Neon truck PNG
import { motion } from 'framer-motion';
import { FaTruckMoving, FaSearchLocation } from 'react-icons/fa';

function Home() {
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowText(true), 1600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-black min-h-screen text-white flex flex-col items-center justify-center font-sans">
      {/* Hero Section */}
      <section className="w-full h-screen flex flex-col items-center justify-center relative overflow-hidden px-4">
        {/* Animated Truck Image */}
        <motion.img
          src={truck}
          alt="FleetLink Truck"
          initial={{ x: '100vw', opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1.5, type: 'spring' }}
          className="max-w-[600px] w-full drop-shadow-[0_15px_30px_rgba(255,115,0,0.4)]"
        />

        {/* Text Below Truck */}
        {showText && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-center mt-6"
          >
            <h1 className="text-4xl md:text-5xl font-bold">Welcome to FleetLink</h1>
            <p className="text-lg md:text-xl text-gray-300 mt-4 max-w-[500px] mx-auto">
              Manage and book logistics vehicles with ease.
            </p>
          </motion.div>
        )}
      </section>

      {/* Service Cards Section */}
      <section className="py-14 bg-[#111] w-full px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, type: 'spring', bounce: 0.25 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-[#1b1b1b] to-[#191919] p-7 rounded-2xl border border-gray-800 shadow-lg flex flex-col items-start gap-3 hover:shadow-[0_0_32px_#ff7300aa] transition-shadow"
          >
            <FaTruckMoving className="text-3xl text-[#ff7300] drop-shadow-[0_0_8px_#ff7300]" />
            <h3 className="text-2xl font-semibold mb-1 text-white">Add Vehicles</h3>
            <p className="text-gray-400 font-normal">Easily add trucks and vehicles to your fleet in a few clicks.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.5, type: 'spring', bounce: 0.25 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-[#1b1b1b] to-[#191919] p-7 rounded-2xl border border-gray-800 shadow-lg flex flex-col items-start gap-3 hover:shadow-[0_0_32px_#ff7300aa] transition-shadow"
          >
            <FaSearchLocation className="text-3xl text-[#ff7300] drop-shadow-[0_0_8px_#ff7300]" />
            <h3 className="text-2xl font-semibold mb-1 text-white">Quick Booking</h3>
            <p className="text-gray-400 font-normal">Search vehicles by route, capacity and make instant bookings.</p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full bg-black text-gray-500 text-center py-4 border-t border-gray-800 text-xs md:text-sm">
        © 2025 FleetLink. All rights reserved.
      </footer>
    </div>
  );
}

export default Home;