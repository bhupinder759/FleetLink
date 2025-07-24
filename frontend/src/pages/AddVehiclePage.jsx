import { useState } from 'react';
import axios from 'axios';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

function AddVehiclePage() {
  const [vehicle, setVehicle] = useState({
    name: '',
    capacityKg: '',
    tyres: ''
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setVehicle({ ...vehicle, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!vehicle.name || !vehicle.capacityKg || !vehicle.tyres) {
      toast.error("All fields are required");
      return;
    }

    setLoading(true);
    try {
      await axios.post("http://localhost:5000/api/vehicles", {
        name: vehicle.name,
        capacityKg: Number(vehicle.capacityKg),
        tyres: Number(vehicle.tyres)
      });

      toast.success("Vehicle added successfully!");
      setVehicle({ name: '', capacityKg: '', tyres: '' });
    } catch (err) {
      console.error("Error adding vehicle:", err);
      toast.error("Error adding vehicle");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4 py-16">
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, type: 'spring' }}
        className="bg-[#111] border border-gray-800 rounded-2xl p-8 w-full max-w-md shadow-[0_0_32px_#ff730030]"
      >
        <motion.h2
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-3xl font-bold mb-6 text-center text-[#ff7300]"
        >
          Add New Vehicle
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-6"
        >
          <Label htmlFor="name">Vehicle Name</Label>
          <Input
            id="name"
            name="name"
            value={vehicle.name}
            onChange={handleChange}
            placeholder="e.g. Tata 407"
            className="mt-2 bg-[#181818] text-white placeholder-gray-500 border border-gray-700 focus:outline-none"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-6"
        >
          <Label htmlFor="capacityKg">Capacity (KG)</Label>
          <Input
            id="capacityKg"
            name="capacityKg"
            type="number"
            value={vehicle.capacityKg}
            onChange={handleChange}
            placeholder="e.g. 1200"
            className="mt-2 bg-[#181818] text-white placeholder-gray-500 border border-gray-700"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-6"
        >
          <Label htmlFor="tyres">No. of Tyres</Label>
          <Input
            id="tyres"
            name="tyres"
            type="number"
            value={vehicle.tyres}
            onChange={handleChange}
            placeholder="e.g. 6"
            className="mt-2 bg-[#181818] text-white placeholder-gray-500 border border-gray-700 focus:border-white"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.75 }}
        >
          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-[#ff7300] hover:bg-[#ff7300dd] text-white"
          >
            {loading ? "Adding..." : "Add Vehicle"}
          </Button>
        </motion.div>
      </motion.form>
    </div>
  );
}

export default AddVehiclePage;
