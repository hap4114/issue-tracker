import { useState } from 'react';

export default function IssueForm({ onSubmit, onCancel, projects = [], assignees = [] }) {
    const [form, setForm] = useState({
        title: '',
        description: '',
        project: projects[0] || 'Alpha',
        priority: 'Medium',
        assignee: assignees[0] || 'Alice',
        status: 'Open',
    });
    const [errors, setErrors] = useState({});

    const validate = () => {
        const e = {};
        if (!form.title.trim()) e.title = 'Title is required';
        if (!form.description.trim()) e.description = 'Description is required';
        return e;
    };

    const handleSubmit = () => {
        const e = validate();
        if (Object.keys(e).length) return setErrors(e);
        onSubmit(form);
    };

    const set = (k, v) => { setForm((p) => ({ ...p, [k]: v })); setErrors((p) => ({ ...p, [k]: '' })); };

    return (
        <div className="form">
            <div className="form-group">
                <label>Title *</label>
                <input className="jira-input" value={form.title} onChange={(e) => set('title', e.target.value)} placeholder="Short issue title" />
                {errors.title && <span className="error-msg">{errors.title}</span>}
            </div>

            <div className="form-group">
                <label>Description *</label>
                <textarea className="jira-input" value={form.description} onChange={(e) => set('description', e.target.value)} rows={3} placeholder="Describe the issue..." style={{ height: 'auto', minHeight: '80px' }} />
                {errors.description && <span className="error-msg">{errors.description}</span>}
            </div>

            <div className="form-row">
                {[
                    ['project', 'Project', projects.length ? projects : ['Alpha', 'Beta', 'Gamma', 'Delta']],
                    ['priority', 'Priority', ['Low', 'Medium', 'High', 'Critical']],
                    ['assignee', 'Assignee', assignees.length ? assignees : ['Alice', 'Bob', 'Charlie', 'Diana', 'Ethan']],
                    ['status', 'Status', ['Open', 'In Progress', 'Resolved', 'Closed']],
                ].map(([key, label, opts]) => (
                    <div key={key} className="form-group">
                        <label>{label}</label>
                        <select className="jira-input" value={form[key]} onChange={(e) => set(key, e.target.value)}>
                            {opts.map((o) => <option key={o}>{o}</option>)}
                        </select>
                    </div>
                ))}
            </div>

            <div className="form-actions">
                <button className="btn-ghost" onClick={onCancel}>Cancel</button>
                <button className="btn-primary" onClick={handleSubmit}>Create Issue</button>
            </div>
        </div>
    );
}
