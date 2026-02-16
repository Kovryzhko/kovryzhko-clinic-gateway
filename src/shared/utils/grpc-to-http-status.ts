import { HttpStatus } from "@nestjs/common";
import { RpcStatus } from 'kovryzhko-clinic-common/dist/rpc-status.enum'

export const grpcToHttpStatus = {
    [RpcStatus.OK]: HttpStatus.OK,
    [RpcStatus.CANCEL]: 499,
    [RpcStatus.UNKNOWN]: HttpStatus.INTERNAL_SERVER_ERROR,
    [RpcStatus.INVALID_ARGUMENT]: HttpStatus.BAD_REQUEST,
    [RpcStatus.DEADLINE_EXCEEDE]: HttpStatus.GATEWAY_TIMEOUT,
    [RpcStatus.NOT_FOUND]: HttpStatus.NOT_FOUND,
    [RpcStatus.ALREADY_EXISTS]: HttpStatus.CONFLICT,
    [RpcStatus.PERMISSION_DENIED]: HttpStatus.FORBIDDEN,
    [RpcStatus.RESOURSE_EXHAUSTED]: HttpStatus.TOO_MANY_REQUESTS,
    [RpcStatus.FAILED_PRECONDITION]: HttpStatus.BAD_REQUEST,
    [RpcStatus.ABORTED]: HttpStatus.CONFLICT,
    [RpcStatus.OUT_OF_RANGE]: HttpStatus.BAD_REQUEST,
    [RpcStatus.UNIMPLEMENTED]: HttpStatus.NOT_IMPLEMENTED,
    [RpcStatus.INTERNAL]: HttpStatus.INTERNAL_SERVER_ERROR,
    [RpcStatus.UNAVAILABLE]: HttpStatus.SERVICE_UNAVAILABLE,
    [RpcStatus.DATA_LOSS]: HttpStatus.INTERNAL_SERVER_ERROR,
    [RpcStatus.UNAUTHENTICATED]: HttpStatus.UNAUTHORIZED
}