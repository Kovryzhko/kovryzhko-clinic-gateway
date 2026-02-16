import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsNumberString, IsString, Length, Validate } from "class-validator";
import { IdentifierValidator } from "src/shared/validators/identifier.validator";

export class VerifyOtpRequest {
    @ApiProperty({ example: 'email.@mail.ru' })
    @IsString()
    @Validate(IdentifierValidator)
    identifier: string

    @ApiProperty({ enum: ['phone', 'email'] })
    @IsEnum(['phone', 'email'])
    type: 'phone' | 'email'

    @ApiProperty({ example: '123456' })
    @Length(6, 6)
    @IsNumberString()
    @IsNotEmpty()
    code: string
}