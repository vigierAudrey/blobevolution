export async function login(email: string, password: string) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_AUTH_API}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error('Erreur lors de la connexion');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
}

export async function register(email: string, password: string, role: string) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_AUTH_API}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password, role }),
    });

    if (!response.ok) {
      throw new Error('Erreur lors de l\'inscription');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Register error:', error);
    throw error;
  }
}

export async function logout() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_AUTH_API}/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Erreur lors de la déconnexion');
    }

    // Après la déconnexion réussie côté serveur, supprimer le token local
    localStorage.removeItem('token');
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Logout error:', error);
    throw error;
  }
}

export function isAuthenticated() {
  const token = localStorage.getItem('token');
  return !!token;
}
