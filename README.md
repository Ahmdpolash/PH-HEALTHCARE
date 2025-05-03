# PH HealthCare - Healthcare Management System

PH HealthCare is a modern, full-stack web application that streamlines communication and appointment scheduling between patients, doctors, and administrators. It supports real-time consultations, electronic prescription management, patient record storage, and secure payment processing.

## 🔧 Tech Stack

- **Backend**: Node.js, Express.js
- **Frontend**: Next.js (React Framework)
- **Database**: PostgreSQL (managed via Prisma ORM)
- **Real-Time Communication**: WebRTC (powered by Agora.io)
- **Authentication**: JWT & Secure Session Management
- **Payment Gateway**: Integrated (for appointments)

## 👥 User Roles and Features

### 🛠️ Admin
- Manage doctor accounts
- Create and update appointment slots
- Access all appointment and metadata records
- Manage doctor profiles

### 👨‍⚕️ Doctor
- Manage appointment slots and upcoming appointments
- Access patient medical history and test reports
- Generate and email prescriptions with additional notes

### 🧑‍⚕️ Patient
- Register/login with secure authentication
- Book appointments with doctors based on availability
- Upload diagnostic reports and manage medical history
- Access prescriptions via platform and email
- Make online payments for appointments
- Submit and manage doctor reviews

## ⚙️ Key Features

- 🔐 Secure Authentication and Authorization
- 📅 Real-Time Appointment Scheduling
- 💬 Video Consultation using WebRTC (Agora.io)
- 📄 Electronic Prescription Generation & Delivery
- 📧 Email Notifications for Appointments, Invoices, and Prescriptions
- 💳 Payment Integration for Consultations
- 📚 Patient Profile and Medical History Management
- ⭐ Rating and Review System for Doctors

## 🌐 Frontend Pages (SPA with SSR)
- **Landing Page**: Overview of PH HealthCare system
- **Doctor Profile Page**: Detailed doctor information and available slots

## 🚀 Getting Started

1. **Clone the repo**
   ```bash
   git clone  https://github.com/Ahmdpolash/PH-HEALTHCARE.git
   cd ph-healthcare
