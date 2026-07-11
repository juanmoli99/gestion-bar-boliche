import { Injectable } from '@nestjs/common';

import { ListUnitsRepository } from './list-units.repository';
import { ListUnitsResponseDto } from './dto/list-units.response.dto';

@Injectable()
export class ListUnitsUseCase {
  constructor(
    private readonly repository: ListUnitsRepository,
  ) {}

  async execute(): Promise<ListUnitsResponseDto[]> {
    return this.repository.findAll();
  }
}