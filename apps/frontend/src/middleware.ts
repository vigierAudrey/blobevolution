import { NextResponse } from 'next/server';

export function middleware(request) {
  const token = request.cookies.get('token');
  const url = request.nextUrl;

  // Vérifier la présence du token
  if (!token) {
    // Rediriger vers la page de login appropriée
    if (url.pathname.startsWith('/particulier')) {
      return NextResponse.redirect('/particulier/login');
    }
    if (url.pathname.startsWith('/professionnel')) {
      return NextResponse.redirect('/professionnel/login');
    }
    // Redirection par défaut si non reconnu
    return NextResponse.redirect('/login');
  }

  return NextResponse.next();
}

// Configuration du middleware pour matcher les chemins d'accès
export const config = {
  matcher: [
    '/particulier/dashboard/:path*',
    '/professionnel/dashboard/:path*',
    '/dashboard/:path*'
  ],
};
