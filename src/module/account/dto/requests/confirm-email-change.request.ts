import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsNumberString, Length } from "class-validator";

export class ConfirmEmailChangeRequest {
    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    email: string

    @ApiProperty()
    @IsNotEmpty()
    @IsNumberString()
    @Length(6, 6)
    code: string 
}