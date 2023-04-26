import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import bcrypt from "bcrypt";

export const register = createTRPCRouter({
  signUp: publicProcedure
    .input(
      z.object({
        email: z.string(),
        name: z.string().min(3),
        password: z.string(),
      })
    )
    .mutation(async ({ ctx: { prisma }, input }) => {
      const hashedPassword = await bcrypt.hash(input.password, 12);
      await prisma.user.create({
        data: {
          name: input.name,
          email: input.email,
          password: hashedPassword,
        },
      });
    }),
});
