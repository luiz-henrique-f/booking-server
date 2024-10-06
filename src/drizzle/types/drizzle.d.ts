import type * as schema from '../schema'
import type { NodePgDatabase } from 'drizzle-orm/node-postgres'

export type DrizzleDB = NodePgDatabase<typeof schema>
