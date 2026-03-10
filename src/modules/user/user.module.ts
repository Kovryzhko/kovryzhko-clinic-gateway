import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { PROTO_PATHS } from 'kovryzhko-clinic-contracts';
import { UserClientGrpc } from './user.grpc';
import { GrpcModule } from 'kovryzhko-clinic-common/dist/grpc/grpc.module';

@Module({
  imports: [GrpcModule.register(['USER_PACKAGE'])],
  controllers: [UserController],
  providers: [UserClientGrpc],
})
export class UserModule { }
