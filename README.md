# 🧠 MindMeter

**MindMeter** is an intelligent, full-stack online assessment platform designed to evaluate and benchmark users' skills through dynamic quizzes and secure user authentication. Built with Django and React, it enables administrators to create quizzes, track results, and monitor performance while users engage in a seamless testing experience.

## 📑 Table of Contents
1. [Features](#features)
2. [Tech Stack](#tech-stack)
3. [Project Structure](#project-structure)
4. [Installation Guide](#installation-guide)
5. [Running the Project](#running-the-project)
6. [API Overview](#api-overview)
7. [Folder Breakdown](#folder-breakdown)
8. [Contributing](#contributing)
9. [License](#license)

## 🌟 Features
- JWT-based user authentication system (register/login/logout)
- Role-based access (Admin/User)
- Quiz creation, participation, and result tracking
- Secure backend powered by Django REST Framework
- Responsive frontend likely built with React
- Modular app architecture (accounts, quizzes, etc.)
- Unit tested backend functionality
- RESTful API communication
- Email as unique user identifier

## 🚀 Tech Stack
### Frontend
- React.js
- Axios (API calls)
- HTML5, CSS3
- Bootstrap or Tailwind CSS 

### Backend
- Python 3.10+
- Django 4.x
- Django REST Framework
- Simple JWT for authentication
- SQLite3 or PostgreSQL

### Tools & Utilities
- Postman for API testing
- Git & GitHub for version control
- VS Code for development
- Django Debug Toolbar 

## 📁 Project Structure 

MindMeter/
├── backend/
│ ├── accounts/
│ ├── backend/ 
│ ├── tests/
│ └── manage.py
├── frontend/
│ ├── public/
│ ├── src/
│ └── package.json
├── README.md
└── .gitignore



###  Prerequisites
Make sure you have the following installed:
- Python 3.10 or higher
- Node.js (v16 or higher)
- npm (Node Package Manager)
- Git

## ⚙️ Backend Setup (Django)
# Clone the repository
git clone https://github.com/yourusername/MindMeter.git
cd MindMeter/backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Apply migrations
python manage.py makemigrations
python manage.py migrate

# Create admin user
python manage.py createsuperuser

# Run development server
python manage.py runserver
The Django backend will be available at http://127.0.0.1:8000/
