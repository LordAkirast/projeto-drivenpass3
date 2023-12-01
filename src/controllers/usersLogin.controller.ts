import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { userService } from '@/services/users-service';

export async function usersLogin(req: Request, res: Response) {
  const { email, password } = req.body;

  try {
    const user = await userService.loginUser({ email, password });
    return res.status(httpStatus.CREATED).json({
      id: user.id,
      email: user.email,
    });
  } catch (error) {
  
    if (error.code === "emailExisting_error") {
      return res.status(httpStatus.CONFLICT).json({ error: error.message });
    }
  
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: "Internal Server Error" });
  }
}