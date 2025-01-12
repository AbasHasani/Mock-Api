import 'dotenv/config';

import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import * as schema from "@/db/schema";  // Import the entire schema object

const sqlite = new Database(process.env.DB_FILE_NAME!);
export const db = drizzle(sqlite, { schema });  // ✅ Pass schema here