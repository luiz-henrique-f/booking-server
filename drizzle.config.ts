import { defineConfig } from 'drizzle-kit'
import { env } from 'src/http/env'

export default defineConfig({
  schema: './src/drizzle/schema.ts',
  out: './src/drizzle/.migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: env.DATABASE_URL,
  },
})
