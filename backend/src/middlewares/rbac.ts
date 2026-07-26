import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from './auth';
import { UserRoleEnum } from '@prisma/client';

export function authorizeRoles(...allowedRoles: UserRoleEnum[]) {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Unauthorized: User authentication required' });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        error: `Forbidden: Access restricted. Requires one of roles: [${allowedRoles.join(', ')}]`,
      });
    }

    next();
  };
}
