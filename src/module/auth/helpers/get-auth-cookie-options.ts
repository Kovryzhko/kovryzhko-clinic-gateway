import { ConfigService } from "@nestjs/config";
import { CookieOptions } from "express";
import { REFRESH_TOKEN_EXPIRES } from "src/shared/consts/refresh-token.const";
import { NodeEnv } from "src/shared/enums/node-env.enum";

export function getAuthRefreshTokenCookieOptions(configService: ConfigService): CookieOptions {
    const secure = configService.getOrThrow('NODE_ENV') === NodeEnv.PROD ? true : false

    const options: CookieOptions = {
        httpOnly: true,
        secure: secure,
        domain: configService.getOrThrow("COOKIES_DOMAIN"),
        sameSite: 'lax',
        maxAge: REFRESH_TOKEN_EXPIRES
    }

    return options
}