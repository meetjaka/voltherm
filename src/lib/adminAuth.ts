// Admin authentication utility - Now uses backend API
export const ADMIN_ROUTE = 'voltherm-admin';

// Backend API authentication function
export async function authenticateAdmin(username: string, password: string): Promise<boolean> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://voltherm-backend-2pw5.onrender.com'}/api/admin/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      const data = await response.json();
      return data.success;
    }
    return false;
  } catch (error) {
    console.error('Authentication error:', error);
    return false;
  }
}

// Keep legacy function for compatibility but deprecate it
export function validateAdmin(id: string, password: string): boolean {
  console.warn('validateAdmin is deprecated. Use authenticateAdmin instead.');
  // For backward compatibility, still check old credentials as fallback
  return id === 'admin123' && password === '123456789';
}

export function setAdminSession() {
  if (typeof window !== 'undefined') {
    sessionStorage.setItem('isAdmin', 'true');
  }
}

export function clearAdminSession() {
  if (typeof window !== 'undefined') {
    sessionStorage.removeItem('isAdmin');
  }
}

export function checkAdminSession(): boolean {
  if (typeof window !== 'undefined') {
    return sessionStorage.getItem('isAdmin') === 'true';
  }
  return false;
}
