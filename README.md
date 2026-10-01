# POOSD Small Project - Contact Manager

A full-stack web application for user authentication and contact management built using the **LAMP** (Linux, Apache, MySQL, PHP) architecture.

---

##  Tech Stack
* **Frontend:** HTML5, CSS3, JavaScript (Fetch API)
* **Backend:** PHP (RESTful API endpoints)
* **Database:** MySQL
* **Version Control:** Git / GitHub

---

##  Key Features & Endpoints

### 1. User Authentication
* **Registration:** `users.php` - Secure account creation and user validation.
* **Sign-In:** `login.php` - Credential verification and session tracking.
* **Session Management:** Client-side routing, sign-out functionality, and automatic redirects for unauthenticated users.

### 2. Contact Management (CRUD)
* **Create:** `POST` handler to add contacts with client/server validation.
* **Read/Search:** `GET` handler supporting real-time contact filtering.
* **Update:** `PUT` handler supporting inline contact editing.
* **Delete:** `DELETE` handler with user confirmation prompts.

### 3. System & Security Highlights
* CORS configuration for secure cross-origin requests.
* Input sanitization (`cslashes`) and structured JSON response handling (`sendJson`).
* Optimized MySQL schema with unique user constraints and automatic timestamps.

---

##  Directory Structure

```text
POOSD_small_project/
├── api/                  # PHP REST API backend endpoints (login, users, contacts)
├── database/             # SQL schema files and test data migrations
├── index.html            # Main application / sign-in interface
├── register.html         # User registration interface
├── styles.css            # Application styles
└── .gitignore            # Git untracked file rules
```

---

