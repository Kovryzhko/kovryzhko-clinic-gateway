import { BadRequestException, Body, Controller, Get, Patch } from '@nestjs/common';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { Protected } from 'src/shared/decorators/protected.decorator';
import { CurrentUser } from 'src/shared/decorators/current-user.decorator';
import { UserClientGrpc } from './user.grpc';
import { UpdateUserDto } from './dto/requests/update-user.request';
import { NotEmptyBody } from 'src/shared/decorators/not-empty-body.decorator';
import path from 'path';
import { instanceToPlain } from 'class-transformer';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserClientGrpc) { }

  @ApiBearerAuth()
  @Protected()
  @Get()
  private async getMe(@CurrentUser() userId: string) {
    return await this.userService.call("getMe", { id: userId })
  }

  @ApiBody({ type: UpdateUserDto })
  @ApiBearerAuth()
  @Protected()
  @Patch()
  private async update(@NotEmptyBody() body: UpdateUserDto, @CurrentUser() userId: string) {
    const patch = { ...body, id: userId }
    return await this.userService.call('changeSettings', patch)
  }

}
