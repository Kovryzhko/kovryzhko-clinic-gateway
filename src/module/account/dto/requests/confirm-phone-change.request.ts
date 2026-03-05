import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumberString, Length, Matches } from "class-validator";

export class ConfirmPhoneChangeRequest {
    @ApiProperty()
    @IsNotEmpty()
    @Matches(/^\+?\d{10,15}$/)
    phone: string

    @ApiProperty()
    @IsNotEmpty()
    @IsNumberString()
    @Length(6, 6)
    code: string
}