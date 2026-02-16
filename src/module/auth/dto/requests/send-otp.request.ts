import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsString, Validate } from "class-validator";
import { IdentifierValidator } from "src/shared/validators/identifier.validator";

export class SendOtpRequest {
    @ApiProperty({ example: 'email.@mail.ru' })
    @IsString()
    @Validate(IdentifierValidator)
    identifier: string

    @IsEnum(['phone', 'email'])
    @ApiProperty({ enum: ['phone', 'email'] })
    type: 'phone' | 'email'
}