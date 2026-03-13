console.log('VITE_API_URL:', import.meta.env.VITE_API_URL);

// Test API connection
fetch(`${import.meta.env.VITE_API_URL}/products`)
  .then(res => res.json())
  .then(data => console.log('API Test:', data))
  .catch(err => console.error('API Test Failed:', err));
