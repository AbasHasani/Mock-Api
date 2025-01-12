import { db } from "@/index";
import { publicProcedure, router } from "../trpc";
import { z } from "zod";
import { apis } from "@/db/schema";
import { eq } from "drizzle-orm";
import { migrate } from "drizzle-orm/better-sqlite3/migrator";

migrate(db, { migrationsFolder: "drizzle" });
export const apisRouter = router({
  addApi: publicProcedure
    .input(
      z.object({ content: z.string(), name: z.string(), userId: z.string() })
    )
    .mutation(async ({ input: { content, name, userId } }) => {
      try {
        console.log({ content, name, userId });
        const newApi = await db.insert(apis).values({
          content,
          userId,
          name,
        });
        console.log(newApi);
        return newApi;
      } catch (error) {
        console.log(userId);

        throw new Error("Error.");
      }
    }),
  apis: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ input: { userId } }) => {
      const allApis = await db
        .select()
        .from(apis)
        .where(eq(apis.userId, userId));
      return allApis;
    }),
  api: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input: { id } }) => {
      const api = await db.select().from(apis).where(eq(apis.id, id));
      return api[0];
    }),
  updateApi: publicProcedure
    .input(z.object({ content: z.string(), id: z.number() }))
    .mutation(async ({ input: { content, id } }) => {
      const result = await db
        .update(apis)
        .set({
          content,
          updatedAt: new Date(), // Optional: Auto-update timestamp
        })
        .where(eq(apis.id, id)); // Condition to target a specific record

      return result;
    }),
  deleteApi: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input: { id } }) => {
      const result = await db.delete(apis).where(eq(apis.id, id)); // Delete where the id matches

      return result;
    }),
});
