import { NestFactory } from '@nestjs/core';
import { AppModule } from './core/app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GrpcExceptionFilter } from './shared/filters/grpc-exception.filter';
import * as cookieParser from 'cookie-parser'
import { swaggerSetup } from './config/swagger.config';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const configService = app.get(ConfigService)

    const logger = new Logger()

    swaggerSetup(app)

    app.use(cookieParser(configService.getOrThrow('COOKIES_SECRET')))

    app.useGlobalPipes(new ValidationPipe({
        transform: true,
        whitelist: true
    }))

    app.useGlobalFilters(new GrpcExceptionFilter())

    app.enableCors({
        // TODO: real cors
        credentials: true
    })

    const port = configService.getOrThrow('PORT')
    const host = configService.getOrThrow('HOST')

    await app.listen(port);

    logger.log(`gateway init on ${port} port`)
}
bootstrap();
