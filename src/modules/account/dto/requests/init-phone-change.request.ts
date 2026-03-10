import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, Matches } from "class-validator";

export class InitPhoneChangeRequest {
    @ApiProperty()
    @IsNotEmpty()
    @Matches(/^\+?\d{10,15}$/)
    phone: string
}