import { Injectable } from '@nestjs/common';

import { RolUsuario } from '../../../../generated/prisma/enums';

import { ListStockUseCase } from './list-stock.use-case';
import { ListStockResponseDto } from './dto/list-stock.response.dto';

@Injectable()
export class ListStockService {
  constructor(
    private readonly listStockUseCase: ListStockUseCase,
  ) {}

  async execute(
    rol: RolUsuario,
  ): Promise<ListStockResponseDto[]> {
    return this.listStockUseCase.execute(rol);
  }
}