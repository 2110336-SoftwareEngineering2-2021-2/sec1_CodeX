import { SetMetadata } from '@nestjs/common';

export const Roles = (...roles: String[]) => SetMetadata('roles', roles);
