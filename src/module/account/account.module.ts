import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { PROTO_PATHS } from 'kovryzhko-clinic-contracts/dist/proto/paths'
import { AccountClientGrpc } from './account.grpc';
import { AccountController } from './account.controller';

@Module({
    imports: [ClientsModule.registerAsync([
        {
            name: "ACCOUNT_PACKAGE",
            useFactory: (configService: ConfigService) => ({
                transport: Transport.GRPC,
                options: {
                    package: ['account.v1'],
                    protoPath: PROTO_PATHS.ACCOUNT,
                    url: configService.getOrThrow<string>('AUTH_GRPC_URL'),
                }
            }),
            inject: [ConfigService]
        }
    ])],
    controllers: [AccountController],
    providers: [AccountClientGrpc],
    exports: [AccountClientGrpc]
})
export class AccountModule { }
