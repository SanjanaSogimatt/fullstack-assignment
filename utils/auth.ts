// utils/auth.ts

export const checkSession = async () => {
    try {
      const response = await fetch('/api/session', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
  
      if (!response.ok) {
        throw new Error('Session check failed');
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error checking session:', error);
      return null;
    }
  };
  