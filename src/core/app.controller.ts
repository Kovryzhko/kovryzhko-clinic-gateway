import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { HealthResponse } from './dto/responses/health.response';
import { AppService } from './app.service';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) { }

    @ApiOperation({
        summary: 'Health check'
    })
    @ApiOkResponse({
        type: HealthResponse
    })
    @Get('/health')
    private getHealth() {
        return this.appService.getHealth()
    }
}
