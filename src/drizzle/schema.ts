// schema.ts
import {
  pgTable,
  uuid,
  text,
  timestamp,
  varchar,
  integer,
  boolean,
} from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'

// Tabela `establishment`
export const establishment = pgTable('establishment', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  phone: text('phone').notNull(),
  address: text('address').notNull(),
  address_number: text('address_number').notNull(),
  neighborhood: text('neighborhood').notNull(),
  city: text('city').notNull(),
  uf: text('uf').notNull(),
  start_day_service: text('start_day_service').notNull(),
  end_day_service: text('end_day_service').notNull(),
  created_at: timestamp('created_at').defaultNow().notNull(),
})

// Tabela `establishment_photos`
export const establishmentPhotos = pgTable('establishment_photos', {
  id: uuid('id').primaryKey().defaultRandom(),
  id_establishment: uuid('id_establishment')
    .notNull()
    .references(() => establishment.id),
  img_url: text('img_url').notNull(),
  created_at: timestamp('created_at').defaultNow().notNull(),
})

// Tabela `user`
export const user = pgTable('user', {
  id: uuid('id').primaryKey().defaultRandom(),
  id_establishment: uuid('id_establishment')
    .notNull()
    .references(() => establishment.id),
  name: text('name').notNull(),
  phone: text('phone').notNull(),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
  start_time_service: text('start_time_service').notNull(),
  end_time_service: text('end_time_service').notNull(),
  created_at: timestamp('created_at').defaultNow().notNull(),
})

// Tabela `client`
export const client = pgTable('client', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  phone: text('phone').notNull(),
  created_at: timestamp('created_at').defaultNow().notNull(),
})

// Tabela `service`
export const service = pgTable('service', {
  id: uuid('id').primaryKey().defaultRandom(),
  id_user: uuid('id_user')
    .notNull()
    .references(() => user.id),
  description: text('description').notNull(),
  price: text('price').notNull(),
  duration: text('duration').notNull(),
})

// Tabela `booking`
export const booking = pgTable('booking', {
  id: uuid('id').primaryKey().defaultRandom(),
  id_user: uuid('id_user')
    .notNull()
    .references(() => user.id),
  id_client: uuid('id_client')
    .notNull()
    .references(() => client.id),
  id_service: uuid('id_service')
    .notNull()
    .references(() => service.id),
  date: timestamp('date').notNull(),
  start_time: text('start_time').notNull(),
  end_time: text('end_time').notNull(),
  observation: text('observation'),
  created_at: timestamp('created_at').defaultNow().notNull(),
})

// Definição das Relações

// Relações para `establishment`
export const establishmentRelations = relations(establishment, ({ many }) => ({
  establishment_photos: many(establishmentPhotos),
  users: many(user),
}))

// Relações para `user`
export const userRelations = relations(user, ({ many, one }) => ({
  establishment: one(establishment, {
    fields: [user.id_establishment],
    references: [establishment.id],
  }),
  bookings: many(booking),
  services: many(service),
}))

// Relações para `client`
export const clientRelations = relations(client, ({ many }) => ({
  bookings: many(booking),
}))

// Relações para `service`
export const serviceRelations = relations(service, ({ many, one }) => ({
  user: one(user, {
    fields: [service.id_user],
    references: [user.id],
  }),
  bookings: many(booking),
}))

// Relações para `establishment_photos`
export const establishmentPhotosRelations = relations(
  establishmentPhotos,
  ({ one }) => ({
    establishment: one(establishment, {
      fields: [establishmentPhotos.id_establishment],
      references: [establishment.id],
    }),
  })
)

// Relações para `booking`
export const bookingRelations = relations(booking, ({ one }) => ({
  user: one(user, {
    fields: [booking.id_user],
    references: [user.id],
  }),
  client: one(client, {
    fields: [booking.id_client],
    references: [client.id],
  }),
  service: one(service, {
    fields: [booking.id_service],
    references: [service.id],
  }),
}))
