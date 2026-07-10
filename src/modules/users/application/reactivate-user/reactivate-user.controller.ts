import {
  Controller,
  Param,
  ParseUUIDPipe,
  Patch,
} from '@nestjs/common';
import { ReactivateUserResponseDto } from './dto/reactivate-user.response.dto';
import { ReactivateUserUseCase } from './reactivate-user.use-case';

@Controller('users')
export class ReactivateUserController {
  constructor(
    private readonly reactivateUserUseCase: ReactivateUserUseCase,
  ) {}

  @Patch(':id/reactivate')
  async reactivate(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<ReactivateUserResponseDto> {
    return this.reactivateUserUseCase.execute(id);
  }
}