import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, Length, ValidateIf } from "class-validator";

export class UpdateUserDto {
    @ApiProperty()
    @ValidateIf(o => o.name !== undefined)
    @IsString()
    @IsNotEmpty()
    @Length(3, 15)
    name?: string
}