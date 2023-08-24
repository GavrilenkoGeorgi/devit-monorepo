import { z } from 'zod'

export const LoginDataSchema = z.object({
  email: z.string().email(),
  password: z.string().min(12)
})

export type LoginDataSchemaType = z.infer<typeof LoginDataSchema>
