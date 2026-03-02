import { useState, useEffect } from 'react';
import { getIssues, createIssue } from './api/issues';
import IssueForm from './components/IssueForm';
import IssueCard from './components/IssueCard';
import IssueDetail from './components/IssueDetail';
import Filters from './components/Filters';
import Reports from './components/Reports';
import Settings from './components/Settings';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { getProjects, getAssignees } from './api/settings';
import { updateStatus } from './api/issues';
import './App.css';

export default function App() {
    const [issues, setIssues] = useState([]);
    const [statusCounts, setStatusCounts] = useState({});
    const [selectedIssue, setSelectedIssue] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [filters, setFilters] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [activeTab, setActiveTab] = useState('board'); // 'board', 'reports', 'releases', 'settings'
    const [projects, setProjects] = useState([]);
    const [assignees, setAssignees] = useState([]);

    useEffect(() => {
        // Option to persist dark mode here
        const saved = localStorage.getItem('jira-dark-mode');
        if (saved) setIsDarkMode(saved === 'true');
    }, []);

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
        localStorage.setItem('jira-dark-mode', !isDarkMode);
    };

    const fetchIssues = async (params = {}) => {
        try {
            setLoading(true);
            setError(null);
            const res = await getIssues(params);
            setIssues(res.data.issues);
            setStatusCounts(res.data.statusCounts);
        } catch (err) {
            setError('Failed to load issues. Is the server running?');
        } finally {
            setLoading(false);
        }
    };

    const fetchConfig = async () => {
        try {
            const [pRes, aRes] = await Promise.all([getProjects(), getAssignees()]);
            setProjects(pRes.data);
            setAssignees(aRes.data);
        } catch (err) {
            console.error("Failed to load settings");
        }
    };

    useEffect(() => {
        fetchIssues(filters);
        fetchConfig();
    }, [filters]);

    const handleCreate = async (data) => {
        await createIssue(data);
        setShowForm(false);
        fetchIssues(filters);
    };

    const handleIssueUpdated = () => {
        fetchIssues(filters);
        setSelectedIssue(null);
    };

    const getSortedIssues = () => {
        let sorted = [...issues];
        const sortBy = filters.sortBy;

        if (sortBy === 'newest') {
            sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        } else if (sortBy === 'project') {
            sorted.sort((a, b) => a.project.localeCompare(b.project));
        } else if (sortBy === 'priority') {
            const priorityMap = { 'Critical': 0, 'High': 1, 'Medium': 2, 'Low': 3 };
            sorted.sort((a, b) => (priorityMap[a.priority] ?? 99) - (priorityMap[b.priority] ?? 99));
        }
        return sorted;
    };

    const handleDragEnd = async (result) => {
        const { destination, source, draggableId } = result;

        if (!destination) return;
        if (destination.droppableId === source.droppableId && destination.index === source.index) return;

        // Optimistic UI Update
        const newStatus = destination.droppableId;
        const updatedIssues = issues.map(issue =>
            issue._id === draggableId ? { ...issue, status: newStatus } : issue
        );
        setIssues(updatedIssues);

        try {
            await updateStatus(draggableId, newStatus);
            // Refresh counts/full list to be safe
            fetchIssues(filters);
        } catch (err) {
            alert("Failed to update status on server. Please refresh.");
            fetchIssues(filters);
        }
    };

    const exportToCSV = () => {
        if (!issues || issues.length === 0) {
            alert("No issues to export!");
            return;
        }

        const headers = ["ID", "Title", "Project", "Priority", "Status", "Assignee", "Created At"];
        const rows = issues.map(issue => [
            issue._id,
            `"${issue.title.replace(/"/g, '""')}"`,
            issue.project,
            issue.priority,
            issue.status,
            issue.assignee,
            new Date(issue.createdAt).toLocaleDateString()
        ]);

        const csvContent = [headers, ...rows].map(row => row.join(",")).join("\n");
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute("download", `jira_issues_${new Date().toISOString().split('T')[0]}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const STATUSES = ['Open', 'In Progress', 'Resolved', 'Closed'];

    return (
        <div className={`jira-layout ${isDarkMode ? 'dark-theme' : ''}`}>
            <aside className="global-sidebar">
                <div className="global-logo">🚀</div>
                <div className="global-nav">
                    <div
                        className={`nav-icon ${activeTab === 'reports' ? 'active' : ''}`}
                        onClick={() => setActiveTab('reports')}
                        title="Reports"
                    >📊</div>
                    <div
                        className="nav-icon"
                        onClick={() => setShowForm(true)}
                        title="Create Issue"
                    >➕</div>
                </div>
                <div className="global-footer">
                    <button className="nav-icon" onClick={toggleDarkMode} title="Toggle dark mode">
                        {isDarkMode ? '☀️' : '🌙'}
                    </button>
                </div>
            </aside>

            <aside className="project-sidebar">
                <div className="project-header">
                    <div className="project-icon">IT</div>
                    <div className="project-info">
                        <h2>IssueTracker</h2>
                        <span>Software project</span>
                    </div>
                </div>
                <nav className="project-nav">
                    <a href="#" className={`nav-item ${activeTab === 'board' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); setActiveTab('board'); }}>📋 Board</a>
                    <a href="#" className={`nav-item ${activeTab === 'reports' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); setActiveTab('reports'); }}>📈 Reports</a>
                    <a href="#" className={`nav-item ${activeTab === 'releases' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); setActiveTab('releases'); }}>🚀 Releases</a>
                    <a href="#" className={`nav-item ${activeTab === 'settings' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); setActiveTab('settings'); }}>⚙️ Settings</a>
                </nav>
            </aside>

            <main className="main-content">
                <header className="top-header">
                    <div className="breadcrumbs">Projects / IssueTracker / {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</div>
                    <div className="header-actions">
                        <h1>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h1>
                        {activeTab === 'board' && <button className="btn-jira-primary" onClick={() => setShowForm(true)}>Create Issue</button>}
                    </div>
                </header>

                {activeTab === 'board' && (
                    <>
                        <div className="filters-section">
                            <Filters
                                filters={filters}
                                setFilters={setFilters}
                                projects={projects.map(p => p.name)}
                                assignees={assignees.map(a => a.name)}
                            />
                        </div>
                        {loading && <div className="state-msg">Loading issues...</div>}
                        {error && <div className="state-msg error">{error}</div>}
                        {!loading && !error && (
                            <DragDropContext onDragEnd={handleDragEnd}>
                                <div className="kanban-board">
                                    {STATUSES.map(status => (
                                        <Droppable key={status} droppableId={status}>
                                            {(provided) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.droppableProps}
                                                    className="kanban-column"
                                                >
                                                    <div className="column-header">
                                                        <span className="column-name">{status.toUpperCase()}</span>
                                                        <span className="column-count">{getSortedIssues().filter(i => i.status === status).length}</span>
                                                    </div>
                                                    <div className="column-content">
                                                        {getSortedIssues().filter(i => i.status === status).map((issue, index) => (
                                                            <Draggable key={issue._id} draggableId={issue._id} index={index}>
                                                                {(provided) => (
                                                                    <div
                                                                        ref={provided.innerRef}
                                                                        {...provided.draggableProps}
                                                                        {...provided.dragHandleProps}
                                                                    >
                                                                        <IssueCard issue={issue} onClick={() => setSelectedIssue(issue)} />
                                                                    </div>
                                                                )}
                                                            </Draggable>
                                                        ))}
                                                        {provided.placeholder}
                                                    </div>
                                                </div>
                                            )}
                                        </Droppable>
                                    ))}
                                </div>
                            </DragDropContext>
                        )}
                    </>
                )}

                {activeTab === 'reports' && <Reports issues={issues} />}

                {activeTab === 'settings' && <Settings onUpdate={fetchConfig} />}

                {activeTab === 'releases' && (
                    <div style={{ padding: '0 32px 32px' }}>
                        <div className="chart-wrapper" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px', padding: '48px' }}>
                            <div style={{ fontSize: '64px' }}>📁</div>
                            <div style={{ textAlign: 'center' }}>
                                <h2 style={{ color: 'var(--text-main)', marginBottom: '8px' }}>Export Issue Data</h2>
                                <p style={{ color: 'var(--text-subtle)' }}>Download all your project issues in a clean CSV format for external analysis</p>
                            </div>
                            <div style={{ background: 'var(--bg-main)', padding: '24px', borderRadius: '4px', border: '1px dashed var(--border-color)', width: '100%', maxWidth: '500px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '12px', color: 'var(--text-subtle)' }}>
                                    <span>File Format:</span>
                                    <span style={{ color: 'var(--text-main)', fontWeight: 600 }}>CSV</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '12px', color: 'var(--text-subtle)' }}>
                                    <span>Total Issues:</span>
                                    <span style={{ color: 'var(--text-main)', fontWeight: 600 }}>{issues.length}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'var(--text-subtle)' }}>
                                    <span>Last Sync:</span>
                                    <span style={{ color: 'var(--text-main)', fontWeight: 600 }}>{new Date().toLocaleTimeString()}</span>
                                </div>
                            </div>
                            <button className="btn-jira-primary" style={{ padding: '12px 32px', fontSize: '16px' }} onClick={exportToCSV}>
                                Download CSV Report
                            </button>
                        </div>
                    </div>
                )}
            </main>

            {showForm && (
                <div className="modal-overlay" onClick={() => setShowForm(false)}>
                    <div className="modal" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>Create Issue</h2>
                            <button className="close-btn" onClick={() => setShowForm(false)}>✕</button>
                        </div>
                        <IssueForm
                            onSubmit={handleCreate}
                            onCancel={() => setShowForm(false)}
                            projects={projects.map(p => p.name)}
                            assignees={assignees.map(a => a.name)}
                        />
                    </div>
                </div>
            )}

            {selectedIssue && (
                <div className="modal-overlay" onClick={() => setSelectedIssue(null)}>
                    <div className="modal modal-large" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>{selectedIssue.title}</h2>
                            <button className="close-btn" onClick={() => setSelectedIssue(null)}>✕</button>
                        </div>
                        <IssueDetail
                            issueId={selectedIssue._id}
                            onUpdated={handleIssueUpdated}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}