import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";
import { merchandiseRouter } from "./routers/merchandise";
import { orderRouter } from "./routers/order";
import { cartRouter } from "./routers/cart";
import { razorPayRouter } from "./routers/razorpay";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  merchandise: merchandiseRouter,
  razorpay: razorPayRouter,
  order: orderRouter,
  cart: cartRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
