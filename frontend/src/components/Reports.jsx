import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

const PIE_COLORS = ['#0052CC', '#008DA6', '#006644', '#FF8B00', '#DE350B', '#403294'];

export default function Reports({ issues }) {
    const byPriority = useMemo(() => {
        const counts = issues.reduce((acc, curr) => {
            acc[curr.priority] = (acc[curr.priority] || 0) + 1;
            return acc;
        }, {});
        return Object.entries(counts).map(([name, value]) => ({ name, value }));
    }, [issues]);

    const byProject = useMemo(() => {
        const counts = issues.reduce((acc, curr) => {
            acc[curr.project] = (acc[curr.project] || 0) + 1;
            return acc;
        }, {});
        return Object.entries(counts).map(([name, value]) => ({ name, value }));
    }, [issues]);

    const byAssignee = useMemo(() => {
        const counts = issues.reduce((acc, curr) => {
            acc[curr.assignee] = (acc[curr.assignee] || 0) + 1;
            return acc;
        }, {});
        return Object.entries(counts).map(([name, value]) => ({ name, value }));
    }, [issues]);

    const groupedIssues = useMemo(() => {
        const groups = {};
        issues.forEach(issue => {
            const proj = issue.project || 'Unassigned';
            if (!groups[proj]) groups[proj] = [];
            groups[proj].push(issue);
        });
        return groups;
    }, [issues]);

    if (!issues || issues.length === 0) {
        return <div className="state-msg">No data to display in reports.</div>;
    }

    return (
        <div className="reports-container">
            <div className="chart-wrapper">
                <h3>Issues by Priority</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                        <Pie
                            data={byPriority}
                            cx="50%"
                            cy="50%"
                            outerRadius={100}
                            dataKey="value"
                            label
                        >
                            {byPriority.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip
                            contentStyle={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)', borderRadius: '3px' }}
                            itemStyle={{ color: 'var(--text-main)' }}
                            labelStyle={{ color: 'var(--text-main)' }}
                        />
                        <Legend wrapperStyle={{ color: 'var(--text-main)' }} />
                    </PieChart>
                </ResponsiveContainer>
            </div>

            <div className="chart-wrapper">
                <h3>Issues by Project</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={byProject}>
                        <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
                        <XAxis dataKey="name" stroke="var(--text-main)" />
                        <YAxis stroke="var(--text-main)" allowDecimals={false} />
                        <Tooltip
                            contentStyle={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)', borderRadius: '3px' }}
                            itemStyle={{ color: 'var(--text-main)' }}
                            labelStyle={{ color: 'var(--text-main)' }}
                        />
                        <Bar dataKey="value" fill="var(--jira-blue)" />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            <div className="chart-wrapper">
                <h3>Issues by Assignee (Workload)</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={byAssignee} layout="vertical">
                        <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
                        <XAxis type="number" stroke="var(--text-main)" allowDecimals={false} />
                        <YAxis dataKey="name" type="category" width={80} stroke="var(--text-main)" />
                        <Tooltip
                            contentStyle={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)', borderRadius: '3px' }}
                            itemStyle={{ color: 'var(--text-main)' }}
                            labelStyle={{ color: 'var(--text-main)' }}
                        />
                        <Bar dataKey="value" fill="#008DA6" />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            <div className="chart-wrapper">
                <h3>Recent Issues per Project</h3>
                <div style={{ height: '300px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px', paddingRight: '8px' }}>
                    {Object.entries(groupedIssues).map(([project, projectIssues]) => (
                        <div key={project}>
                            <h4 style={{ color: 'var(--text-main)', fontSize: '14px', marginBottom: '8px', borderBottom: '1px solid var(--border-color)', paddingBottom: '4px' }}>{project}</h4>
                            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                {projectIssues.slice(0, 5).map(i => (
                                    <li key={i._id} style={{ fontSize: '12px', color: 'var(--text-subtle)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                        <span style={{ color: 'var(--text-main)', fontWeight: 600, marginRight: '8px' }}>IT-{i._id.slice(-4).toUpperCase()}</span>
                                        {i.title}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
