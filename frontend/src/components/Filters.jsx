const PROJECTS = ['', 'Alpha', 'Beta', 'Gamma', 'Delta'];
const PRIORITIES = ['', 'Low', 'Medium', 'High', 'Critical'];
const ASSIGNEES = ['', 'Alice', 'Bob', 'Charlie', 'Diana', 'Ethan'];

export default function Filters({ filters, setFilters, projects = [], assignees = [] }) {
    const update = (key, val) =>
        setFilters((prev) => ({ ...prev, [key]: val || undefined }));

    const projectList = projects.length ? projects : ['Alpha', 'Beta', 'Gamma', 'Delta'];
    const assigneeList = assignees.length ? assignees : ['Alice', 'Bob', 'Charlie', 'Diana', 'Ethan'];
    const priorities = ['Low', 'Medium', 'High', 'Critical'];

    return (
        <div className="jira-filters">
            <div className="search-box">
                <input
                    placeholder="Search by title or description..."
                    value={filters.search || ''}
                    onChange={(e) => update('search', e.target.value)}
                />
            </div>

            {/* Project Filter */}
            <div className="filter-dropdown">
                <select value={filters.project || ''} onChange={(e) => update('project', e.target.value)}>
                    <option value="">Project</option>
                    {projectList.map(o => <option key={o} value={o}>{o}</option>)}
                </select>
            </div>

            {/* Priority Filter */}
            <div className="filter-dropdown">
                <select value={filters.priority || ''} onChange={(e) => update('priority', e.target.value)}>
                    <option value="">Priority</option>
                    {priorities.map(o => <option key={o} value={o}>{o}</option>)}
                </select>
            </div>

            {/* Assignee Filter */}
            <div className="filter-dropdown">
                <select value={filters.assignee || ''} onChange={(e) => update('assignee', e.target.value)}>
                    <option value="">Assignee</option>
                    {assigneeList.map(o => <option key={o} value={o}>{o}</option>)}
                </select>
            </div>

            {/* Sort By Filter */}
            <div className="filter-dropdown">
                <select value={filters.sortBy || ''} onChange={(e) => update('sortBy', e.target.value)}>
                    <option value="">Sort By</option>
                    <option value="newest">Newest First</option>
                    <option value="priority">Priority</option>
                    <option value="project">Project</option>
                </select>
            </div>

            {Object.keys(filters).length > 0 && (
                <button className="clear-filters" onClick={() => setFilters({})}>Clear filters</button>
            )}
        </div>
    );
}