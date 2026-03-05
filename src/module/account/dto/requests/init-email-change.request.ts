import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

export class InitEmailChangeRequest {
    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    email: string
}