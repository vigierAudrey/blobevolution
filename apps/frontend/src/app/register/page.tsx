// apps/frontend/src/app/register/page.tsx
'use client'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { registerSchema, RegisterFormData } from './schema'

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  })

  const onSubmit = async (data: RegisterFormData) => {
    // TODO : appel à ton API POST /api/auth/register
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div>
        <label>Email</label>
        <input type="email" {...register('email')} required />
        {errors.email && <p>{errors.email.message}</p>}
      </div>

      <div>
        <label>Mot de passe</label>
        <input type="password" {...register('password')} required />
        {errors.password && <p>{errors.password.message}</p>}
      </div>

      <div>
        <label>Confirme mot de passe</label>
        <input type="password" {...register('confirmPassword')} required />
        {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
      </div>

      <button type="submit">S’inscrire</button>
    </form>
  )
}
