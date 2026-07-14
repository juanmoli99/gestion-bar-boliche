import { Injectable } from '@nestjs/common';

import { ListFormulasRepository } from './list-formulas.repository';
import { ListFormulasResponseDto } from './dto/list-formulas.response.dto';

@Injectable()
export class ListFormulasUseCase {
  constructor(
    private readonly repository: ListFormulasRepository,
  ) {}

  async execute(): Promise<ListFormulasResponseDto[]> {
    const formulas =
      await this.repository.findAll();

    return formulas.map((formula) => ({
      id: formula.id,
      nombre: formula.nombre,
      descripcion: formula.descripcion,
      activa: formula.activa,
      versionActiva:
        formula.versiones[0]?.numeroVersion ?? 0,
      cantidadItems:
        formula.versiones[0]?._count.items ?? 0,
      creadoEn: formula.creadoEn,
      actualizadoEn: formula.actualizadoEn,
    }));
  }
}