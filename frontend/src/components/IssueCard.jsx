export default function IssueCard({ issue, onClick }) {
    const priorityIcon = {
        Low: '🔽', Medium: '🟰', High: '🔼', Critical: '⏫'
    };
    const priorityColor = {
        Low: '#006644', Medium: '#FF8B00', High: '#FF5630', Critical: '#DE350B'
    };

    return (
        <div className="jira-card" onClick={onClick}>
            <div
                className={`priority-dot ${issue.priority.toLowerCase()}`}
                style={{ backgroundColor: priorityColor[issue.priority] }}
                title={`Priority: ${issue.priority}`}
            ></div>
            <div className="jira-card-summary">{issue.title}</div>

            <div className="jira-card-labels">
                <span className={`jira-tag ${issue.project.toLowerCase()}`}>{issue.project.toUpperCase()}</span>
            </div>

            <div className="jira-card-footer">
                <div className="jira-card-type">
                    <span className="priority-icon" style={{ color: priorityColor[issue.priority] }} title={issue.priority}>{priorityIcon[issue.priority]}</span>
                    <span className="issue-key">IT-{issue._id.slice(-4).toUpperCase()}</span>
                </div>
                <div className="jira-card-assignee" title={issue.assignee}>
                    {issue.assignee.charAt(0)}
                </div>
            </div>
        </div>
    );
}