import { CanActivate, ExecutionContext, ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { lastValueFrom, Observable } from "rxjs";
import { AccountClientGrpc } from "src/module/account/account.grpc";
import { ROLES_KEY } from "../decorators/roles.decorator";
import { Role } from "kovryzhko-clinic-contracts/gen/account";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(
        private readonly reflector: Reflector,
        private readonly accountClient: AccountClientGrpc,
    ) {

    }
    public async canActivate(context: ExecutionContext): Promise<boolean> {
        const required = this.reflector.getAllAndOverride<Role[]>(
            ROLES_KEY,
            [context.getHandler(), context.getClass()]
        )

        if (!required || required.length === 0) return true

        const request = context.switchToHttp().getRequest()

        const user = request.user

        if (!user) throw new ForbiddenException('User missing')

        const account = await lastValueFrom(
            this.accountClient.getAccount({ id: user.id })
        )

        if (!account) throw new NotFoundException('Account not found')

        if (!required.includes(account.role)) throw new ForbiddenException('Invalid permission')

        return true
    }
}