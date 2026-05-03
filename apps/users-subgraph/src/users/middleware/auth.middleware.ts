import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { auth } from '../../lib/auth';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  async use(req: Request & { userId?: string }, res: Response, next: NextFunction) {
    try {
      // Better Auth validates the session cookie and attaches session data
      const session = await auth.api.getSession({ headers: req.headers as any });
      if (session?.user?.id) {
        // Inject userId so GraphQL context can pick it up
        req.userId = session.user.id;
      }
    } catch {
      // Not authenticated — resolver will handle null cases
    }
    next();
  }
}
