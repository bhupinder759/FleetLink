# 🚚 FleetLink – Vehicle Booking System

FleetLink is a full-stack vehicle logistics web application that allows customers to add vehicles, check availability based on route and capacity, and make bookings for logistics needs.

### <img width="1920" height="1080" alt="Screenshot 2025-07-24 180806" src="https://github.com/user-attachments/assets/b9fcdbb1-99a5-4ace-9a6f-c86ca0d78a39" />
### <img width="1920" height="1080" alt="Screenshot 2025-07-24 180818" src="https://github.com/user-attachments/assets/e86a90e6-cd71-4462-8ecf-7c2265da4d87" />
### <img width="1920" height="1080" alt="Screenshot 2025-07-24 180834" src="https://github.com/user-attachments/assets/d0008da5-8d79-42e6-9e16-f65f28f749d2" />
### <img width="1920" height="1080" alt="Screenshot 2025-07-24 180846" src="https://github.com/user-attachments/assets/58f28f63-bf82-460d-bfce-d6ee11f5390a" />





---

## 📋 Task Overview (Given by Company)

This project was assigned as part of the interview task. Below are the original task requirements and their completion status:

### ✅ Core Requirements (Completed)
- [x] Add Vehicle with name, capacity, tyres
- [x] Book Vehicle with fromPincode, toPincode, startTime
- [x] Automatically calculate ride duration
- [x] Set ride endTime based on startTime + duration
- [x] Search vehicle availability using capacity, route and time
- [x] API for available vehicles
- [x] Display available vehicles on frontend
- [x] Book vehicle from frontend (demo customer)
- [x] Validate forms and show confirmation

---

## 💡 Bonus Features (Added for Better Experience)
These features were not in the original task but added to enhance UX and performance:

- 🎨 **Fully dark UI** with Tailwind CSS
- 🚀 **Animated Hero Page** with Truck animation (framer-motion)
- 📱 **Responsive Navbar** (desktop & mobile layout)
- 🧠 **Search & Booking Page** with:
  - Live form
  - Real-time results
  - Booking from frontend
- ✅ **Booking History Page** (View & Cancel Bookings)
- 🔄 **Cancel Booking** feature (DELETE API)
- 📦 **Loading & Empty State Handling**
- 🔔 **Toast notifications** (react-hot-toast)
- 🔍 **Search Input Field in Navbar**
- ✨ Neon hover effects and transitions
- 💾 MongoDB backend with Express.js REST API
- 🔐 CustomerId handled (demo user logic ready)

---

## 🛠 Tech Stack

### 🔹 Frontend
- React + Vite
- Tailwind CSS
- ShadCN/UI components
- Framer Motion (animations)
- Axios
- React Hot Toast
- React Router DOM

### 🔹 Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- CORS & dotenv

---

## 📁 Features Implemented

### 🚚 Add Vehicle
- Name
- Capacity in KG
- No. of tyres

### 🔍 Search Vehicles
- Capacity Required
- From → To Pincode
- Date & Time
- See available vehicles & ride durations

### 📆 Book Vehicles
- Create booking with vehicleId and route
- Hardcoded customerId (for now)
- Backend auto calculates ride end time

### 🧾 Booking History Page
- List of past bookings
- Cancel button
- Real-time updates

---

## 🚦 Installation & Setup

1. **Clone Repo**
   ```bash
   git clone https://github.com/your-username/fleetlink-task.git
   cd fleetlink-task


### 🔹 2. Backend Setup

```bash
cd backend
npm install
npm run dev

### 🔹 2. Backend Setup

```bash
cd frontend
npm install
npm run dev
