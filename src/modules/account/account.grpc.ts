import { Injectable, OnModuleInit } from "@nestjs/common";
import { ClientGrpc } from "@nestjs/microservices";
import { InjectGrpcClient } from "kovryzhko-clinic-common/dist/grpc/decorators/inject-grpc-client.decorator";
import { AccountServiceClient } from "kovryzhko-clinic-contracts/gen/account";
import { AbstractGrpcClient } from 'kovryzhko-clinic-common/dist/grpc/abstarct-grpc.client'

@Injectable()
export class AccountClientGrpc extends AbstractGrpcClient<AccountServiceClient> {
    constructor(@InjectGrpcClient('ACCOUNT_PACKAGE') client: ClientGrpc) {
        super(client, 'AccountService')
    }
}