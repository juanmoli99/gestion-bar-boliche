import {
  Body,
  Controller,
  Param,
  ParseUUIDPipe,
  Patch,
} from '@nestjs/common';
import { UpdateUserRequestDto } from './dto/update-user.request.dto';
import { UpdateUserResponseDto } from './dto/update-user.response.dto';
import { UpdateUserUseCase } from './update-user.use-case';

@Controller('users')
export class UpdateUserController {
  constructor(
    private readonly updateUserUseCase: UpdateUserUseCase,
  ) {}

  @Patch(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() request: UpdateUserRequestDto,
  ): Promise<UpdateUserResponseDto> {
    return this.updateUserUseCase.execute(id, request);
  }
}