# 🚀 IssueTracker - Modern Kanban Board

A high-performance, real-time Issue Tracking system inspired by Jira. Built with the MERN stack (MongoDB, Express, React, Node) and designed for seamless team collaboration.

🔗 **Live Application:** [https://issue-tracker-1gsl.onrender.com/](https://issue-tracker-1gsl.onrender.com/)

---

## 🎨 Key Features

- **Interactive Kanban Board**: Smooth drag-and-drop experience using `@hello-pangea/dnd`.
- **Real-time Analytics**: Visualized reports and charts powered by `Recharts`.
- **Dark Mode Architecture**: Premium dark/light mode toggle with CSS variables.
- **Dynamic Settings**: Manage projects, team members (assignees), and priorities on the fly.
- **Advanced Filtering**: Search by title, filter by project/assignee, and sort by priority or date.
- **Reporting System**: Export your entire issue backlog to CSV for external analysis.
- **Optimistic UI**: Instant status updates on the board with background server sync.

---

## 🏗️ System Architecture

The project follows a modular **Layered Architecture** to ensure scalability and maintainability.

### 1. Frontend (React.js + Vite)
- **Component-Based**: UI is broken into reusable blocks (`IssueCard`, `IssueForm`, `Filters`, etc.).
- **Service Layer**: Dedicated API hooks and functions in `src/api/` for clean separation of logic.
- **Theming**: A robust CSS variable system for consistent styling across modes.
- **State Management**: React `useState` and `useEffect` hooks for local state, with optimistic updates for DND.

### 2. Backend (Node.js + Express)
- **RESTful API**: Clean, structured endpoints for CRUD operations on issues, projects, and assignees.
- **Middleware**: Integrated `cors` and `express.json` for secure and efficient request handling.
- **Environment Management**: Secure configuration using `dotenv`.

### 3. Database (MongoDB + Mongoose)
- **Flexible Schema**: Non-relational structure allows for evolving issue attributes.
- **Relational Integrity**: Manual linking between `Issues`, `Projects`, and `Assignees`.

---

## 🛠️ Technology Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend** | React 18, Vite, @hello-pangea/dnd, Recharts, Axios |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB Atlas, Mongoose |
| **Styling** | Vanilla CSS (Modern Flexbox/Grid), CSS Variables |
| **Deployment** | Render (Frontend & Backend) |

---

## 🚀 Quick Setup (Local Development)

### Prerequisites
- Node.js (v18+)
- MongoDB Atlas Account / Local MongoDB

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/hap4114/issue-tracker.git
   cd issue-tracker
   ```

2. **Backend Setup:**
   ```bash
   cd backend
   npm install
   # Create a .env file with:
   # PORT=5000
   # MONGO_URI=your_mongodb_connection_string
   npm run dev
   ```

3. **Frontend Setup:**
   ```bash
   cd ../frontend
   npm install
   npm run dev
   ```

4. **Visit `http://localhost:5173` in your browser.**

---

## 📂 Folder Structure

```text
issue-tracker/
├── backend/
│   ├── models/        # Database Schemas (Issue, Project, Assignee)
│   ├── routes/        # API Endpoints
│   ├── controllers/   # Business Logic
│   └── server.js      # Entry Point
├── frontend/
│   ├── src/
│   │   ├── api/       # API calling services
│   │   ├── components/# UI Components
│   │   ├── App.jsx    # Core Orchestrator
│   │   └── App.css    # Global Design System
└── .gitignore         # Safety first!
```

---

## 📝 License
Distributed under the MIT License. See `LICENSE` for more information.
