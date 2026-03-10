import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class TelegramVerifyRequest {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    authResult: string;
}
