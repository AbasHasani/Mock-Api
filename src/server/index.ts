import { db } from "..";
import { apisRouter } from "./routers/apis";
import { publicProcedure, router } from "./trpc";

export const appRouter = router({
  apisRouter
});

export type AppRouter = typeof appRouter;
