import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { SendOtpRequest } from './dto/requests/send-otp.request';
import { AuthClientGrpc } from './auth.grpc';
import { VerifyOtpRequest } from './dto/requests/verify-otp.request';
import { lastValueFrom } from 'rxjs';
import { Response } from 'express';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';
import { getAuthRefreshTokenCookieOptions } from './helpers/get-auth-cookie-options';
import { TelegramVerifyRequest } from './dto/requests/telegram-verify.request';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly client: AuthClientGrpc,
        private readonly configService: ConfigService
    ) { }

    @Post('otp/send')
    private async sendOtp(@Body() data: SendOtpRequest) {
        return this.client.sendOtp(data)
    }

    @Post('otp/verify')
    private async verifyOtp(@Body() data: VerifyOtpRequest, @Res({ passthrough: true }) res: Response) {
        const { accessToken, refreshToken } = await lastValueFrom(this.client.verifyOtp(data))

        res.cookie('refreshToken', refreshToken, getAuthRefreshTokenCookieOptions(this.configService))

        return { accessToken }
    }

    @Post('refresh')
    private async refresh(
        @Req() req: Request,
        @Res({ passthrough: true }) res: Response
    ) {
        const token = req.cookies?.refreshToken

        const { accessToken, refreshToken } = await lastValueFrom(this.client.refresh({ refreshToken: token }))

        res.cookie('refreshToken', refreshToken, getAuthRefreshTokenCookieOptions(this.configService))

        return { accessToken }
    }

    @Post('logout')
    private async logout(@Res({ passthrough: true }) res: Response) {
        res.cookie(
            'refreshToken',
            '',
            { ...getAuthRefreshTokenCookieOptions(this.configService), expires: new Date(0), }
        )

        return { ok: true }
    }

    @Get('telegram')
    private async telegramInit() {
        return this.client.telegramInit()
    }

    @Post('telegram/verify')
    private async telegramVerify(@Body() data: TelegramVerifyRequest, @Res({ passthrough: true }) res: Response) {
        const query = await JSON.parse(atob(data.authResult))

        const result = await lastValueFrom(this.client.telegramVerify({ data: query }))

        const { accessToken, refreshToken } = result

        res.cookie('refreshToken', refreshToken, getAuthRefreshTokenCookieOptions(this.configService))
        
        return { accessToken }
    }
}
