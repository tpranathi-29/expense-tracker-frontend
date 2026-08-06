# 💰 Expense Tracker

A Full Stack Expense Tracker Web Application built using **Spring Boot**, **React**, **MySQL**, **Spring Security**, and **JWT Authentication**.

This application allows users to securely manage their daily expenses, upload receipts, generate PDF reports, and analyze monthly spending through an interactive dashboard.

---

# 🚀 Features

- ✅ User Registration
- ✅ User Login
- ✅ JWT Authentication
- ✅ Spring Security
- ✅ Add Expense
- ✅ Update Expense
- ✅ Delete Expense
- ✅ View All Expenses
- ✅ Search Expenses
- ✅ Filter Expenses by Category
- ✅ Monthly Expense Analytics
- ✅ Dashboard Summary
- ✅ Upload Expense Receipt
- ✅ Download PDF Expense Report
- ✅ Pagination
- ✅ REST APIs
- ✅ Swagger API Documentation
- ✅ Responsive React Frontend

---

# 🛠 Technology Stack

## Backend

- Java 17
- Spring Boot
- Spring Security
- Spring Data JPA
- JWT Authentication
- MySQL
- Maven
- Swagger OpenAPI

## Frontend

- React
- React Router DOM
- Axios
- Recharts
- HTML5
- CSS3
- Bootstrap

## Database

- MySQL

---

# 📂 Project Structure

```
ExpenseTracker
│
├── expense-tracker-backend
│   ├── config
│   ├── controller
│   ├── dto
│   ├── exception
│   ├── model
│   ├── repository
│   ├── security
│   ├── service
│   ├── resources
│   └── ExpenseTrackerApplication.java
│
└── expense-tracker-frontend
    ├── public
    ├── src
    ├── components
    ├── pages
    ├── services
    └── App.js
```

---

# ⚙ Backend Setup

### Clone Repository

```bash
git clone https://github.com/your-username/expense-tracker.git
```

### Go to Backend Folder

```bash
cd expense-tracker-backend
```

### Install Dependencies

```bash
mvn clean install
```

### Run Spring Boot

```bash
mvn spring-boot:run
```

Backend URL

```
http://localhost:8080
```

---

# ⚙ Frontend Setup

### Go to Frontend Folder

```bash
cd expense-tracker-frontend
```

### Install Dependencies

```bash
npm install
```

### Run React Application

```bash
npm start
```

Frontend URL

```
http://localhost:3000
```

---

# 🗄 Database Configuration

Create the database.

```sql
CREATE DATABASE expense_tracker;
```

Update the database details in:

```
application.properties
```

Example

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/expense_tracker
spring.datasource.username=root
spring.datasource.password=your_password
spring.jpa.hibernate.ddl-auto=update
```

---

# 🔐 Authentication

This project uses **JWT Authentication**.

Workflow

1. Register a new user.
2. Login using email and password.
3. Receive JWT Token.
4. Use the token for all protected APIs.

Example

```
Authorization: Bearer your_jwt_token
```

---

# 📚 API Documentation

Swagger UI

```
http://localhost:8080/swagger-ui/index.html
```

---

# 📊 Main Modules

- Authentication Module
- Expense Management Module
- Dashboard Module
- Search Module
- Category Filter Module
- Monthly Analytics Module
- Receipt Upload Module
- PDF Report Module

---

# 📈 Future Enhancements

- Budget Planning
- Expense Prediction using AI
- Email Notifications
- Export to Excel
- Multi-Currency Support
- Dark Mode
- Mobile Application

---

# 👨‍💻 Author

**Pranathi T**

Computer Science Engineering Student

Java Full Stack Developer

---

# ⭐ Support

If you like this project, please give it a ⭐ on GitHub.

---

# 📸 Screenshots

Add screenshots here after running the project.

- Login Page
- Register Page
- Dashboard
- Add Expense
- Expense List
- Charts
- Monthly Report
- Swagger API