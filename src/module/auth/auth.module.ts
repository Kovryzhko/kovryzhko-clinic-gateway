import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { AuthClientGrpc } from './auth.grpc';
import { PROTO_PATHS } from 'kovryzhko-clinic-contracts/dist/proto/paths'

@Module({
    imports: [ClientsModule.registerAsync([
        {
            name: "AUTH_PACKAGE",
            useFactory: (configService: ConfigService) => ({
                transport: Transport.GRPC,
                options: {
                    package: ['auth.v1'],
                    protoPath: PROTO_PATHS.AUTH,
                    url: configService.getOrThrow<string>('AUTH_GRPC_URL'),
                }
            }),
            inject: [ConfigService]
        }
    ])],
    controllers: [AuthController],
    providers: [AuthClientGrpc],
})
export class AuthModule { }
