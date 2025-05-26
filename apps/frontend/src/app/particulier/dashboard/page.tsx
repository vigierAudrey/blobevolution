"use client";

import { useAuth } from '@/components/AuthProvider';

export default function DashboardParticulier() {
  const { user, role, logout } = useAuth();

  if (role !== 'particulier') return <p>Accès réservé aux particuliers</p>;

  return (
    <div>
      <h1>Dashboard Particulier</h1>
      <p>Bienvenue, {user}!</p>
      <button onClick={logout}>Déconnexion</button>
    </div>
  );
}
