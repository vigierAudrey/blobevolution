// src/app/professionnel/dashboard/page.tsx
"use client";

import { useAuth } from '@/components/AuthProvider';

export default function DashboardProfessionnel() {
  const { user, role, logout } = useAuth();

  if (role !== 'professionnel') return <p>Accès réservé aux professionnels</p>;

  return (
    <div>
      <h1>Dashboard Professionnel</h1>
      <p>Bienvenue, {user}!</p>
      <button onClick={logout}>Déconnexion</button>
    </div>
  );
}
