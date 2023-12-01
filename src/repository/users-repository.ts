import { Prisma } from '@prisma/client';
import { prisma } from '@/config';

async function findByEmail(email: string, select?: Prisma.UserSelect) {
  console.log('entrou no create/user/validate/repository/findbyemail')
  const params: Prisma.UserFindUniqueArgs = {
    where: {
      email,
    },
  };

  console.log('passou do params')

  if (select) {
    params.select = select;
  }

  console.log('passou do if')
  return prisma.user.findUnique(params);
}

async function create(data: Prisma.UserUncheckedCreateInput) {
  return prisma.user.create({
    data,
  });
}

export const userRepository = {
  findByEmail,
  create,
};
