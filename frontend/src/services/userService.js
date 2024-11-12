// src/services/userService.js
const API_URL = 'http://localhost:3000/api';

const getHeaders = () => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${localStorage.getItem('token')}`,
});

export const fetchUsers = async ({
    page = 1,
    limit = 10,
    search = '',
    sort = '',
    filterBy = '',
    filterValue = '',
  } = {}) => {
    const queryParams = new URLSearchParams({
      page,
      limit,
      search,
    });
  
    // Añadir sort, filterBy y filterValue solo si están definidos
    if (sort) queryParams.append('sort', sort);
    if (filterBy) queryParams.append('filterBy', filterBy);
    if (filterValue) queryParams.append('filterValue', filterValue);
  
    const response = await fetch(`${API_URL}/users?${queryParams.toString()}`, {
      headers: getHeaders(),
    });
    return response.json();
  };

export const createUser = async (userData) => {
  const response = await fetch(`${API_URL}/users`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(userData),
  });
  return response.json();
};

export const updateUser = async (id, userData) => {
  const response = await fetch(`${API_URL}/users/${id}`, {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify(userData),
  });
  return response.json();
};

export const deleteUser = async (id) => {
  const response = await fetch(`${API_URL}/users/${id}`, {
    method: 'DELETE',
    headers: getHeaders(),
  });
  return response.json();
};
