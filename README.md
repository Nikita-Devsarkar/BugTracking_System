# 🐞 Bug Tracking System

Bug Tracking System is a full-stack web application for reporting, assigning, managing, and tracking software bugs. It provides secure role-based access for Admin, Tester, and Developer users.

---

## 🚀 Features

### 🧪 Tester Module

* Secure Login
* JWT Authentication
* Report New Bugs
* Set Bug Priority
* Set Bug Category
* View Reported Bugs
* Track Bug Status

### 👨‍💼 Admin Module

* Secure Login
* Dashboard with Bug Statistics
* View All Bugs
* View Developers
* Assign Bugs to Developers
* Track Resolved and Closed Bugs
* Monitor Bug Status

### 👨‍💻 Developer Module

* Secure Login
* View Assigned Bugs
* Search Bugs
* Filter Bugs by Status and Priority
* Update Bug Status
* Track Open, In Progress and Resolved Bugs
* View Closed Bugs
* Closed bugs cannot be updated or reassigned

---

## 🛠️ Tech Stack

### Frontend

* React.js
* Vite
* Axios
* Tailwind CSS
* Lucide React
* JavaScript

### Backend

* Java
* Spring Boot
* Spring Security
* JWT Authentication
* Spring Data JPA
* Hibernate
* Maven

### Database

* MySQL

### Tools

* Spring Tools for Eclipse (STS)
* VS Code
* Postman
* Git & GitHub

---

## 📂 Project Structure

```text
BugTracking_System/
│
├── bug_tracker/
│   ├── controller/
│   ├── dto/
│   ├── entity/
│   ├── exception/
│   ├── model/
│   ├── repository/
│   ├── security/
│   ├── service/
│   └── application.properties
│
├── bug-tracker-frontend/
│   ├── components/
│   ├── pages/
│   ├── App.jsx
│   └── main.jsx
│
└── README.md
```

---
### 🔐 Authentication

* JWT Based Authentication
* Role-Based Authorization
* Admin Role
* Tester Role
* Developer Role
* Protected APIs

---

## 📊 Dashboards

### Admin Dashboard

* Total Bugs
* Open Bugs
* In Progress Bugs
* Resolved Bugs
* Closed Bugs
* Bug Assignment

### Developer Dashboard

* Assigned Bugs
* Open Bugs
* In Progress Bugs
* Resolved Bugs
* Closed Bugs

### Tester Dashboard

* Reported Bugs
* Bug Status Tracking
* Bug Information

---

## 🔄 Bug Workflow

```text
Tester
   │
   ▼
Report Bug
   │
   ▼
OPEN
   │
   ▼
IN_PROGRESS
   │
   ▼
RESOLVED
   │
   ▼
CLOSED
```

A closed bug cannot be updated or reassigned.

---

## 🗄️ Database

* Database: MySQL
* Database Name: `bugtracker_db`
* Port: `3306`

Create the database in MySQL:

```sql
CREATE DATABASE bugtracker_db;
```

Configure your MySQL username and password in:

```text
bug_tracker/src/main/resources/application.properties
```

Example:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/bugtracker_db
spring.datasource.username=YOUR_USERNAME
spring.datasource.password=YOUR_PASSWORD
```

---

## ⚙️ Installation

### 1. Clone Repository

```bash
git clone https://github.com/Nikita-Devsarkar/BugTracking_System.git
```

### 2. Backend Setup

Navigate to the backend folder:

```bash
cd bug_tracker
```

Install dependencies:

```bash
mvn clean install
```

Run the Spring Boot application:

```bash
mvn spring-boot:run
```

Backend runs on:

```text
http://localhost:8080
```

### 3. Frontend Setup

Open a new terminal and navigate to the frontend folder:

```bash
cd bug-tracker-frontend
```

Install dependencies:

```bash
npm install
```

Start the frontend:

```bash
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

---

## 🧪 Testing

* Login & JWT Authentication
* Role-Based Authorization
* Bug Reporting
* Bug Assignment
* Bug Status Updates
* Search & Filtering
* Closed Bug Restrictions
* Frontend-Backend API Integration

API testing was performed using **Postman**.

---

## 📸 Screenshots

Add screenshots of the main application pages:

* Login Page
<img width="1919" height="816" alt="image" src="https://github.com/user-attachments/assets/cbc4a7a6-9c4d-4e3d-8688-e214134ad321" />

* Admin Dashboard
<img width="950" height="406" alt="image" src="https://github.com/user-attachments/assets/65ab0424-5eb6-468f-a4e2-8b5536f0ab47" />

* Tester Dashboard
<img width="1903" height="826" alt="image" src="https://github.com/user-attachments/assets/13e79799-5f60-4f0d-8953-7f55362db241" />

* Report Bug
<img width="1913" height="789" alt="image" src="https://github.com/user-attachments/assets/0175915e-02ad-4b4f-8d69-e629324c2c5c" />
  
* Developer Dashboard
<img width="1916" height="812" alt="image" src="https://github.com/user-attachments/assets/a10697cb-7cad-4b36-98c8-915485c02ead" />


* Assigned Bugs
<img width="1919" height="831" alt="image" src="https://github.com/user-attachments/assets/90196d3b-14ca-42f8-b3c6-c65842bd9291" />
---

## 🔮 Future Enhancements

* Email Notifications
* File/Image Upload
* Bug History & Activity Logs
* Due-Date Reminders
* Analytics Dashboard
* Cloud Deployment

---

## 👤 Author

**Nikita Devsarkar**

If you found this project useful, consider giving it a ⭐ on GitHub.
