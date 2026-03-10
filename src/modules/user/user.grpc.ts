import { Inject, Injectable, OnModuleInit } from "@nestjs/common";
import { ClientGrpc } from "@nestjs/microservices";
import { InjectGrpcClient } from "kovryzhko-clinic-common/dist/grpc/decorators/inject-grpc-client.decorator";
import { GetMeRequest, UserPatchRequest, UserServiceClient } from 'kovryzhko-clinic-contracts/gen/user'
import { lastValueFrom } from "rxjs";
import { AbstractGrpcClient } from 'kovryzhko-clinic-common/dist/grpc/abstarct-grpc.client'

@Injectable()
export class UserClientGrpc extends AbstractGrpcClient<UserServiceClient> {
    constructor(@InjectGrpcClient('USER_PACKAGE') client: ClientGrpc) {
        super(client, 'UserService')
    }
}