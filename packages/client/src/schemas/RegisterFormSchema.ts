import { z } from 'zod'

export const RegisterFormSchema = z.object({
  email: z.string().email().min(2).max(128),
  password: z.string().email().min(2).max(128)
})

export type RegisterFormSchemaType = z.infer<typeof RegisterFormSchema>
