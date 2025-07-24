import { useState } from 'react';
import axios from 'axios';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import toast from 'react-hot-toast';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { motion } from 'framer-motion';

function SearchBookPage() {
  const [form, setForm] = useState({
    capacityRequired: '',
    fromPincode: '',
    toPincode: '',
    startTime: new Date()
  });

  const [loading, setLoading] = useState(false);
  const [vehicles, setVehicles] = useState([]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setVehicles([]);

    try {
      const params = {
        capacityRequired: form.capacityRequired,
        fromPincode: form.fromPincode,
        toPincode: form.toPincode,
        startTime: form.startTime.toISOString()
      };

      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/vehicles/available`, { params });
      setVehicles(res.data);
      if (res.data.length === 0) {
        toast("No vehicles available.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch vehicles.");
    } finally {
      setLoading(false);
    }
  };

  const handleBooking = async (vehicleId) => {
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/bookings`, {
        vehicleId,
        fromPincode: form.fromPincode,
        toPincode: form.toPincode,
        startTime: form.startTime,
        customerId: "demo-user-1"
      });

      toast.success("Vehicle booked successfully!");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Booking failed");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-xl mx-auto bg-[#111] border border-gray-800 rounded-2xl p-6 shadow-[0_0_32px_#ff730020]"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-[#ff7300]">Search Available Vehicles</h2>
        <form onSubmit={handleSearch} className="space-y-4">
          <div>
            <Input
              type="number"
              name="capacityRequired"
              value={form.capacityRequired}
              onChange={handleChange}
              placeholder="Capacity Required (KG)"
              className="bg-[#181818] text-white placeholder-gray-500 border border-gray-700"
            />
          </div>
          <div>
            <Input
              name="fromPincode"
              value={form.fromPincode}
              onChange={handleChange}
              placeholder="From Pincode"
              className="bg-[#181818] text-white placeholder-gray-500 border border-gray-700"
            />
          </div>
          <div>
            <Input
              name="toPincode"
              value={form.toPincode}
              onChange={handleChange}
              placeholder="To Pincode"
              className="bg-[#181818] text-white placeholder-gray-500 border border-gray-700"
            />
          </div>
          <div>
            <DatePicker
              selected={form.startTime}
              onChange={(date) => setForm({ ...form, startTime: date })}
              showTimeSelect
              timeFormat="HH:mm"
              dateFormat="yyyy-MM-dd HH:mm"
              className="w-full bg-[#181818] text-white border border-gray-700 px-3 py-2 rounded-md"
            />
          </div>
          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-[#ff7300] hover:bg-[#ff7300dd] text-white"
          >
            {loading ? "Searching..." : "Search Availability"}
          </Button>
        </form>
      </motion.div>

      {loading ? (
  <div className="text-center text-gray-400 py-10">Loading available vehicles...</div>
) : (
  vehicles.length > 0 ? (
        <div className="mt-10 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {vehicles.map((v, index) => (
            <motion.div
              key={v._id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-[#1a1a1a] border border-gray-700 rounded-xl p-5 shadow hover:shadow-[0_0_24px_#ff730055] transition"
            >
              <h3 className="text-xl font-bold text-[#ff7300] mb-2">{v.name}</h3>
              <p className="text-sm text-gray-300">Capacity: {v.capacityKg} KG</p>
              <p className="text-sm text-gray-300">Tyres: {v.tyres}</p>
              <p className="text-sm text-gray-400 mt-2 italic">
                Estimated Ride: {v.estimatedRideDurationHours} hours
              </p>
              <Button
                onClick={() => handleBooking(v._id)}
                className="mt-4 bg-[#ff7300] hover:bg-[#ff7300cc] text-white w-full"
              >
                {loading ? <span className="animate-pulse">Searching...</span> : "Search Availability"}
              </Button>
            </motion.div>
          ))}
        </div>
      ) : (
    <p className="text-center text-gray-500 py-8 italic">No vehicles found. Try a different route/time.</p>
  )
)}
    </div>
  );
}

export default SearchBookPage;
