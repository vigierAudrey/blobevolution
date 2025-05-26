import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    const { email, password } = await request.json();
    // Appel au microservice Auth pour vérifier les identifiants
    const response = await fetch('http://localhost:4001/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
        return NextResponse.json({ error: 'Identifiants invalides' }, { status: 401 });
    }

    const data = await response.json();
    return NextResponse.json(data);
}
