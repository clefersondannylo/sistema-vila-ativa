import { User } from "../entities/user";
import { prisma } from "../services/prisma";

export async function createUser(data: User) {
  const user = await prisma.user.create({
    data,
    select: {
      id: true,
      name: false,
      email: false,
      password: false,
      cpf: false,
      phone: false,
      work: false,
      address: false,
      number: false,
      zip: false,
      city: false,
      state: false,
      status: false,
      deleted: false,
      isAdmin: false,
    },
  });
  return user;
}

export async function getAll(
  skip: number,
  take: number,
  search: string | null
) {
  if (!search) {
    const [users, total] = await prisma.$transaction([
      prisma.user.findMany({
        where: {
          deleted: false,
        },
        select: {
          id: true,
          name: true,
          email: true,
          password: false,
          cpf: true,
          phone: true,
          work: true,
          address: true,
          number: true,
          zip: true,
          city: true,
          state: true,
          status: true,
          deleted: true,
          isAdmin: true,
        },
        skip,
        take,
      }),
      prisma.user.count({
        where: {
          deleted: false,
        },
      }),
    ]);
    const totalPage = Math.ceil(total / take);
    return { total, totalPage, users };
  } else {
    const [users, total] = await prisma.$transaction([
      prisma.user.findMany({
        where: {
          deleted: false,
          OR: [
            {
              name: { search },
            },
            {
              email: { search },
            },
            {
              phone: { search },
            },
            {
              work: { search },
            },
            {
              cpf: { search },
            },
            {
              address: { search },
            },
            {
              number: { search },
            },
            {
              city: { search },
            },
            {
              state: { search },
            },
            {
              zip: { search },
            },
          ],
        },
        select: {
          id: true,
          name: true,
          email: true,
          password: false,
          cpf: true,
          phone: true,
          work: true,
          address: true,
          number: true,
          zip: true,
          city: true,
          state: true,
          status: true,
          deleted: false,
          isAdmin: true,
        },
        skip,
        take,
      }),
      prisma.user.count({
        where: {
          deleted: false,
          OR: [
            {
              name: { search },
            },
            {
              email: { search },
            },
            {
              phone: { search },
            },
            {
              work: { search },
            },
            {
              cpf: { search },
            },
            {
              address: { search },
            },
            {
              number: { search },
            },
            {
              city: { search },
            },
            {
              state: { search },
            },
            {
              zip: { search },
            },
          ],
        },
      }),
    ]);
    const totalPage = Math.ceil(total / take);
    return { total, totalPage, users };
  }
}

export async function getById(id: number) {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      name: true,
      email: true,
      password: false,
      cpf: true,
      phone: true,
      work: true,
      address: true,
      number: true,
      zip: true,
      city: true,
      state: true,
      status: false,
      deleted: true,
      isAdmin: true,
    },
  });
  return user;
}

export async function updateUser(id: number, data: any) {
  const user = await prisma.user.update({
    where: {
      id,
    },
    select: {
      id: true,
      name: true,
      email: true,
      password: false,
      cpf: true,
      phone: true,
      work: true,
      address: true,
      number: true,
      zip: true,
      city: true,
      state: true,
      status: true,
      deleted: true,
      isAdmin: true,
    },
    data,
  });
  return user;
}

export async function deleteUser(id: number) {
  await prisma.user.update({
    where: { id },
    data: {
      deleted: true,
    },
  });
  return;
}
