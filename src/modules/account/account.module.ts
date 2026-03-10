import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { PROTO_PATHS } from 'kovryzhko-clinic-contracts/dist/proto/paths'
import { AccountClientGrpc } from './account.grpc';
import { AccountController } from './account.controller';
import { GrpcModule } from 'kovryzhko-clinic-common/dist/grpc/grpc.module';

@Module({
    imports: [GrpcModule.register(['ACCOUNT_PACKAGE'])],
    controllers: [AccountController],
    providers: [AccountClientGrpc],
    exports: [AccountClientGrpc]
})
export class AccountModule { }
