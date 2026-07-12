import { Injectable } from '@nestjs/common';

import { ListSuppliersUseCase } from './list-suppliers.use-case';
import { ListSuppliersResponseDto } from './dto/list-suppliers.response.dto';

@Injectable()
export class ListSuppliersService {
  constructor(
    private readonly listSuppliersUseCase: ListSuppliersUseCase,
  ) {}

  async execute(): Promise<ListSuppliersResponseDto[]> {
    return this.listSuppliersUseCase.execute();
  }
}