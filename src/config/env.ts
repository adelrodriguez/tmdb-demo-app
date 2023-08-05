import { z } from "zod"

const EnvSchema = z.object({
  TMDB_API_KEY: z.string().min(1),
  TMDB_API_URL: z.string().min(1),
  TMDB_API_READ_ACCESS_TOKEN: z.string().min(1),
})

export type Env = z.infer<typeof EnvSchema>

const env = EnvSchema.parse(process.env)

export default env
