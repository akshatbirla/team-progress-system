# 🚀 Team Progress System

A **full-stack task management & team progress tracking application** built with **React, Node.js, Express, MongoDB (Atlas)** and **JWT authentication**.

This project helps teams **assign tasks, track progress, manage priorities, deadlines**, and visualize work using **List & Kanban views**.

---

## 🧠 Why This Project?

- Built for **team collaboration**
- Showcases **MongoDB** clearly (perfect for MongoDB-focused hackathons)
- Clean **authentication flow**
- Real-world **CRUD + state management**
- Modern UI with **Tailwind CSS**

---

## 🛠️ Tech Stack

### Frontend
- ⚛️ React
- 🌈 Tailwind CSS
- 🔀 React Router DOM
- 🔐 JWT (stored in localStorage)

### Backend
- 🟢 Node.js
- 🚀 Express.js
- 🗄️ MongoDB Atlas
- 🔑 JSON Web Tokens (JWT)
- 🔒 bcrypt.js (password hashing)

---

## 📦 Features

### 🔐 Authentication
- User Registration
- User Login
- JWT-based protected routes
- Secure password hashing

### 📋 Task Management
- Create tasks
- Assign tasks to users
- Set **status** (Todo / In Progress / Done)
- Set **priority** (Very High → Very Low)
- Set **start & end dates**
- Delete tasks with confirmation

### 📊 Dashboard
- List View
- Kanban View
- Filter by status & priority
- Overdue task detection
- Clickable status & priority badges

### 🎨 UI/UX
- Gradient-based modern UI
- Sidebar navigation
- Responsive layout
- Clear visual indicators

---

## 🧬 MongoDB Usage (IMPORTANT 🔥)

MongoDB is used for:

- **User collection**
  - name
  - email
  - hashed password

- **Task collection**
  - title
  - assignedTo
  - status
  - priority
  - startDate
  - endDate
  - timestamps

Hosted on **MongoDB Atlas (Cloud Database)**.

---

## 📁 Project Structure

