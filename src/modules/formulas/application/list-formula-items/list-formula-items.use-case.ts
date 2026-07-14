import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { ListFormulaItemsRepository } from './list-formula-items.repository';
import { ListFormulaItemsResponseDto } from './dto/list-formula-items.response.dto';

@Injectable()
export class ListFormulaItemsUseCase {
  constructor(
    private readonly repository: ListFormulaItemsRepository,
  ) {}

  async execute(
    formulaId: string,
  ): Promise<ListFormulaItemsResponseDto[]> {
    const version =
      await this.repository.findActiveVersion(formulaId);

    if (!version) {
      throw new NotFoundException(
        'La fórmula no existe o no tiene una versión activa.',
      );
    }

    const detalles =
      await this.repository.findAll(version.id);

    return detalles.map((detalle) => ({
      id: detalle.id,
      itemId: detalle.itemId,
      nombreItem: detalle.item.nombre,
      unidadMedida:
        detalle.item.unidadMedida.nombre,
      abreviaturaUnidad:
        detalle.item.unidadMedida.abreviatura,
      cantidadPorPersona:
        detalle.cantidadPorPersona,
      unidadesPorPack:
        detalle.item.unidadesPorPack,
      activo: detalle.activo,
      creadoEn: detalle.creadoEn,
      actualizadoEn: detalle.actualizadoEn,
    }));
  }
}