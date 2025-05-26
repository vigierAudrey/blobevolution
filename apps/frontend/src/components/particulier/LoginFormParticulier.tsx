"use client";

export default function LoginFormParticulier() {
  return (
    <form className="w-full max-w-xs bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h3 className="text-xl font-bold mb-2">Connexion Particulier</h3>
      <input
        type="email"
        placeholder="Email"
        className="w-full p-2 mb-2 border rounded"
      />
      <input
        type="password"
        placeholder="Mot de passe"
        className="w-full p-2 mb-2 border rounded"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white w-full py-2 rounded hover:bg-blue-600"
      >
        Se connecter
      </button>
    </form>
  );
}
