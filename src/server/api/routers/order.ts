import { TRPCError } from "@trpc/server";
import { adminProcedure, createTRPCRouter, protectedProcedure } from "../trpc";
import { z } from "zod";

export const orderRouter = createTRPCRouter({
  getAllUserOrders: adminProcedure.query(async ({ ctx }) => {
    try {
      return await ctx.db.order.findMany({
        include: {
          User: {
            select: {
              name: true,
              email: true,
            },
          },
          PaymentOrder: {
            select: {
              amount: true,
              id: true,
              status: true,
              razorpayOrderID: true,
            },
          },
          OrderItem: {
            select: {
              Merchandise: {
                select: { name: true },
              },
            },
          },
        },
      });
    } catch (e) {
      console.log(e);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Could not get orders",
      });
    }
  }),

  markOrderDelivered: adminProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      return await ctx.db.order.update({
        where: {
          id: input.id,
        },
        data: {
          delivered: true,
        },
      });
    }),

  getUserOrders: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.order.findMany({
      where: {
        userId: ctx.session.user.id,
        PaymentOrder: {
          status: "SUCCESS",
        },
      },
      include: {
        OrderItem: {
          include: {
            Merchandise: true,
          },
        },
        PaymentOrder: {
          select: {
            status: true,
          },
        },
      },
    });
  }),
});
