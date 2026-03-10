import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from '../modules/auth/auth.module';
import { AccountModule } from 'src/modules/account/account.module';
import { UserModule } from 'src/modules/user/user.module';

@Module({
    imports: [ConfigModule.forRoot({
        isGlobal: true
    }),
        AuthModule,
        AccountModule,
        UserModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule { }
