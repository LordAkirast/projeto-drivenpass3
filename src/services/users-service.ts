import bcrypt from 'bcrypt';
import { User } from '@prisma/client';
import { userRepository } from '@/repository/users-repository';

export async function createUser({ email, password }: CreateUserParams): Promise<User> {

  console.log('entrou no create user')
  await validateUniqueEmailOrFail(email);

  console.log('passou do validateUniqueEmailOrFail')
  const hashedPassword = await bcrypt.hash(password, 12);
  return userRepository.create({
    email,
    password: hashedPassword,
  });
}

export async function loginUser({ email, password }: CreateUserParams): Promise<User> {

  console.log('entrou no login userrrr')
  await validateUserExists(email);

  console.log('passou do validateUniqueEmailOrFail')
  const hashedPassword = await bcrypt.hash(password, 12);
  return userRepository.create({
    email,
    password: hashedPassword,
  });
}


async function validateUniqueEmailOrFail(email: string) {
  const userWithSameEmail = await userRepository.findByEmail(email);

  console.log('entrou no create user / validate')

  if (userWithSameEmail) {
    console.log('entrou no if de erro de mesmo usuario')
    const error = new Error("There is already a user with this email.") as any;
    error.code = "emailExisting_error";
    throw error;
  }
  console.log('passou do if')
}

async function validateUserExists(email: string) {
  const userWithSameEmail = await userRepository.findByEmail(email);

  console.log('entrou no create validateUserExists')

  if (userWithSameEmail) {
    console.log('entrou no if de erro de user existe')
    return 'LOGADO'
  } else {
    const error = new Error("There is no user with this email.") as any;
    error.code = "userNotExists_error";
    throw error;
  }

}



export type CreateUserParams = Pick<User, 'email' | 'password'>;

export const userService = {
  createUser,
  loginUser,
};
