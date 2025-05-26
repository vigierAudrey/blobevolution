import { NextResponse } from 'next/server';

export async function GET() {
    // Appel au microservice User pour récupérer les infos
    const response = await fetch('http://localhost:4001/users/me', {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) {
        return NextResponse.json({ error: 'Utilisateur non trouvé' }, { status: 404 });
    }

    const data = await response.json();
    return NextResponse.json(data);
}
