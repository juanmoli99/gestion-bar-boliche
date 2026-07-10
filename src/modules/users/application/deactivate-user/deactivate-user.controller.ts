import {
  Controller,
  Param,
  ParseUUIDPipe,
  Patch,
} from '@nestjs/common';
import { DeactivateUserResponseDto } from './dto/deactivate-user.response.dto';
import { DeactivateUserUseCase } from './deactivate-user.use-case';

@Controller('users')
export class DeactivateUserController {
  constructor(
    private readonly deactivateUserUseCase: DeactivateUserUseCase,
  ) {}

  @Patch(':id/deactivate')
  async deactivate(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<DeactivateUserResponseDto> {
    return this.deactivateUserUseCase.execute(id);
  }
}