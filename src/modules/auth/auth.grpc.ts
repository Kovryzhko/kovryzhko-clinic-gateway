import { Injectable } from "@nestjs/common";
import { ClientGrpc } from "@nestjs/microservices";
import { InjectGrpcClient } from 'kovryzhko-clinic-common/dist/grpc/decorators/inject-grpc-client.decorator'
import { AuthServiceClient } from 'kovryzhko-clinic-contracts/gen/auth'
import { AbstractGrpcClient } from 'kovryzhko-clinic-common/dist/grpc/abstarct-grpc.client'

@Injectable()
export class AuthClientGrpc extends AbstractGrpcClient<AuthServiceClient> {
    constructor(@InjectGrpcClient('AUTH_PACKAGE') client: ClientGrpc) {
        super(client, 'AuthService')
    }
}