import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../../../core/database/prisma.service';

import { UpdateValuesRequestDto } from './dto/update-values.request.dto';

@Injectable()
export class UpdateValuesService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async execute(
    request: UpdateValuesRequestDto,
  ) {
    return this.prisma.valores.upsert({
      where: { id: 1 },
      update: {
        pizzaLibreGeneral:
          request.pizzaLibreGeneral,
        pizzaLibreViernes:
          request.pizzaLibreViernes,
        pizzaLibreSabado:
          request.pizzaLibreSabado,
        menuSinTacc:
          request.menuSinTacc,
      },
      create: {
        id: 1,
        pizzaLibreGeneral:
          request.pizzaLibreGeneral,
        pizzaLibreViernes:
          request.pizzaLibreViernes,
        pizzaLibreSabado:
          request.pizzaLibreSabado,
        menuSinTacc:
          request.menuSinTacc,
      },
    });
  }
}