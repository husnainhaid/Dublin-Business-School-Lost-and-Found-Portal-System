# 🎓 Dublin Business School - Lost and Found Portal System

<div align="center">

![DBS Logo](Front%20End/assets/logo.png)

**A modern web-based application to help Dublin Business School students and staff report,  and recover lost items on campus.**

[![Flask](https://img.shields.io/badge/Flask-3.0.0-000000?style=flat&logo=flask&logoColor=white)](https://flask.palletsprojects.com/)
[![Python](https://img.shields.io/badge/Python-3.10+-3776AB?style=flat&logo=python&logoColor=white)](https://www.python.org/)
[![SQLite](https://img.shields.io/badge/SQLite-3-003B57?style=flat&logo=sqlite&logoColor=white)](https://www.sqlite.org/)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=flat&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

[Features](#-features) • [Demo](#-demo) • [Installation](#-installation) • [Usage](#-usage) • [API Documentation](#-api-documentation) • [Deployment](#-deployment)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Technology Stack](#-technology-stack)
- [Project Structure](#-project-structure)
- [Installation](#-installation)
- [Usage](#-usage)
- [API Documentation](#-api-documentation)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)
- [Contact](#-contact)

---

## 🌟 Overview

The **DBS Lost and Found Portal System** is a comprehensive web application designed to streamline the process of reporting and recovering lost items at Dublin Business School. The system provides an intuitive interface for students to report lost items and allows administrators to manage, track, and update item statuses efficiently.

### Why This System?

- **Centralized Management**: All lost items are tracked in one place
- **Automated Notifications**: Email alerts when items are claimed
- **User-Friendly Interface**: Clean, modern design for easy navigation
- **Efficient Tracking**: Real-time status updates (Unclaimed, Claimed, Returned)
- **Secure Admin Panel**: Protected dashboard for authorized personnel

---

## ✨ Features

### For Students

- 📝 **Report Lost Items**: Submit detailed reports with item descriptions, location, date, and category
- 📧 **Email Validation**: Ensures only valid `@mydbs.ie` email addresses can submit reports
- 🔔 **Automatic Notifications**: Receive email alerts when items are marked as claimed
- 🎨 **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- 🖼️ **Image Upload Support**: Attach images to help identify lost items

### For Administrators

- 🔐 **Secure Login**: Protected admin dashboard with authentication
- 📊 **Item Management**: View, update, and delete lost item records
- 🏷️ **Status Updates**: Change item status (Unclaimed → Claimed → Returned)
- 📧 **Email Integration**: Automatically notify students when items are claimed
- 🔍 **Filter & Search**: View all items or filter by claimed status
- 📈 **Dashboard Overview**: Comprehensive view of all reported items

---

## 🛠️ Technology Stack

### Backend

| Technology | Version | Purpose |
|------------|---------|---------|
| **Python** | 3.10+ | Core backend language |
| **Flask** | 3.0.0 | Web framework |
| **SQLite** | 3 | Database management |
| **Flask-CORS** | 4.0.0 | Cross-origin resource sharing |
| **Flask-SQLAlchemy** | 3.1.1 | ORM for database operations |
| **Werkzeug** | 3.0.1 | WSGI utilities and security |
| **python-dotenv** | 1.0.0 | Environment variable management |
| **Gunicorn** | 21.2.0 | Production WSGI server |

### Frontend

| Technology | Purpose |
|------------|---------|
| **HTML5** | Structure and semantics |
| **CSS3** | Styling and responsive design |
| **Vanilla JavaScript (ES6+)** | Client-side logic and API calls |
| **Fetch API** | Asynchronous HTTP requests |

### Email Service

- **SMTP Integration**: Gmail SMTP for automated email notifications
- **Environment Variables**: Secure credential management

---

## 📁 Project Structure

```
Dublin Business School Lost and found Portal System/
│
├── Back End/                      # Backend application
│   ├── app.py                     # Flask application initialization
│   ├── routes.py                  # API route definitions
│   ├── models.py                  # Database models and business logic
│   ├── database.py                # Database connection and setup
│   ├── emailServices.py           # Email notification service
│   ├── .env                       # Environment variables (not in git)
│   └── instance/
│       └── items.db               # SQLite database file
│
├── Front End/                     # Frontend application
│   ├── index.html                 # Homepage
│   ├── report.html                # Lost item report form
│   ├── adminlogin.html            # Admin login page
│   ├── admin.html                 # Admin dashboard
│   └── assets/
│       ├── css/
│       │   └── style.css          # Main stylesheet
│       ├── js/
│       │   ├── config.js          # API configuration
│       │   ├── apicall.js         # API call functions
│       │   ├── model.js           # Data models
│       │   ├── report.js          # Report form logic
│       │   ├── admin.js           # Admin dashboard logic
│       │   ├── admin-login.js     # Admin login logic
│       │   └── toast.js           # Toast notification system
│       └── logo.png               # DBS logo
│
├── requirements.txt               # Python dependencies
├── wsgi.py                        # WSGI entry point for deployment
├── Procfile                       # Heroku/Render deployment config
├── render.yaml                    # Render deployment configuration
└── README.md                      # This file
```

---

## 🚀 Installation

### Prerequisites

- **Python 3.10 or higher**
- **pip** (Python package manager)
- **Git** (for cloning the repository)
- **Gmail account** (for email notifications)

### Step-by-Step Setup

#### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/dbs-lost-found-portal.git
cd "Dublin Business School Lost and found Portal System"
```

#### 2. Set Up Virtual Environment

**Windows:**
```bash
python -m venv venv
venv\Scripts\activate
```

**macOS/Linux:**
```bash
python3 -m venv venv
source venv/bin/activate
```

#### 3. Install Dependencies

```bash
pip install -r requirements.txt
```

#### 4. Configure Environment Variables

Create a `.env` file in the `Back End` directory:

```bash
cd "Back End"
```

Create `.env` file with the following content:

```env
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
```

> **Note**: For Gmail, you need to generate an [App Password](https://support.google.com/accounts/answer/185833) instead of using your regular password.

#### 5. Initialize the Database

```bash
python -c "from database import create_tables; create_tables()"
```

#### 6. Run the Application

```bash
python app.py
```

The backend server will start at `http://localhost:5000`

#### 7. Access the Frontend

Open `Front End/index.html` in your web browser, or use a local server:

```bash
# Using Python's built-in server
cd "Front End"
python -m http.server 8000
```

Then visit `http://localhost:8000` in your browser.

---

## 💻 Usage

### For Students

1. **Navigate to the Portal**: Open the homepage
2. **Report a Lost Item**:
   - Click "Report Lost Item"
   - Fill in the form with:
     - Your name
     - Item name and description
     - Location where lost
     - Date lost
     - Category (Electronics, Documents, Clothing, etc.)
     - Your DBS email (`@mydbs.ie`)
     - Phone number
     - Optional: Upload an image
   - Submit the form
3. **Receive Confirmation**: Get a success notification
4. **Wait for Updates**: Receive email when item is claimed

### For Administrators

1. **Login**:
   - Navigate to Admin Login page
   - Enter credentials (default: check with system admin)
   - Access the admin dashboard

2. **Manage Items**:
   - **View All Items**: See complete list of reported items
   - **Filter Claimed Items**: View only claimed items
   - **Update Status**: Change item status (Unclaimed/Claimed/Returned)
   - **Delete Items**: Remove items from the system
   - **Email Notifications**: System automatically sends emails when status changes to "Claimed"

---

## 📡 API Documentation

### Base URL

```
http://localhost:5000
```

### Endpoints

#### 1. Admin Login

**POST** `/admin/login`

**Request Body:**
```json
{
  "username": "admin",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "Status": "Admin successfully logged in"
}
```

---

#### 2. Create Item (Report Lost Item)

**POST** `/items`

**Request Body:**
```json
{
  "student_name": "John Doe",
  "item_name": "Laptop",
  "description": "Black Dell laptop with stickers",
  "location": "Library 2nd Floor",
  "date_lost": "2025-12-14",
  "category": "Electronics",
  "student_email": "john.doe@mydbs.ie",
  "phone_number": "+353 123 456 789",
  "image": "base64_encoded_image_or_url"
}
```

**Response:**
```json
{
  "success": true,
  "item_id": 1,
  "Status": "Item reported successfully! Admin will review it soon."
}
```

**Error Response (Duplicate Email):**
```json
{
  "success": false,
  "message": "This email already exists. Item cannot be reported again."
}
```

---

#### 3. Get All Items

**GET** `/items`

**Response:**
```json
[
  {
    "item_id": 1,
    "student_name": "John Doe",
    "item_name": "Laptop",
    "description": "Black Dell laptop with stickers",
    "location": "Library 2nd Floor",
    "date_lost": "2025-12-14",
    "category": "Electronics",
    "student_email": "john.doe@mydbs.ie",
    "phone_number": "+353 123 456 789",
    "status": "UNCLAIMED",
    "image": "image_url"
  }
]
```

---

#### 4. Update Item Status

**PUT** `/items/<item_id>`

**Request Body:**
```json
{
  "status": "CLAIMED"
}
```

**Response:**
```json
{
  "success": true
}
```

> **Note**: When status is updated to "CLAIMED", an email is automatically sent to the student.

---

#### 5. Delete Item

**DELETE** `/items/<item_id>`

**Response:**
```json
{
  "success": true
}
```

---

#### 6. Get Claimed Items

**GET** `/ClaimedItems`

**Response:**
```json
[
  {
    "item_id": 1,
    "student_name": "John Doe",
    "item_name": "Laptop",
    "status": "CLAIMED",
    ...
  }
]
```

---



---

## 🔒 Security Considerations

- **Email Validation**: Only `@mydbs.ie` emails are accepted
- **Admin Authentication**: Protected admin routes
- **CORS Configuration**: Controlled cross-origin requests
- **Environment Variables**: Sensitive data stored securely
- **SQL Injection Protection**: Parameterized queries via SQLAlchemy
- **Input Validation**: Server-side validation for all inputs

---

## 🧪 Testing

### Manual Testing Checklist

- [ ] Student can submit lost item report
- [ ] Email validation works correctly
- [ ] Admin can login successfully
- [ ] Admin can view all items
- [ ] Admin can update item status
- [ ] Admin can delete items
- [ ] Email notifications are sent when status changes to "CLAIMED"
- [ ] Responsive design works on mobile devices

### Running Tests (if available)

```bash
cd "Back End"
pytest tests/
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/AmazingFeature`
3. **Commit your changes**: `git commit -m 'Add some AmazingFeature'`
4. **Push to the branch**: `git push origin feature/AmazingFeature`
5. **Open a Pull Request**

### Code Style

- **Python**: Follow PEP 8 guidelines
- **JavaScript**: Use ES6+ features, consistent indentation
- **HTML/CSS**: Semantic HTML, BEM naming convention

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 📞 Contact

### Project Maintainer

**Dublin Business School IT Department**

- 📧 Email: [security@dbs.ie](mailto:security@dbs.ie)
- 📞 Phone: +353 1 417 7500
- 🏢 Address: Ground Floor, Main Building, Dublin Business School

### Campus Security Office

- **Hours**: Monday - Friday: 8:00 AM - 8:00 PM
- **Saturday**: 9:00 AM - 5:00 PM

---

## 🙏 Acknowledgments & References

This project was developed with assistance from various open-source templates, AI tools, and official documentation. Below is a comprehensive list of all resources that contributed to this project.

---

### 📚 GitHub Templates & Repositories

#### Primary References

| Repository | Author | Usage | Specific Files |
|------------|--------|-------|----------------|
| [lost-found-management](https://github.com/prince-c11/lost-found-management) | prince-c11 | Backend structure, API routes, database models, admin dashboard logic | `routes.py`, `models.py`, `apicall.js`, `admin.js` |
| [el5-fp](https://github.com/MarkRaffy28/el5-fp) | MarkRaffy28 | Database connection and setup patterns | `database.py` |
| [PicoModal](https://github.com/Nycto/PicoModal) | Nycto | Modal dialog logic and structure | `admin.js` (delete confirmation modal) |

#### Detailed Usage by File

**Backend (Python/Flask):**
- **`routes.py`**: API route structure and patterns from [prince-c11/lost-found-management/app.py](https://github.com/prince-c11/lost-found-management/blob/main/Lost-Found%20Management/app.py)
- **`models.py`**: Database model structure from [prince-c11/lost-found-management/models.py](https://github.com/prince-c11/lost-found-management/blob/main/Lost-Found%20Management/models.py)
- **`database.py`**: Database connection patterns from [MarkRaffy28/el5-fp/main.py](https://github.com/MarkRaffy28/el5-fp/blob/main/main.py)

**Frontend (JavaScript):**
- **`admin.js`**: 
  - Admin dashboard structure from [prince-c11/lost-found-management](https://github.com/prince-c11/lost-found-management)
  - Modal confirmation logic from [PicoModal](https://github.com/Nycto/PicoModal/blob/master/src/picoModal.js)
- **`apicall.js`**: API call patterns from [prince-c11/lost-found-management](https://github.com/prince-c11/lost-found-management)

---

### 🤖 AI Assistance

This project was developed with significant assistance from AI tools for code generation, debugging, and implementation:

#### ChatGPT (OpenAI)

**Conversation References:**
- Main development conversation: [ChatGPT Session](https://chatgpt.com/c/69305867-6b3c-8331-bed3-f1d795077f44)

**Specific Contributions:**

| Component | AI Contribution |
|-----------|-----------------|
| **Frontend HTML** | Complete HTML structure for `index.html`, `report.html`, `admin.html`, `adminlogin.html` |
| **Report Form** | Form validation, submission logic, and toast notifications in `report.js` |
| **Admin Dashboard** | Table rendering, row creation, and data display logic in `admin.js` |
| **Modal Dialogs** | Status update modal and delete confirmation modal implementation |
| **Toast Notifications** | Complete toast notification system in `toast.js` with CSS auto-loading |
| **Model Management** | Popup dialogs, alerts, and confirmations in `model.js` |
| **Backend Routes** | Email notification logic and route structure understanding |
| **Code Understanding** | Concept explanations and implementation guidance |

#### Claude Sonnet AI (Anthropic)

**Specific Contributions:**

| Component | AI Contribution |
|-----------|-----------------|
| **Claimed Items Filter** | `loadStatusItems()` function implementation based on backend API and database schema |
| **Button Active State** | `setActive()` function to handle button active state in admin dashboard |
| **Code Debugging** | Various debugging assistance throughout development |

#### GitHub Copilot (Microsoft)

**Specific Contributions:**

| Component | AI Contribution |
|-----------|-----------------|
| **Delete Modal** | Delete confirmation modal structure and sequence in `admin.js` |
| **Database Functions** | Auto-modified `update_item_status()` and `delete_item()` functions in `models.py` |

---

### 📖 Official Documentation

The following official documentation sources were referenced during development:

#### Python & Flask
- [Python Email Examples](https://docs.python.org/3/library/email.examples.html) - Email formatting and structure
- [Python SMTPLIB](https://docs.python.org/3/library/smtplib.html) - SMTP email sending
- [python-dotenv PyPI](https://pypi.org/project/python-dotenv/) - Environment variable management
- [Flask Documentation](https://flask.palletsprojects.com/) - Flask framework
- [Flask-CORS Documentation](https://flask-cors.readthedocs.io/) - CORS handling

#### Frontend & JavaScript
- [MDN Web Docs](https://developer.mozilla.org/) - JavaScript, HTML, CSS reference
- [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) - HTTP requests
- [R Documentation - renderTable](https://www.rdocumentation.org/packages/shiny/versions/0.8.0/topics/renderTable) - Table rendering concepts

---

### 🎨 Design & UI Inspiration

- **Modern Web Design Principles**: Clean, responsive layouts with glassmorphism effects
- **Color Schemes**: Curated HSL color palettes for professional appearance
- **Typography**: Google Fonts integration for modern typography

---

### 🏫 Institutional Support

- **Dublin Business School** - For supporting this project and providing the use case
- **DBS IT Department** - For project guidance and requirements
- **DBS Campus Security** - For operational insights and testing

---

### 👥 Development Team

**Project Developer:** Husnain  
**Institution:** Dublin Business School  
**Academic Year:** 2024-2025

---

### 📝 Code Attribution Summary

This project follows best practices for code attribution and acknowledgment:

1. **Template Code**: Adapted from open-source repositories with proper attribution
2. **AI-Generated Code**: Developed with assistance from ChatGPT, Claude Sonnet, and GitHub Copilot
3. **Original Implementation**: Custom business logic, database schema, and integration code
4. **Documentation References**: Official Python, Flask, and web development documentation

**Note:** All referenced code has been adapted, modified, and integrated to meet the specific requirements of the DBS Lost and Found Portal System. The final implementation represents a unique combination of these resources tailored to Dublin Business School's needs.

---

## 📊 Project Status

**Current Version**: 1.0.0  
**Status**: ✅ Production Ready  
**Last Updated**: December 2025

---

## 🗺️ Roadmap

### Future Enhancements

- [ ] Advanced search and filtering
- [ ] Image gallery for lost items
- [ ] SMS notifications
- [ ] Multi-language support
- [ ] Mobile app (iOS/Android)
- [ ] Analytics dashboard for admins
- [ ] Integration with campus security cameras
- [ ] QR code generation for items

---

<div align="center">

**Made with ❤️ for Dublin Business School**

[⬆ Back to Top](#-dublin-business-school---lost-and-found-portal-system)

</div>
