import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { GetFormulaRepository } from './get-formula.repository';

@Injectable()
export class GetFormulaUseCase {
  constructor(
    private readonly repository: GetFormulaRepository,
  ) {}

  async execute(id: string) {
    const formula =
      await this.repository.findById(id);

    if (!formula) {
      throw new NotFoundException(
        'La fórmula no existe.',
      );
    }

    const version =
      formula.versiones[0];

    return {
      id: formula.id,
      nombre: formula.nombre,
      descripcion: formula.descripcion,
      activa: formula.activa,
      versionId: version.id,
      numeroVersion: version.numeroVersion,
      items: version.items.map((item) => ({
        id: item.id,
        itemId: item.itemId,
        nombre: item.item.nombre,
        cantidadPorPersona:
          item.cantidadPorPersona,
      })),
    };
  }
}