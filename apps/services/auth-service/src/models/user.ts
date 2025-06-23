export interface User {
  id: number;
  email: string;
  passwordHash: string;
  role: 'rider' | 'professional' | 'admin';
  createdAt: Date;
  updatedAt: Date;
}