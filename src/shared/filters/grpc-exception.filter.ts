import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from "@nestjs/common";
import { grpcToHttpStatus } from "../utils/grpc-to-http-status";

@Catch()
export class GrpcExceptionFilter implements ExceptionFilter {
    public catch(exception: any, host: ArgumentsHost) {
        const response = host.switchToHttp().getResponse()

        if (this.isGrpcError(exception)) {
            const status = grpcToHttpStatus[exception.code] || 500

            return response.status(status).json({
                statusCode: status,
                message: exception.details
            })
        }

        if (exception instanceof HttpException) {
            const status = exception.getStatus()

            return response.status(status).json({
                statusCode: status,
                message: exception.message
            })
        }

        return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            statusCode: 500,
            message: 'Internal server error'
        })
    }

    private isGrpcError(exception: unknown) {
        if (!exception || typeof exception !== 'object') return false
        return 'code' in exception && 'details' in exception
    }
}