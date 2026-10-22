# MediConnect – Digital Healthcare Platform

[![Live Demo](https://img.shields.io/badge/Live_Demo-Netlify-00C7B7?style=flat&logo=netlify)](https://digital-healthcare-platform.netlify.app/doctor)
[![GitHub Repository](https://img.shields.io/badge/GitHub-Repository-181717?style=flat&logo=github)](https://github.com/umaribiya2009-alt/MediConnect-Healthcare-Platform)

**MediConnect** is a modern, responsive digital healthcare platform designed to streamline the medical consultation and diagnostic journey for both patients and healthcare providers. It provides an intuitive workflow from test selection and doctor scheduling to mock payments, visual healthcare progress tracking, and online report reviews.

---

## 🌐 Live Application & Links

- **Live Website**: [https://digital-healthcare-platform.netlify.app/doctor](https://digital-healthcare-platform.netlify.app/doctor)
- **GitHub Repository**: [https://github.com/umaribiya2009-alt/MediConnect-Healthcare-Platform](https://github.com/umaribiya2009-alt/MediConnect-Healthcare-Platform)

---

## 🚀 Key Features

### 👤 Patient Experience
- **Interactive Authentication**: Role-based login for patients and doctors.
- **Diagnostic Test Booking**: Browse and filter medical tests (CBC, Lipid Profile, Blood Sugar, Thyroid Profile, etc.) with transparent pricing.
- **Doctor Selection**: Choose specialized doctors based on expertise, qualifications, fees, and slot availability.
- **Appointment Scheduling**: Real-time slot selection and instant booking summary.
- **Mock Payment Flow**: Seamless digital payment simulation with instant booking confirmation.
- **Healthcare Journey Tracker**: Visual step-by-step progress tracking from booking to report generation.
- **Digital Medical Reports**: Access lab test results, normal reference ranges, and doctor remarks online.

### 🩺 Doctor Experience
- **Doctor Dashboard**: Real-time overview of scheduled appointments, patients, and report reviews.
- **Appointment Management**: View patient appointment rosters with diagnostic test associations.
- **Report Review System**: Inspect diagnostic test results and submit clinical remarks directly to the patient's record.
- **Weekly Schedule**: Overview of consultation availability across weekdays.

---

## 🛠️ Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React 18, Vite, React Router v6, Lucide React, Custom Responsive CSS |
| **Backend** | Node.js, Express.js, RESTful API |
| **Database** | MongoDB, Mongoose ODM |
| **Authentication** | JSON Web Tokens (JWT), Bcrypt password hashing |
| **Hosting & Deployment** | Netlify (Frontend with SPA redirect routing), Render / Railway / Local (Backend) |

---

## 📁 Project Structure

```
MediConnect-Healthcare-Platform/
├── .env.example                 # Root environment variables template
├── .gitignore                   # Git exclusion rules (secrets, dependencies, build output)
├── netlify.toml                 # Netlify deployment and SPA redirect configuration
├── README.md                    # Project documentation
│
├── backend/                     # Node.js + Express + MongoDB API
│   ├── .env.example             # Backend environment template
│   ├── package.json             # Backend dependencies and scripts
│   └── src/
│       ├── middleware/
│       │   └── auth.js          # JWT authentication and role-based access control
│       ├── models/
│       │   ├── Appointment.js   # Appointment schema & model
│       │   ├── Report.js        # Diagnostic report schema
│       │   ├── Test.js          # Diagnostic test catalog schema
│       │   └── User.js          # Patient & Doctor user schema
│       ├── routes/
│       │   ├── auth.js          # User registration & login routes
│       │   └── data.js          # Appointments, tests, doctors, reports & dashboard routes
│       ├── seed.js              # Database seeder with sample data
│       └── server.js            # Express server entry point
│
└── frontend/                    # React.js SPA (Vite)
    ├── .env.example             # Frontend environment template
    ├── index.html               # SPA HTML entry point
    ├── netlify.toml             # Frontend-level Netlify configuration
    ├── package.json             # Frontend dependencies and scripts
    ├── vite.config.js           # Vite configuration
    ├── public/
    │   └── _redirects           # Netlify SPA redirect rules
    └── src/
        ├── api.js               # Centralized API fetch client with JWT authorization
        ├── App.jsx              # Main application router and core page components
        ├── main.jsx             # React DOM entry point
        ├── styles.css           # Modern clinical design system stylesheet
        ├── components/
        │   ├── Journey.jsx      # Visual patient healthcare journey tracker
        │   ├── Layout.jsx       # Application layout shell with sidebar
        │   └── Sidebar.jsx      # Dynamic navigation sidebar (Doctor / Patient)
        └── context/
            └── AuthContext.jsx  # Authentication state provider
```

---

## ⚙️ Getting Started (Local Development)

### Prerequisites
- **Node.js**: v18.0.0 or later
- **npm**: v9.0.0 or later
- **MongoDB**: Local MongoDB instance running on `localhost:27017` or a MongoDB Atlas connection string.

---

### 1. Backend Setup

1. Open a terminal and navigate to the `backend` directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   ```bash
   # On Windows (PowerShell)
   Copy-Item .env.example .env

   # On Linux/macOS
   cp .env.example .env
   ```
   *Edit `.env` to configure your `MONGO_URI` and `JWT_SECRET`.*

4. Seed the database with initial demo data:
   ```bash
   npm run seed
   ```

5. Start the backend development server:
   ```bash
   npm run dev
   ```
   The backend API will run on **`http://localhost:5000`**.

---

### 2. Frontend Setup

1. Open a new terminal and navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   ```bash
   # On Windows (PowerShell)
   Copy-Item .env.example .env

   # On Linux/macOS
   cp .env.example .env
   ```

4. Start the Vite development server:
   ```bash
   npm run dev
   ```
   Open your browser at **`http://localhost:5173`**.

---

## 🔑 Demo Credentials

After running `npm run seed`, you can sign in using either of the following demo accounts:

### 👤 Patient Account
- **Email:** `anika.kapoor@example.com`
- **Password:** `password123`
- **Dashboard:** `/patient`

### 🩺 Doctor Account
- **Email:** `priya.sharma@mediconnect.com`
- **Password:** `password123`
- **Dashboard:** `/doctor`

---

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` — Register a new patient account.
- `POST /api/auth/login` — Authenticate patient or doctor and receive JWT token.

### Clinical & Scheduling
- `GET /api/tests` — Retrieve catalog of diagnostic tests.
- `GET /api/doctors` — List available doctors and consultation details.
- `GET /api/appointments` — Fetch appointments for the authenticated user.
- `POST /api/appointments` — Schedule a new appointment (Patient role).
- `POST /api/appointments/:id/pay` — Complete mock payment and confirm booking.
- `GET /api/reports` — Retrieve diagnostic reports.
- `PATCH /api/reports/:id/review` — Add doctor remarks and mark report as reviewed (Doctor role).
- `GET /api/dashboard` — Aggregated dashboard statistics and upcoming tasks.

---

## 🚀 Netlify Deployment Instructions

1. Link the repository to Netlify:
   - **Base directory:** `frontend`
   - **Build command:** `npm run build`
   - **Publish directory:** `frontend/dist`
2. Set the environment variable in Netlify:
   - `VITE_API_BASE_URL`: URL of your deployed backend (e.g. `https://your-backend-api.onrender.com/api`).
3. SPA routing is automatically handled via `netlify.toml` and `frontend/public/_redirects`.

---

## 🔒 Security Best Practices

- Real credentials and secrets are excluded from Git using `.gitignore`.
- Password hashes use `bcryptjs` with salt rounds.
- Authorization is strictly enforced using JWT headers on all protected endpoints.

---

## 📄 License

This project is licensed under the MIT License.
