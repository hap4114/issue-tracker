# Project Architecture: Issue Tracker

## 🚀 Why This Stack? (MERN-ish)
The application is built using a modern, performant, and scalable stack designed for real-time interactivity.

- **Frontend: React.js with Vite**: We chose React for its component-based architecture, which is perfect for complex UIs like a Kanban board. Vite provides near-instant HMR (Hot Module Replacement) for a lightning-fast development experience.
- **Backend: Node.js & Express**: Provides a lightweight, high-performance REST API layer.
- **Database: MongoDB**: A document-oriented NoSQL database that offers the flexibility needed for evolving issue attributes (like adding dynamic custom fields or comments) without complex migrations.
- **State Management & DND**: 
  - `@hello-pangea/dnd`: A powerful, accessible library for the drag-and-drop Kanban experience.
  - `Recharts`: Used for the data visualization on the Reports page.

---

## 🏗️ Component Structure
The frontend is modular, separating layout, logic, and presentation.

```text
src/
├── api/             # API service layers (Axios instances)
│   ├── issues.js    # Issue CRUD and status updates
│   └── settings.js  # Project/Assignee management
├── components/      # Reusable UI Blocks
│   ├── Filters.jsx      # Global search and sort controls
│   ├── IssueCard.jsx    # Individual task card with priority indicators
│   ├── IssueForm.jsx    # Modal form for creating/editing
│   ├── IssueDetail.jsx  # Detailed view with comment section
│   ├── Reports.jsx      # Analytics dashboard (Charts)
│   └── Settings.jsx     # Admin panel for Projects/Assignees
├── App.jsx          # Main orchestrator (Layout + Tab Navigation)
└── App.css          # Design System (Theming, Dark Mode, Layout)
```

---

## 🗄️ Database Schema
We use three core models in MongoDB to enable dynamic project management.

### 1. Issue
- `title`: String (Required)
- `description`: String (Required)
- `project`: String (Linked to Project Name)
- `priority`: Enum ['Low', 'Medium', 'High', 'Critical']
- `assignee`: String (Linked to Assignee Name)
- `status`: Enum ['Open', 'In Progress', 'Resolved', 'Closed']
- `comments`: Array of `{ text, createdAt }`
- `timestamps`: createdAt, updatedAt

### 2. Project
- `name`: String (Unique)
- `code`: String (Unique, e.g., "APP")

### 3. Assignee
- `name`: String (Unique)

---

## 🔌 API Endpoints List

### Issues
- `GET /api/issues`: Fetch all issues (supports search, project, and priority filters).
- `POST /api/issues`: Create a new issue.
- `PATCH /api/issues/:id/status`: Update status (Optimistic UI update for DND).
- `POST /api/issues/:id/comments`: Append a comment to an issue.

### Settings (Admin)
- `GET /api/settings/projects`: List all projects.
- `POST /api/settings/projects`: Register a new project.
- `DELETE /api/settings/projects/:id`: Remove a project.
- `GET /api/settings/assignees`: List all team members.
- `POST /api/settings/assignees`: Add a new team member.

---

## 🎨 Key Unique Features
1. **Dark Mode Architecture**: Implemented via CSS Variables (`--bg-main`, `--text-main`) toggled by a high-level `.dark-theme` class on the container.
2. **Priority Indicators**: Dual-visual system (Icon + Top-Right Color Dot) for immediate risk assessment on the board.
## 🛠️ Quick Setup
1. **Backend**: `cd backend && npm install && npm run dev`
2. **Frontend**: `cd frontend && npm install && npm run dev`
3. **Database**: Update the `.env` file in the backend with your `MONGO_URI`.
