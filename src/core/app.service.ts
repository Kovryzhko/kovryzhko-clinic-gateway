import { Injectable } from '@nestjs/common';


@Injectable()
export class AppService {
    public getHealth() {
        const response = { status: 'ok', timestamp: new Date().toISOString() }
        return response
    }
}
