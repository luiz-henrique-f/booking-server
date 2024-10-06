CREATE TABLE IF NOT EXISTS "booking" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"id_user" uuid NOT NULL,
	"id_client" uuid NOT NULL,
	"id_service" uuid NOT NULL,
	"date" timestamp NOT NULL,
	"start_time" text NOT NULL,
	"end_time" text NOT NULL,
	"observation" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "client" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"phone" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "establishment" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"phone" text NOT NULL,
	"address" text NOT NULL,
	"address_number" text NOT NULL,
	"neighborhood" text NOT NULL,
	"city" text NOT NULL,
	"uf" text NOT NULL,
	"start_day_service" text NOT NULL,
	"end_day_service" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "establishment_photos" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"id_establishment" uuid NOT NULL,
	"img_url" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "service" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"id_user" uuid NOT NULL,
	"description" text NOT NULL,
	"price" text NOT NULL,
	"duration" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"id_establishment" uuid NOT NULL,
	"name" text NOT NULL,
	"phone" text NOT NULL,
	"email" text NOT NULL,
	"password" text NOT NULL,
	"start_time_service" text NOT NULL,
	"end_time_service" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "booking" ADD CONSTRAINT "booking_id_user_user_id_fk" FOREIGN KEY ("id_user") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "booking" ADD CONSTRAINT "booking_id_client_client_id_fk" FOREIGN KEY ("id_client") REFERENCES "public"."client"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "booking" ADD CONSTRAINT "booking_id_service_service_id_fk" FOREIGN KEY ("id_service") REFERENCES "public"."service"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "establishment_photos" ADD CONSTRAINT "establishment_photos_id_establishment_establishment_id_fk" FOREIGN KEY ("id_establishment") REFERENCES "public"."establishment"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "service" ADD CONSTRAINT "service_id_user_user_id_fk" FOREIGN KEY ("id_user") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user" ADD CONSTRAINT "user_id_establishment_establishment_id_fk" FOREIGN KEY ("id_establishment") REFERENCES "public"."establishment"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
