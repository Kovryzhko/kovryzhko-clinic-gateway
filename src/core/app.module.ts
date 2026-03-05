import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from '../module/auth/auth.module';
import { AccountModule } from 'src/module/account/account.module';

@Module({
    imports: [ConfigModule.forRoot({
        isGlobal: true
    }), AuthModule, AccountModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule { }
