// Admin authentication utility
export const ADMIN_CREDENTIALS = {
  id: 'admin123',
  password: '123456789'
};

export const ADMIN_ROUTE = 'voltherm-admin';

export function validateAdmin(id: string, password: string): boolean {
  return id === ADMIN_CREDENTIALS.id && password === ADMIN_CREDENTIALS.password;
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
