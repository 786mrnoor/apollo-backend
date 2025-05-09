# 🩺 Doctor Listing Platform (Apollo Clone)

A full-stack clone of the Apollo 24/7 doctor listing page using **Next.js (frontend)** and **Express + MongoDB (backend)**.  
It supports filtering doctors by **consultation mode**, **experience**, **fees**, **language**, and **facility**, with pagination and REST API integration.

[Frontend live link](https://apollo-mocha-delta.vercel.app/)

[Frontend source code link](https://github.com/786mrnoor/apollo/)

[Backend live link](https://apollo-backend.vercel.app/api/list-doctors)

---

## ⚙️ Technologies Used

### Backend (Express.js + MongoDB)
- **Express.js REST API**
- **MongoDB with Mongoose**
- **Filtering, Range Search, Pagination**
- **Endpoints: `/add-doctor`, `/list-doctors`**

---

## 🚀 Getting Started

### 🔧 Prerequisites

- Node.js (v18+)
- MongoDB (local or Atlas)
- NPM or Yarn

---

### 🔐 Environment Variables

Create `.env` in `/backend`:

```env
MONGO_URI=mongodb://localhost:27017/doctors
```

### ▶️ Start Backend Server

```bash
npm run dev
```

### 📡 API Endpoints

#### POST `/api/add-doctor`

Add a new doctor

```json
{
  "name": "Dr. Rahul",
  "gender": "MALE",
  "specialization": "General Physician",
  "experience": 12,
  "qualification": "MBBS, MD",
  "location": "Delhi",
  "onlineConsultationFees": 750,
  "physicalConsultationFees": 750,
  "consultMode": "BOTH",
  "facilityType": "HOSPITAL",
  "languages": ["English", "Hindi"],
  "profileImage": "/images/doc.png",
  "rating": 100
}
```

#### GET `/api/list-doctors`

List doctors with filters and pagination

**Query Example:**

```
/api/list-doctors?page=1&limit=10
```

---
