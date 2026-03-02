const mongoose = require('mongoose');
const Issue = require('./models/Issue');
require('dotenv').config();

const issues = [
    { title: 'Login page crashes on Safari', description: 'Users on Safari 16 cannot log in — page goes blank after submit.', project: 'Alpha', priority: 'Critical', assignee: 'Alice', status: 'Open' },
    { title: 'Dashboard charts not loading', description: 'The analytics charts show a spinner forever on first load.', project: 'Alpha', priority: 'High', assignee: 'Bob', status: 'In Progress' },
    { title: 'Add dark mode support', description: 'Product team wants a dark mode toggle in settings.', project: 'Alpha', priority: 'Low', assignee: 'Charlie', status: 'Open' },
    { title: 'Export to CSV missing headers', description: 'When exporting data, CSV file lacks column headers.', project: 'Beta', priority: 'Medium', assignee: 'Diana', status: 'Resolved' },
    { title: 'Pagination breaks on mobile', description: 'Pagination buttons overflow on screens under 400px.', project: 'Beta', priority: 'High', assignee: 'Ethan', status: 'Open' },
    { title: 'Email notifications not sent', description: 'Users are not receiving email alerts for new assignments.', project: 'Beta', priority: 'Critical', assignee: 'Alice', status: 'In Progress' },
    { title: 'Search returns wrong results', description: 'Searching by name returns unrelated records occasionally.', project: 'Gamma', priority: 'High', assignee: 'Bob', status: 'Open' },
    { title: 'File upload size limit not enforced', description: 'Users can upload files beyond the 10MB limit without error.', project: 'Gamma', priority: 'Medium', assignee: 'Charlie', status: 'Open' },
    { title: 'Improve onboarding flow', description: 'New users are confused by the 5-step setup wizard. Simplify to 3 steps.', project: 'Gamma', priority: 'Low', assignee: 'Diana', status: 'Closed' },
    { title: 'API rate limiting not working', description: 'Stress tests show the API doesn\'t throttle beyond 1000 req/min.', project: 'Delta', priority: 'Critical', assignee: 'Ethan', status: 'Open' },
    { title: 'Session timeout too short', description: 'Users are logged out after 5 minutes of inactivity — should be 30.', project: 'Delta', priority: 'Medium', assignee: 'Alice', status: 'Resolved' },
    { title: 'Add audit log for admin actions', description: 'Compliance team needs a log of all admin-level changes.', project: 'Delta', priority: 'High', assignee: 'Bob', status: 'In Progress' },
    { title: 'Password reset link expires too fast', description: 'Reset links expire in 5 minutes — users complain they expire before use.', project: 'Alpha', priority: 'Medium', assignee: 'Charlie', status: 'Open' },
    { title: 'Typo in invoice template', description: '"Recieve" should be "Receive" in the invoice subject line.', project: 'Beta', priority: 'Low', assignee: 'Diana', status: 'Closed' },
    { title: 'Database query timeout on large datasets', description: 'Fetching reports with 10k+ rows causes a 30s timeout.', project: 'Delta', priority: 'Critical', assignee: 'Ethan', status: 'Open' },
];

async function seed() {
    await mongoose.connect(process.env.MONGO_URI);
    await Issue.deleteMany({});
    await Issue.insertMany(issues);
    console.log(`✅ Seeded ${issues.length} issues`);
    process.exit(0);
}

seed().catch((err) => {
    console.error('Seed failed:', err);
    process.exit(1);
});