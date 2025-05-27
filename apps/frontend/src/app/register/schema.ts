import * as z from 'zod'

export const registerSchema = z
  .object({
    email: z.string().email({ message: 'Email invalide' }),
    password: z
      .string()
      .min(8, 'Le mot de passe doit faire au moins 8 caractères')
      .regex(
        /(?=.*[A-Z])(?=.*[a-z])(?=.*\d)/,
        'Doit contenir majuscule, minuscule et chiffre'
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Les mots de passe ne correspondent pas',
  })

export type RegisterFormData = z.infer<typeof registerSchema>
