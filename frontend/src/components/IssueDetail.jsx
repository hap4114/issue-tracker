import { useState, useEffect } from 'react';
import { getIssue, updateStatus, addComment } from '../api/issues';

const STATUSES = ['Open', 'In Progress', 'Resolved', 'Closed'];

export default function IssueDetail({ issueId, onUpdated }) {
    const [issue, setIssue] = useState(null);
    const [comment, setComment] = useState('');
    const [loading, setLoading] = useState(true);

    const fetch = async () => {
        const res = await getIssue(issueId);
        setIssue(res.data);
        setLoading(false);
    };

    useEffect(() => { fetch(); }, [issueId]);

    const handleStatus = async (e) => {
        await updateStatus(issueId, e.target.value);
        onUpdated();
    };

    const handleComment = async () => {
        if (!comment.trim()) return;
        await addComment(issueId, comment);
        setComment('');
        fetch();
    };

    if (loading) return <div className="state-msg">Loading...</div>;

    return (
        <div className="detail">
            <div className="detail-meta">
                <div className="meta-item">
                    <span className="meta-label">Project</span>
                    <span className="meta-val">{issue.project}</span>
                </div>
                <div className="meta-item">
                    <span className="meta-label">Priority</span>
                    <span className="meta-val">{issue.priority}</span>
                </div>
                <div className="meta-item">
                    <span className="meta-label">Assignee</span>
                    <span className="meta-val">{issue.assignee}</span>
                </div>
                <div className="meta-item">
                    <span className="meta-label">Created</span>
                    <span className="meta-val">{new Date(issue.createdAt).toLocaleDateString()}</span>
                </div>
            </div>

            <div className="status-update">
                <label>Status</label>
                <select value={issue.status} onChange={handleStatus}>
                    {STATUSES.map((s) => <option key={s}>{s}</option>)}
                </select>
            </div>

            <div className="detail-desc">{issue.description}</div>

            <div className="comments-section">
                <h3>Comments ({issue.comments.length})</h3>
                <div className="comments-list">
                    {issue.comments.length === 0 && <p className="no-comments">No comments yet.</p>}
                    {issue.comments.map((c, i) => (
                        <div key={i} className="comment">
                            <div className="comment-avatar">👤</div>
                            <div className="comment-content">
                                <div className="comment-header">{new Date(c.createdAt).toLocaleString()}</div>
                                <div className="comment-text">{c.text}</div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="comment-input">
                    <textarea value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Add a comment..." rows={3} />
                    <button className="btn-primary" style={{ alignSelf: 'flex-start' }} onClick={handleComment}>Save</button>
                </div>
            </div>
        </div>
    );
}