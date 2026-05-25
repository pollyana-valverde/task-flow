import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { apiEnv } from "@/api-env";

const queryClient = postgres(apiEnv.DATABASE_URL);
const database = drizzle({ client: queryClient, casing: "snake_case" });

export { database };
