import { Inject, Injectable, OnModuleInit } from "@nestjs/common";
import { ClientGrpc } from "@nestjs/microservices";

import { AuthServiceClient, RefreshRequest, SendOtpRequest, TelegramVerifyRequest, VerifyOtpRequest } from 'kovryzhko-clinic-contracts/gen/auth'

@Injectable()
export class AuthClientGrpc implements OnModuleInit {
    private authService: AuthServiceClient

    constructor(@Inject('AUTH_PACKAGE') private readonly client: ClientGrpc) { }

    public onModuleInit() {
        this.authService = this.client.getService<AuthServiceClient>("AuthService")
    }

    public sendOtp(request: SendOtpRequest) {
        return this.authService.sendOtp(request)
    }

    public verifyOtp(request: VerifyOtpRequest) {
        return this.authService.verifyOtp(request)
    }

    public refresh(request: RefreshRequest) {
        return this.authService.refresh(request)
    }

    public telegramInit() {
        return this.authService.telegramInit({})
    }

    public telegramVerify(query: TelegramVerifyRequest) {
        return this.authService.telegramVerify(query)
    }
}