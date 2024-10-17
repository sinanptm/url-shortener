import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private jwtService: JwtService){}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const req = context.switchToHttp().getRequest();
        const authorization = req.headers.authorization;        

        const token = authorization.split(' ')[1];

        if(!token){
            throw new UnauthorizedException();
        }

        try {
           const tokenPayload = await this.jwtService.verifyAsync(token);
           req.user = tokenPayload;
        } catch (error) {
            throw new UnauthorizedException()
        }

        return true;
    }
}