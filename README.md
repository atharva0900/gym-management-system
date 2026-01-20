  # 🏋️ Gym Management System

A full-stack Gym Management System with a **React frontend** and **Spring Boot backend**, designed for both **customers** and **admin users**.

---

## 🚀 Live Demo

🔗 **Frontend (Netlify):** [https://gymt3fitness.netlify.app/](https://gymt3fitness.netlify.app/)

> ⚠️ Note: The backend is hosted on Render and may take a few seconds to wake up if it has been inactive.

---

## 🛠️ Tech Stack

### Frontend

* React.js
* React Router
* Bootstrap & Bootstrap Icons
* Context API (Authentication state)
* Fetch API

### Backend

* Spring Boot
* Spring Data JPA
* MySQL
* REST APIs

### Deployment

* **Frontend:** Netlify
* **Backend:** Render
* **Database:** MySQL (cloud/local)

---

## ✨ Features

### 👤 Customer Side

* User Registration & Login
* View Membership Packages (with skeleton loading UI)
* View Trainers
* Join Membership (redirects to login if not authenticated)
* Static pages: About Us, Contact Us

### 🔐 Admin Side

* Admin Dashboard
* Add / Manage Packages
* Add / Manage Trainers
* Manage Members
* Manage Membership Status

---

## 📁 Project Structure (Frontend)

```
frontend/
├── src/
│   ├── adminComponents/
│   ├── userComponents/
│   ├── context/
│   ├── mainUrl.js
│   └── index.js
└── public/
```

## 📁 Project Structure (Backend)

```
backend/
├── models/
├── repositories/
├── services/
├── controllers/
└── responseWrapper/
```

---

## ⚙️ Environment Variables

Create a `.env` file in the frontend root:

```
REACT_APP_BASE_URL=https://final-gym-backend.onrender.com
```

---

## 🚀 Running Locally

### Frontend

```bash
cd frontend
npm install
npm start
```

### Backend

```bash
cd backend
mvn spring-boot:run
```

---

## 🐞 Known Limitation

* The backend may go to sleep on Render, causing a slow first request.

---

## 📌 Future Improvements

* Payment Gateway Integration
* Email Notifications
* User Profile Page
* Better Role-Based Access Control

---

## 👨‍💻 Author

Atharva Bhale
