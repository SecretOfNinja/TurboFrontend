// api.js
const API_BASE_URL = 'https://turbobackend.onrender.com/api/v1/turbo'; // Replace with your actual backend URL

export const login = async (userData) => {
  const response = await fetch(`${API_BASE_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message);
  }

  return response.json();
};
