# 🚀 IssueTracker - Modern Kanban Board

A high-performance Issue Tracking system inspired by Jira. Built with the MERN stack (MongoDB, Express, React, Node) and designed for seamless team collaboration.

🔗 **Live Application:** [https://issue-tracker-7q05nrhv8-hap4114s-projects.vercel.app](https://issue-tracker-7q05nrhv8-hap4114s-projects.vercel.app)  
🔗 **Backend API:** [https://issue-tracker-1gsl.onrender.com](https://issue-tracker-1gsl.onrender.com)

---

## 🎨 Key Features

- **Interactive Kanban Board** — Issues organized by status across 4 columns
- **Real-time Analytics** — Visualized reports and charts powered by Recharts
- **Dark Mode** — Premium dark/light mode toggle with CSS variables
- **Advanced Filtering** — Search by title/description, filter by project, priority, status, assignee
- **Issue Management** — Create, view, update status, and comment on issues
- **Reporting System** — Charts for issues by priority, project, and assignee workload
- **Responsive Design** — Works on desktop and mobile

---

## 🏗️ System Architecture

The project follows a modular **Layered Architecture** for scalability and maintainability.

### 1. Frontend (React.js + Vite)
- **Component-Based** — UI broken into reusable blocks (`IssueCard`, `IssueForm`, `Filters`, `Reports`, etc.)
- **Service Layer** — Dedicated API functions in `src/api/issues.js` for clean separation of logic
- **Theming** — CSS variable system for consistent styling across dark/light modes
- **State Management** — React `useState` and `useEffect` hooks for local state

### 2. Backend (Node.js + Express)
- **RESTful API** — Clean, structured endpoints for full CRUD operations
- **Server-side Validation** — All inputs validated before hitting the database
- **Middleware** — `cors` and `express.json` for secure request handling
- **Environment Management** — Secure configuration using `dotenv`

### 3. Database (MongoDB + Mongoose)
- **Embedded Comments** — Comments stored inside Issue documents for faster reads
- **Enum Validation** — Schema-level enforcement of valid values
- **Aggregation Pipeline** — Status counts computed server-side

---

## 🛠️ Technology Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend** | React 18, Vite, Recharts, Axios |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB Atlas, Mongoose |
| **Styling** | Vanilla CSS (Flexbox/Grid), CSS Variables |
| **Deployment** | Vercel (Frontend), Render (Backend), MongoDB Atlas (DB) |

---

## 📡 API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| GET | `/api/issues` | Get all issues (supports filters + search) |
| POST | `/api/issues` | Create a new issue |
| GET | `/api/issues/:id` | Get single issue by ID |
| PATCH | `/api/issues/:id/status` | Update issue status |
| POST | `/api/issues/:id/comments` | Add comment to issue |
| GET | `/health` | Health check |

---

## 🚀 Quick Setup (Local Development)

### Prerequisites
- Node.js (v18+)
- MongoDB Atlas Account or Local MongoDB

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
   ```
   Create a `.env` file:
   ```
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   ```
   ```bash
   npm run seed   # seed 15 sample issues
   npm run dev    # start backend on port 5000
   ```

3. **Frontend Setup:**
   ```bash
   cd ../frontend
   npm install
   npm run dev    # start frontend on port 5173
   ```

4. Visit `http://localhost:5173` in your browser.

---

## 📂 Folder Structure

```
issue-tracker/
├── backend/
│   ├── models/         # Mongoose schemas (Issue with embedded comments)
│   ├── routes/         # Express route definitions
│   ├── controllers/    # Business logic and DB queries
│   ├── seed.js         # Database seeder (15 sample issues)
│   └── server.js       # Entry point
├── frontend/
│   ├── src/
│   │   ├── api/        # Axios API service layer
│   │   ├── components/ # IssueCard, IssueForm, IssueDetail, Filters, Reports
│   │   ├── App.jsx     # Root component and state management
│   │   └── App.css     # Global design system with CSS variables
└── ARCHITECTURE.md     # Architecture decisions and tradeoffs
└── PROMPTS.md          # AI prompt engineering log
```

---

## 📝 License

Distributed under the MIT License.
