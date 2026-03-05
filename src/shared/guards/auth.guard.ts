import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Request } from "express";
import * as jwt from 'jsonwebtoken'

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private readonly configService: ConfigService) { }
    public canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest()

        const token = this.extractToken(request)

        const result = jwt.verify(token, this.configService.getOrThrow('JWT_SECRET'))

        if (typeof result !== 'object' || typeof result === 'string') throw new UnauthorizedException()
        if (!result.userId) throw new UnauthorizedException()

        request.user = {
            id: result.userId
        }
        
        return true
    }

    private extractToken(request: Request) {
        const header = request.headers.authorization

        if (!header) throw new UnauthorizedException()

        if (!header.startsWith('Bearer ')) throw new UnauthorizedException()

        const token = header.replace(/^Bearer\s+/i, '').trim()

        if (!token) throw new UnauthorizedException()

        return token
    }
}