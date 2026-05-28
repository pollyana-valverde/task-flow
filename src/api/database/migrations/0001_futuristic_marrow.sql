CREATE TYPE "public"."member_status" AS ENUM('active', 'pending', 'declined');--> statement-breakpoint
ALTER TABLE "workspace_members" ADD COLUMN "status" "member_status" DEFAULT 'pending' NOT NULL;