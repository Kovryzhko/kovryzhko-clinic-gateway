import { Post, Body } from "@nestjs/common";
import { AccountClientGrpc } from "./account.grpc";
import { Controller } from "@nestjs/common";
import { Protected } from "src/shared/decorators/protected.decorator";
import { CurrentUser } from "src/shared/decorators/current-user.decorator";
import { InitEmailChangeRequest } from "./dto/requests/init-email-change.request";
import { ConfirmEmailChangeRequest } from "./dto/requests/confirm-email-change.request";
import { ApiBearerAuth } from "@nestjs/swagger";
import { InitPhoneChangeRequest } from "./dto/requests/init-phone-change.request";
import { ConfirmPhoneChangeRequest } from "./dto/requests/confirm-phone-change.request";

@Controller('account')
export class AccountController {
    constructor(
        private readonly client: AccountClientGrpc,
    ) { }

    @ApiBearerAuth()
    @Protected()
    @Post('email/init')
    private async initEmailChange(@Body() data: InitEmailChangeRequest, @CurrentUser() userId: string) {
        return this.client.initEmailChange({ ...data, userId })
    }

    @ApiBearerAuth()
    @Protected()
    @Post('email/confirm')
    private async confirmEmailChange(@Body() data: ConfirmEmailChangeRequest, @CurrentUser() userId: string) {
        return this.client.confirmEmailChange({ ...data, userId })
    }

    @ApiBearerAuth()
    @Protected()
    @Post('phone/init')
    private async initPhoneChange(@Body() data: InitPhoneChangeRequest, @CurrentUser() userId: string) {
        return this.client.initPhoneChange({ ...data, userId })
    }

    @ApiBearerAuth()
    @Protected()
    @Post('phone/confirm')
    private async confirmPhoneChange(@Body() data: ConfirmPhoneChangeRequest, @CurrentUser() userId: string) {
        return this.client.confirmPhoneChange({ ...data, userId })
    }
}