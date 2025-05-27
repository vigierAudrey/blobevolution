/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./**/*.{js,ts,jsx,tsx}" // Cette ligne ajoutera tous les fichiers .tsx de tous les dossiers
  ],
  theme: {
    extend: {
      // Vous pouvez ajouter vos personnalisations ici
    },
  },
  plugins: [],
};
