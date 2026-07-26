# 🎓 Production-Ready Student Management System (SMS)

A modern, enterprise-grade **Student Management System (SMS)** built for schools, K-12 institutions, colleges, and universities. Featuring dynamic **Role-Based Access Control (RBAC)** across 10 distinct user roles, multi-tenant portal contexts, interactive analytics dashboards, automated GPA calculation, printable report cards, fee invoicing, and normalized database architecture.

---

## 🚀 Tech Stack

### **Frontend**
- **Framework:** Next.js 14+ (App Router) & React 18
- **Language:** TypeScript
- **Styling:** Tailwind CSS & Glassmorphism design system
- **Icons:** Lucide Icons (`lucide-react`)
- **Animations:** Framer Motion
- **Analytics Charts:** Recharts

### **Backend**
- **Runtime & Framework:** Node.js & Express.js
- **Language:** TypeScript
- **ORM:** Prisma ORM
- **Database:** PostgreSQL
- **Security & Auth:** JWT Access & Refresh Tokens, bcryptjs, Helmet, Rate Limiting, Audit Logs
- **Logging:** Winston & Morgan

### **DevOps & Containerization**
- Docker & Docker Compose
- Multi-stage production container builds

---

## 👥 10 User Roles & Pre-seeded Login Credentials

Default seed password for all demo accounts: **`password123`**

| Role | Username / Email | Access Context |
| :--- | :--- | :--- |
| **Super Admin** | `superadmin@sms.edu` | Full institutional control, audit logs, system rules |
| **School Admin** | `admin@sms.edu` | Admissions, faculty management, school settings |
| **Principal** | `principal@sms.edu` | Academic oversight, teacher reviews, high-level metrics |
| **Vice Principal** | `viceprincipal@sms.edu` | Daily schedules, discipline, attendance monitoring |
| **Accountant** | `accountant@sms.edu` | Fee structures, invoicing, payment receipts |
| **Teacher** | `teacher@sms.edu` | Mark class attendance, homework, exam marks entry |
| **Librarian** | `librarian@sms.edu` | Book cataloging, issue logs, library fines |
| **Receptionist** | `receptionist@sms.edu` | Front desk inquiries, candidate admissions |
| **Student** | `student@sms.edu` | View grades, attendance logs, homework, report cards |
| **Parent** | `parent@sms.edu` | Children performance tracker, fee dues, notices |

---

## 📁 Repository Structure

```
student-management-system/
├── backend/
│   ├── prisma/
│   │   ├── schema.prisma     # Production PostgreSQL Schema (18+ models)
│   │   └── seed.ts           # Rich Seed Script for 10 User Roles
│   ├── src/
│   │   ├── controllers/      # Auth, Student, Teacher, Attendance, Exam, Fee, Notice, Settings
│   │   ├── middlewares/      # JWT Authentication & RBAC Authorization
│   │   ├── routes/           # Central Express API Routes (/api/v1)
│   │   └── index.ts          # Express Server Entrypoint
│   ├── Dockerfile
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── app/              # Next.js App Router Pages (Dashboard, Students, Teachers, etc.)
│   │   ├── components/       # UI Library (Sidebar, Navbar, Cards, Modals, Charts)
│   │   ├── context/          # AuthContext & Role Switcher
│   │   └── lib/              # API Client & Mock Fallback Engine
│   ├── Dockerfile
│   └── package.json
├── docker-compose.yml        # Orchestrated PostgreSQL + Backend + Frontend
└── README.md
```

---

## ⚙️ Quick Start & Local Installation

### 1. Backend Setup
```bash
cd backend
npm install

# Configure Database URL in .env
# DATABASE_URL="postgresql://postgres:postgres@localhost:5432/sms_db?schema=public"

# Run Prisma Migrations & Seed Sample Data
npx prisma db push
npx prisma db seed

# Start Development API Server
npm run dev
```
*API will run on `http://localhost:5000/api/v1`*

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
*Frontend web application will run on `http://localhost:3000`*

---

## 🐳 Docker Deployment

To launch the full production stack (PostgreSQL + Express Backend + Next.js Frontend) in one command:

```bash
docker-compose up --build -d
```

---

## 🔑 Key Features Overview

1. **Role-Based Access Control (RBAC):** Real-time role context switcher in top navbar allowing instant testing across all 10 roles.
2. **Student Admission & Profile 360:** Multi-step admission wizard, roll number auto-generation, tabbed student profile view (Personal, Medical, Attendance, Marks, Fees).
3. **Daily Attendance Grid:** Fast student attendance register with status toggles (`Present`, `Absent`, `Late`, `Leave`).
4. **Exams & Automated Report Cards:** Marks entry modal, automatic GPA computation, printable report card view.
5. **Fee & Invoice Management:** Due fee tracking, cash payment collection, printable payment receipts.
6. **Notice Board Circulars:** Target-role broadcast feed with priority alerts.
7. **Institutional Analytics & Reports:** CSV & PDF report exporter for school administration.
