import { signIn, signOut, getSession } from 'next-auth/react';

export async function login(email: string, password: string) {
  try {
    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      throw new Error(result.error);
    }

    return result;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
}

export async function register(email: string, password: string, role: 'rider' | 'professional' | 'admin') {
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

    // Après l'inscription réussie, connecter automatiquement l'utilisateur
    return login(email, password);
  } catch (error) {
    console.error('Register error:', error);
    throw error;
  }
}

export async function logout() {
  try {
    await signOut({ redirect: false });
  } catch (error) {
    console.error('Logout error:', error);
    throw error;
  }
}

export async function isAuthenticated() {
  const session = await getSession();
  return !!session;
}
