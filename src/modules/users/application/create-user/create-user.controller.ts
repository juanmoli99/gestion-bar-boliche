import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserService } from './create-user.service';
import { CreateUserRequestDto } from './dto/create-user.request.dto';
import { CreateUserResponseDto } from './dto/create-user.response.dto';

@Controller('users')
export class CreateUserController {
  constructor(
    private readonly createUserService: CreateUserService,
  ) {}

  @Post()
  async create(
    @Body() request: CreateUserRequestDto,
  ): Promise<CreateUserResponseDto> {
    return this.createUserService.execute(request);
  }
}