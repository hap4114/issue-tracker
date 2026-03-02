# PROMPTS.md — AI Prompt Engineering Log

> **Tool:** Claude (claude.ai — Sonnet)  
> **Assessment:** Unico Connect — AI Full Stack Developer Intern  
> **Date:** March 3, 2026  
> **Approach:** I used AI as a pair programmer — not to generate blindly, but to move fast on boilerplate while I focused on architecture decisions, debugging, and understanding every line of output.

---

## Prompt Engineering Philosophy

Before writing any prompt, I asked myself three questions:
1. **What exactly do I need?** — Be specific, not vague
2. **What constraints matter?** — Stack, time, style, structure
3. **What would a bad output look like?** — So I could catch it

I deliberately avoided dumping the entire brief into AI. Instead I decomposed the problem myself first, then prompted for specific pieces.

---

## Prompt 1 — Architecture Design

**Goal:** Get a clean, opinionated architecture before writing any code.

**Prompt:**
```
I have 3 hours to build an internal issue tracker.
Stack: Express + MongoDB + React.
Constraints: No auth, no microservices, no overengineering.
Give me:
- Folder structure (backend only)
- MongoDB schema for Issue with embedded comments
- Minimal REST API endpoints (5 max)
- Build order by minute
```

**Output summary:** Received folder structure, Issue schema with enums, 5 API endpoints, and a 30-minute build plan.

**What I verified:** Schema enums matched the brief exactly (4 projects, 5 assignees, 4 statuses). Build order was logical — model before routes before seed.

**My decision:** Kept embedded comments (no separate collection) — faster to build, simpler to query. Noted this as a conscious tradeoff.

---

## Prompt 2 — Backend Code Generation

**Goal:** Generate all backend files in one pass to avoid context switching.

**Prompt:**
```
Generate these backend files for the issue tracker:
1. server.js — Express + Mongoose + CORS + dotenv
2. models/Issue.js — schema from above, timestamps: true
3. controllers/issueController.js — getIssues (with filter + search + aggregate counts),
   getIssue, createIssue, updateStatus, addComment
4. routes/issueRoutes.js — clean RESTful routes
5. seed.js — 15 realistic issues spread across Alpha/Beta/Gamma/Delta,
   all statuses and priorities represented
6. package.json with nodemon devDependency

Rules:
- Server-side validation on all endpoints
- Correct HTTP status codes (201, 400, 404, 500)
- Never trust client input
```

**Output summary:** Complete backend — all 6 files with validation, error handling, and aggregation pipeline for status counts.

**Bugs I caught and fixed:**
- `findByIdAndUpdate` skips validators by default — verified `runValidators: true` was included ✅
- Seed script needed `process.exit(0)` or it hangs — was included ✅
- Confirmed `.sort({ createdAt: -1 })` returns newest first ✅

---

## Prompt 3 — Code Understanding (Self-Review)

**Goal:** Make sure I could explain every line in the interview.

**Prompt:**
```
Explain server.js line by line — what each middleware does and why
the server starts inside .then() instead of outside mongoose.connect()
```

**Output summary:** Explained middleware chain, why CORS is needed for cross-origin requests, and why DB must connect before the server accepts traffic.

**Why I did this:** The brief explicitly said "you will be asked to explain your code." I used AI as a tutor, not just a generator.

---

## Prompt 4 — Frontend Architecture

**Goal:** Get a complete React frontend matching the Jira-style layout I had in mind.

**Prompt:**
```
Build a React frontend for the issue tracker with:
- Jira-inspired layout: icon rail sidebar + project sidebar + main content
- Kanban board view (4 columns by status)
- Filters: search input + 4 dropdowns (project, priority, status, assignee)
- Issue creation modal with form validation (client-side)
- Issue detail modal: full info + status dropdown + comments with timestamp
- Dark mode toggle
- All API calls in src/api/issues.js using axios
- Single App.css with CSS variables for theming
- No TypeScript, no external UI libraries except recharts
```

**Output summary:** Complete React app — 6 component files, API layer, and full CSS with dark theme variables.

**Bugs I caught and fixed:**
- `main.jsx` was importing `index.css` instead of `App.css` — blank screen, fixed import ✅
- CSS variables `--bg-card`, `--text-main` etc. were missing from `:root` — added them ✅
- `localStorage` usage in useEffect for dark mode persistence — verified it worked correctly ✅

---

## Prompt 5 — Debugging: PowerShell curl

**Goal:** Fix API testing issue on Windows.

**Prompt:**
```
Getting this PowerShell error testing my API:
"Cannot bind parameter 'Headers'. Cannot convert Content-Type value to IDictionary"

Command: curl -X POST http://localhost:5000/api/issues -H "Content-Type: application/json" -d "{...}"
```

**Output summary:** Identified PowerShell `curl` is actually `Invoke-WebRequest`. Provided `Invoke-RestMethod` syntax alternative.

**My decision:** Switched to Postman for all API testing — faster and more reliable than fighting PowerShell syntax.

---

## Prompt 6 — Reports / Charts Component

**Goal:** Add bonus feature — charts for extra credit.

**Prompt:**
```
Add a Reports.jsx component using recharts with:
1. Pie chart — issues by priority
2. Bar chart — issues by project
3. Horizontal bar chart — issues by assignee (workload view)
4. Recent issues list grouped by project

Props: issues[] (passed from App.jsx)
Use CSS variables for chart colors to support dark mode.
```

**Output summary:** Complete Reports.jsx with 3 charts and grouped issue list using useMemo for performance.

**Bugs I caught:**
- CSS variables like `--jira-blue` didn't exist in App.css — added them to `:root` ✅
- Kanban layout classes missing from original CSS — regenerated complete App.css ✅

---

## Prompt 7 — MongoDB Atlas Setup

**Goal:** Switch from local MongoDB to cloud for deployment.

**Prompt:**
```
Step by step: set up MongoDB Atlas free tier for a Node.js app.
I need: cluster creation, database user, IP whitelist,
connection string format for mongoose.connect()


