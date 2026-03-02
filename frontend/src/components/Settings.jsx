import { useState, useEffect } from 'react';
import { getProjects, createProject, deleteProject, getAssignees, createAssignee, deleteAssignee } from '../api/settings';

export default function Settings() {
    const [projects, setProjects] = useState([]);
    const [assignees, setAssignees] = useState([]);
    const [newProject, setNewProject] = useState({ name: '', code: '' });
    const [newAssignee, setNewAssignee] = useState({ name: '' });
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            setLoading(true);
            const [pRes, aRes] = await Promise.all([getProjects(), getAssignees()]);
            setProjects(pRes.data);
            setAssignees(aRes.data);
        } catch (err) {
            console.error("Failed to fetch settings", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleAddProject = async (e) => {
        e.preventDefault();
        if (!newProject.name || !newProject.code) return;
        try {
            await createProject(newProject);
            setNewProject({ name: '', code: '' });
            fetchData();
        } catch (err) {
            alert("Failed to add project. Ensure name and code are unique.");
        }
    };

    const handleAddAssignee = async (e) => {
        e.preventDefault();
        if (!newAssignee.name) return;
        try {
            await createAssignee(newAssignee);
            setNewAssignee({ name: '' });
            fetchData();
        } catch (err) {
            alert("Failed to add assignee.");
        }
    };

    const handleDeleteProject = async (id) => {
        if (!window.confirm("Delete this project?")) return;
        try {
            await deleteProject(id);
            fetchData();
        } catch (err) {
            alert("Failed to delete project.");
        }
    };

    const handleDeleteAssignee = async (id) => {
        if (!window.confirm("Delete this assignee?")) return;
        try {
            await deleteAssignee(id);
            fetchData();
        } catch (err) {
            alert("Failed to delete assignee.");
        }
    };

    if (loading) return <div className="state-msg">Loading settings...</div>;

    return (
        <div className="reports-container" style={{ padding: '32px' }}>
            <div className="settings-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '32px' }}>

                {/* Projects Management */}
                <div className="chart-wrapper" style={{ padding: '24px' }}>
                    <h3 style={{ marginBottom: '20px', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px' }}>Project Management</h3>

                    <form onSubmit={handleAddProject} style={{ marginBottom: '24px', display: 'flex', gap: '8px', flexDirection: 'column' }}>
                        <div style={{ display: 'flex', gap: '8px' }}>
                            <input
                                className="jira-input"
                                style={{ flex: 2 }}
                                placeholder="Project Name (e.g. Website)"
                                value={newProject.name}
                                onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                            />
                            <input
                                className="jira-input"
                                style={{ flex: 1 }}
                                placeholder="CODE"
                                value={newProject.code}
                                onChange={(e) => setNewProject({ ...newProject, code: e.target.value })}
                            />
                        </div>
                        <button type="submit" className="btn-jira-primary">Add Project</button>
                    </form>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {projects.map(p => (
                            <div key={p._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--bg-main)', padding: '12px', borderRadius: '4px', border: '1px solid var(--border-color)' }}>
                                <div>
                                    <span style={{ fontWeight: 600, color: 'var(--text-main)', marginRight: '12px' }}>[{p.code}]</span>
                                    <span style={{ color: 'var(--text-main)' }}>{p.name}</span>
                                </div>
                                <button className="close-btn" onClick={() => handleDeleteProject(p._id)}>✕</button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Assignees Management */}
                <div className="chart-wrapper" style={{ padding: '24px' }}>
                    <h3 style={{ marginBottom: '20px', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px' }}>Assignee Management</h3>

                    <form onSubmit={handleAddAssignee} style={{ marginBottom: '24px', display: 'flex', gap: '8px' }}>
                        <input
                            className="jira-input"
                            style={{ flex: 1 }}
                            placeholder="Full Name"
                            value={newAssignee.name}
                            onChange={(e) => setNewAssignee({ name: e.target.value })}
                        />
                        <button type="submit" className="btn-jira-primary">Add Person</button>
                    </form>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {assignees.map(a => (
                            <div key={a._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--bg-main)', padding: '12px', borderRadius: '4px', border: '1px solid var(--border-color)' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <div className="jira-card-assignee" style={{ position: 'static' }}>{a.name.charAt(0)}</div>
                                    <span style={{ color: 'var(--text-main)' }}>{a.name}</span>
                                </div>
                                <button className="close-btn" onClick={() => handleDeleteAssignee(a._id)}>✕</button>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}
