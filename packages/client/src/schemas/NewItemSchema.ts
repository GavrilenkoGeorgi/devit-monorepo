import { z } from 'zod'

export const NewItemSchema = z.object({
  title: z.string().min(4).max(256),
  link: z.string().url()
})

export type NewItemSchemaType = z.infer<typeof NewItemSchema>
