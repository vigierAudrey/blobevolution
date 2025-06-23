import { Router, Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import validator from 'express-validator';
import prisma from '../db';
import passport from '../googleStrategy';

const router = Router();
const { body, validationResult } = validator;

// simple healthcheck
router.get('/ping', (_req, res) => {
  res.send('pong');
});

// register
router.post(
  '/register',
  [body('email').isEmail(), body('password').isLength({ min: 6 })],
  async (req: Request, res: Response) => {
    console.log('BODY →', req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { email, password, role } = req.body as {
        email: string;
        password: string;
        role?: 'rider' | 'professional' | 'admin';
      };

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return res.status(400).json({ message: 'Email déjà utilisé' });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        email,
        passwordHash,
        role: role ?? 'rider'
      }
    });

    return res.status(201).json({
      message: 'Utilisateur créé avec succès',
      user: { id: user.id, email: user.email, role: user.role }
    });

  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
});

// login
router.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body as { email: string; password: string };
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: 'Identifiants invalides' });
    }

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) {
      return res.status(400).json({ message: 'Identifiants invalides' });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET as string,
      { expiresIn: '1h' }
    );

    return res.json({ token });
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
});

// Google OAuth2
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback',
  passport.authenticate('google', { session: false, failureRedirect: '/' }),
  (req: Request, res: Response) => {
    const user = req.user as any;
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET as string,
      { expiresIn: '1h' }
    );
    res.json({ token });
  }
);


// middleware to protect routes
function authenticate(req: Request, res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  if (!header) return res.sendStatus(401);

  const [, token] = header.split(' ');
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET as string) as {
      id: number;
      role: string;
    };
    (req as any).user = payload;
    return next();
  } catch {
    return res.sendStatus(403);
  }
}

// protected profile endpoint
router.get(
  '/profile',
  authenticate,
  async (req: Request, res: Response) => {
    try {
      const { id } = (req as any).user as { id: number; role: string };
      const user = await prisma.user.findUnique({
        where: { id },
        select: { id: true, email: true, role: true }
      });
      if (!user) {
        return res.sendStatus(404);
      }
      return res.json(user);
    } catch (err: any) {
      console.error(err);
      return res.status(500).json({ message: 'Erreur serveur', error: err.message });
    }
  }
);

export default router;