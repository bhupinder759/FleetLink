import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

function BookingHistoryPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);

  const customerId = "demo-user-1"; // can later make dynamic

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/bookings/get`, {
        params: { customerId }
      });
      setBookings(res.data);
    } catch (err) {
      toast.error("Failed to load bookings");
    } finally {
      setLoading(false);
    }
  };

  const cancelBooking = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/bookings/${id}`);
      toast.success("Booking canceled");
      setBookings(bookings.filter(b => b._id !== id));
    } catch (err) {
      toast.error("Error canceling booking");
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-[#ff7300] mb-6">Your Bookings</h2>

        {loading ? (
          <p className="text-gray-400">Loading bookings...</p>
        ) : bookings.length === 0 ? (
          <p className="text-gray-500 italic">No bookings found.</p>
        ) : (
          <div className="space-y-6">
            {bookings.map((b, index) => (
              <motion.div
                key={b._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-[#1a1a1a] border border-gray-700 rounded-xl p-5"
              >
                <h3 className="text-xl text-[#ff7300] font-bold mb-2">Booking #{index + 1}</h3>
                <p className="text-sm text-gray-300">Vehicle ID: {b.vehicleId}</p>
                <p className="text-sm text-gray-300">From: {b.fromPincode} → {b.toPincode}</p>
                <p className="text-sm text-gray-400">
                  {new Date(b.startTime).toLocaleString()} → {new Date(b.endTime).toLocaleString()}
                </p>
                <Button
                  onClick={() => cancelBooking(b._id)}
                  variant="destructive"
                  className="mt-4"
                >
                  Cancel Booking
                </Button>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default BookingHistoryPage;
