import { AuthGuard } from '@nestjs/passport';

export class Oauth2Guard extends AuthGuard('jwt') {}
