import React, { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import AddVehiclePage from './pages/AddVehiclePage';
import { Toaster } from 'react-hot-toast';
import SearchBookPage from './pages/SearchBookPage';
import BookingHistoryPage from './pages/BookingHistoryPage';
import Loader from './pages/Loader';

const App = () => {
  const [pageReady, setPageReady] = useState(false);

useEffect(() => {
  const timer = setTimeout(() => setPageReady(true), 1000); // wait before show
  return () => clearTimeout(timer);
}, []);

  if (!pageReady) {
    return <Loader />;
  }

  return (
    <>
    <Navbar />
    <Toaster position="top-center" reverseOrder={false} />
    <div className="min-h-screen bg-gray-100">
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddVehiclePage />} />
        <Route path="/book" element={<SearchBookPage />} />
        <Route path="/history" element={<BookingHistoryPage />} />
      </Routes>
    </div>
    </>
  )
}

export default App