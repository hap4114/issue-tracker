import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const getProjects = () => axios.get(`${API_URL}/settings/projects`);
export const createProject = (data) => axios.post(`${API_URL}/settings/projects`, data);
export const deleteProject = (id) => axios.delete(`${API_URL}/settings/projects/${id}`);

export const getAssignees = () => axios.get(`${API_URL}/settings/assignees`);
export const createAssignee = (data) => axios.post(`${API_URL}/settings/assignees`, data);
export const deleteAssignee = (id) => axios.delete(`${API_URL}/settings/assignees/${id}`);
