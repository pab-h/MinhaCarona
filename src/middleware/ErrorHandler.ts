import { Prisma } from '@prisma/client';
import type { NextFunction, Request, Response } from 'express';
import { TokenExpiredError } from 'jsonwebtoken';
import { ArgumentNotValidError } from '../service/error/ArgumentNotValidError';
import { ZodError } from 'zod';

export function handlerError(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (error instanceof ZodError) {
    console.error(error.errors);
    return res.status(400).json({
      message: 'Error de validação',
      issues: error.issues,
    });
  }

  if (error instanceof TokenExpiredError) {
    console.error(error);
    return res.status(401).json({ message: 'Token expirado' });
  }

  if (error instanceof ArgumentNotValidError) {
    console.error(error);
    return res.status(401).json({ message: error.message });
  }

  if (error instanceof Error) {
    console.error(error);

    if (error.message) {
      return res.status(500).json({ message: error.message });
    }

    return res.status(500).json({ message: 'Error interno do servidor' });
  }
  
}