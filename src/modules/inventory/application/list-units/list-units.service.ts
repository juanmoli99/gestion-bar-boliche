import { Injectable } from '@nestjs/common';

import { ListUnitsUseCase } from './list-units.use-case';
import { ListUnitsResponseDto } from './dto/list-units.response.dto';

@Injectable()
export class ListUnitsService {
  constructor(
    private readonly listUnitsUseCase: ListUnitsUseCase,
  ) {}

  async execute(): Promise<ListUnitsResponseDto[]> {
    return this.listUnitsUseCase.execute();
  }
}