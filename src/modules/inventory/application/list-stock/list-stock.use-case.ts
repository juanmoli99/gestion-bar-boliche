import { Injectable } from '@nestjs/common';

import { RolUsuario } from '../../../../generated/prisma/enums';
import { getAllowedInventory } from '../../../../shared/constants/inventory-role-policy';

import { ListStockRepository } from './list-stock.repository';
import { ListStockResponseDto } from './dto/list-stock.response.dto';

@Injectable()
export class ListStockUseCase {
  constructor(
    private readonly repository: ListStockRepository,
  ) {}

  async execute(
    rol: RolUsuario,
  ): Promise<ListStockResponseDto[]> {
    const inventario = getAllowedInventory(rol);

    const stocks = await this.repository.findAll(inventario);

    return stocks.map((stock) => ({
      id: stock.id,
      itemId: stock.itemId,
      itemNombre: stock.item.nombre,
      categoriaNombre: stock.item.categoria.nombre,
      unidadMedida: stock.item.unidadMedida.nombre,
      abreviaturaUnidad: stock.item.unidadMedida.abreviatura,
      inventario: stock.inventario,
      cantidadActual: stock.cantidadActual,
      cantidadMinima: stock.cantidadMinima,
      creadoEn: stock.creadoEn,
      actualizadoEn: stock.actualizadoEn,
    }));
  }
}