"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import LoginFormPro from "@components/professionnel/LoginFormPro";
import RegisterFormPro from "@components/professionnel/RegisterFormPro";
import { logout } from '@utils/authApi';




export default function Pro() {
  const [isFirstVisit, setIsFirstVisit] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
      alert('Déconnexion réussie !');
      router.push('/'); // Redirection vers la page d'accueil après déconnexion
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
      alert('Échec de la déconnexion, veuillez réessayer.');
    }
  };


  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4">
      <h2 className="text-2xl font-semibold mb-4">Accès Professionnel</h2>
      {isFirstVisit ? <RegisterFormPro /> : <LoginFormPro />}
      <button
        className="mt-4 text-green-600 underline"
        onClick={() => setIsFirstVisit(!isFirstVisit)}
      >
        {isFirstVisit ? 'Déjà un compte ? Connectez-vous' : 'Première visite ? Inscrivez-vous'}
      </button>
      <button 
        onClick={handleLogout} 
        className="mt-4 bg-red-500 text-white p-2 rounded"
      >
        Déconnexion
      </button>
    </div>
  );
}
