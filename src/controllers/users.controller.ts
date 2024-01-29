import { Request, Response } from 'express';
import httpStatus from 'http-status';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { userService } from '@/services/users-service';


const JWT_SECRET = 'hudshuhdas'


function generateToken(userId: string): string {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '1h' });
}

export async function usersCreatePost(req: Request, res: Response) {
  const { email, password } = req.body;

  try {
  
    const user = await userService.validateUniqueEmailOrFail(email);

    if (!user) {
      return res.status(httpStatus.UNAUTHORIZED).json({ error: 'Usuário não encontrado' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(httpStatus.UNAUTHORIZED).json({ error: 'Senha incorreta' });
    }

  
    const token = generateToken(user.id);


    return res.status(httpStatus.OK).json({ token });
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: 'Erro interno do servidor' });
  }
}
