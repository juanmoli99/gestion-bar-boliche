import {
  BadRequestException,
  Injectable,
} from '@nestjs/common';

import { PurchaseCalculationEngine } from '../../domain/purchase-calculation.engine';

import { CalculateShoppingListRepository } from './calculate-shopping-list.repository';
import { CalculateShoppingListRequestDto } from './dto/calculate-shopping-list.request.dto';
import {
  CalculateShoppingListResponseDto,
  ShoppingListItemResponseDto,
} from './dto/calculate-shopping-list.response.dto';

@Injectable()
export class CalculateShoppingListUseCase {
  constructor(
    private readonly engine: PurchaseCalculationEngine,
    private readonly repository: CalculateShoppingListRepository,
  ) {}

  async execute(
    request: CalculateShoppingListRequestDto,
  ): Promise<CalculateShoppingListResponseDto> {
    const fechaDesde = new Date(
      `${request.fechaDesde}T00:00:00.000`,
    );

    const fechaHasta = new Date(
      `${request.fechaHasta}T23:59:59.999`,
    );

    if (fechaDesde > fechaHasta) {
      throw new BadRequestException(
        'La fecha desde no puede ser posterior a la fecha hasta.',
      );
    }

    const calculation = await this.engine.execute(
      fechaDesde,
      fechaHasta,
    );

    const itemIds = calculation.totalesPorItem.map(
      (item) => item.itemId,
    );

    const items =
      itemIds.length > 0
        ? await this.repository.findItemsWithStock(itemIds)
        : [];

    const itemMap = new Map(
      items.map((item) => [item.id, item]),
    );

    const listaCompra: ShoppingListItemResponseDto[] =
      calculation.totalesPorItem.map((totalItem) => {
        const item = itemMap.get(totalItem.itemId);

        const cantidadNecesaria = this.round(
          totalItem.cantidadNecesaria,
        );

        if (!item) {
          return {
            itemId: totalItem.itemId,
            nombreItem: totalItem.nombreItem,
            unidadMedida: 'Sin unidad',
            abreviaturaUnidad: '',
            unidadesPorPack: null,
            cantidadNecesaria,
            stockDisponible: 0,
            cantidadComprar: cantidadNecesaria,
            packsComprar: null,
          };
        }

        const stockCorrespondiente = item.stocks.find(
          (stock) =>
            stock.inventario === item.categoria.inventario,
        );

        const stockDisponible = stockCorrespondiente
          ? Number(stockCorrespondiente.cantidadActual)
          : 0;

        const faltante = Math.max(
          0,
          cantidadNecesaria - stockDisponible,
        );

        const cantidadComprar =
          item.unidadMedida.permiteDecimal
            ? this.round(faltante)
            : Math.ceil(faltante);

        const packsComprar =
          item.unidadesPorPack && cantidadComprar > 0
            ? Math.ceil(
                cantidadComprar /
                  item.unidadesPorPack,
              )
            : null;

        return {
          itemId: item.id,
          nombreItem: item.nombre,
          unidadMedida:
            item.unidadMedida.nombre,
          abreviaturaUnidad:
            item.unidadMedida.abreviatura,
          unidadesPorPack:
            item.unidadesPorPack,
          cantidadNecesaria,
          stockDisponible:
            this.round(stockDisponible),
          cantidadComprar,
          packsComprar,
        };
      });

    return {
      fechaDesde: request.fechaDesde,
      fechaHasta: request.fechaHasta,
      cantidadFiestas:
        calculation.cantidadFiestas,
      cantidadPersonas:
        calculation.cantidadPersonasTotal,
      itemsComprar: listaCompra.filter(
        (item) => item.cantidadComprar > 0,
      ).length,
      listaCompra,
      desglosePorFecha:
        calculation.desglosePorFecha.map(
          (fecha) => ({
            fecha: fecha.fecha,
            cantidadFiestas:
              fecha.cantidadFiestas,
            cantidadPersonas:
              fecha.cantidadPersonas,
            items: fecha.items.map((item) => ({
              itemId: item.itemId,
              nombreItem: item.nombreItem,
              cantidadNecesaria: this.round(
                item.cantidadNecesaria,
              ),
            })),
          }),
        ),
    };
  }

  private round(value: number): number {
    return Number(value.toFixed(3));
  }
}