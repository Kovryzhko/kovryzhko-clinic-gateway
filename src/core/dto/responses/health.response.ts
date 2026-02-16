import { ApiProperty } from "@nestjs/swagger"

export class HealthResponse {
    @ApiProperty({
        example: 'ok'
    })
    public status: string

    @ApiProperty({
        example: '2026-01-24T12:53:54.321Z'
    })
    public timestamp: string
}