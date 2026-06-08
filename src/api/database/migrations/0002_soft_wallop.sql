ALTER TABLE "tasks" DROP CONSTRAINT "tasks_assignee_id_workspace_members_id_fk";
--> statement-breakpoint
ALTER TABLE "tasks" DROP CONSTRAINT "tasks_updated_by_workspace_members_id_fk";
--> statement-breakpoint
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_assignee_id_users_id_fk" FOREIGN KEY ("assignee_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_updated_by_users_id_fk" FOREIGN KEY ("updated_by") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;