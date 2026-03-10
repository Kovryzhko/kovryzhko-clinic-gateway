import { createParamDecorator, ExecutionContext, BadRequestException } from '@nestjs/common';

const factory = (_, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const body = request.body;

    if (!body || Object.keys(body).length === 0) throw new BadRequestException('Body cannot be empty');

    return body;
}

export const NotEmptyBody = createParamDecorator(factory);