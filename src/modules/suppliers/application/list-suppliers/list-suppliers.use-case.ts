import { Injectable } from '@nestjs/common';

import { ListSuppliersRepository } from './list-suppliers.repository';
import { ListSuppliersResponseDto } from './dto/list-suppliers.response.dto';

@Injectable()
export class ListSuppliersUseCase {
  constructor(
    private readonly repository: ListSuppliersRepository,
  ) {}

  async execute(): Promise<ListSuppliersResponseDto[]> {
    return this.repository.findAll();
  }
}