import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { apiEnv } from "@/api-env";
import * as schema from "./schema";

const queryClient = postgres(apiEnv.DATABASE_URL);
const database = drizzle({ client: queryClient, schema, casing: "snake_case" });

export { database };
