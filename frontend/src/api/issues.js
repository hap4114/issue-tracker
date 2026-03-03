import axios from 'axios';

const API = axios.create({ baseURL: 'https://issue-tracker-1gsl.onrender.com/api' });

export const getIssues = (params) => API.get('/issues', { params });
export const getIssue = (id) => API.get(`/issues/${id}`);
export const createIssue = (data) => API.post('/issues', data);
export const updateStatus = (id, status) => API.patch(`/issues/${id}/status`, { status });
export const addComment = (id, text) => API.post(`/issues/${id}/comments`, { text });