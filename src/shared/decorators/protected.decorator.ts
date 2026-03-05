import { applyDecorators, UseGuards } from "@nestjs/common";
import { AuthGuard } from "../guards/auth.guard";
import { Role } from "kovryzhko-clinic-contracts/gen/account";
import { Roles } from "./roles.decorator";
import { RolesGuard } from "../guards/roles.guard";

export const Protected = (...roles: Role[]) => {
    if (roles.length === 0) return applyDecorators(UseGuards(AuthGuard))

    return applyDecorators(Roles(...roles), UseGuards(AuthGuard, RolesGuard))
}
