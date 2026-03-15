const BASE = process.env.REACT_APP_API_URL || 'http://localhost:8080';

const req = async (method, path, body) => {
  const opts = {
    method,
    headers: { 'Content-Type': 'application/json' },
  };
  if (body) opts.body = JSON.stringify(body);
  const res = await fetch(`${BASE}${path}`, opts);
  const data = await res.json();
  if (!data.success && res.status >= 400) throw new Error(data.message || 'Request failed');
  return data;
};

export const api = {
  // Profile & About
  profile: {
    get: () => req('GET', '/api/profile'),
    update: (body) => req('PUT', '/api/profile', body),
  },
  // Projects
  projects: {
    getAll: () => req('GET', '/api/projects'),
    getOne: (id) => req('GET', `/api/projects/${id}`),
    create: (body) => req('POST', '/api/projects', body),
    update: (id, body) => req('PUT', `/api/projects/${id}`, body),
    delete: (id) => req('DELETE', `/api/projects/${id}`),
  },
  // Experience
  experience: {
    getAll: () => req('GET', '/api/experience'),
    create: (body) => req('POST', '/api/experience', body),
    update: (id, body) => req('PUT', `/api/experience/${id}`, body),
    delete: (id) => req('DELETE', `/api/experience/${id}`),
  },
  // Education
  education: {
    getAll: () => req('GET', '/api/education'),
    create: (body) => req('POST', '/api/education', body),
    update: (id, body) => req('PUT', `/api/education/${id}`, body),
    delete: (id) => req('DELETE', `/api/education/${id}`),
  },
  // Skills
  skills: {
    getAll: () => req('GET', '/api/skills'),
    create: (body) => req('POST', '/api/skills', body),
    update: (id, body) => req('PUT', `/api/skills/${id}`, body),
    delete: (id) => req('DELETE', `/api/skills/${id}`),
  },
  // Formations
  formations: {
    getAll: () => req('GET', '/api/formations'),
    create: (body) => req('POST', '/api/formations', body),
    update: (id, body) => req('PUT', `/api/formations/${id}`, body),
    delete: (id) => req('DELETE', `/api/formations/${id}`),
  },
  // Messages
  contact: {
    getAll: () => req('GET', '/api/contact'),
  },
};
