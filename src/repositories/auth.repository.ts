import { prisma } from "../services/prisma";

export async function getUser(email: string) {
  const user = await prisma.user.findFirst({
    where: {
      email,
    },
  });
  return user;
}
