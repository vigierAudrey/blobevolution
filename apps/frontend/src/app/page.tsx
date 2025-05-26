import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-blue-200">
      <h1 className="text-4xl font-bold">Bienvenue sur Blobinfini</h1>
      <Link href="/particulier">
        <button className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg">
          Accès Particulier
        </button>
      </Link>
    </div>
  );
}
