import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common';
import { FindUserByIdUseCase } from './find-user-by-id.use-case';
import { FindUserByIdResponseDto } from './dto/find-user-by-id.response.dto';

@Controller('users')
export class FindUserByIdController {
  constructor(
    private readonly findUserByIdUseCase: FindUserByIdUseCase,
  ) {}

  @Get(':id')
  async findById(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<FindUserByIdResponseDto> {
    return this.findUserByIdUseCase.execute(id);
  }
}