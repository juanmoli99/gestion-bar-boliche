import {
  Injectable,
} from '@nestjs/common';

import {
  PrismaService,
} from '../../../../core/database/prisma.service';

import {
  GetPizzaProductionConfigurationResponseDto,
} from './dto/get-pizza-production-configuration.response.dto';

const pizzaProductionConfigurationSelect = {
  id: true,
  itemPizzaElaboradaId: true,
  itemPizzaSinTaccId: true,
  creadoEn: true,
  actualizadoEn: true,

  itemPizzaElaborada: {
    select: {
      id: true,
      nombre: true,
    },
  },

  itemPizzaSinTacc: {
    select: {
      id: true,
      nombre: true,
    },
  },
} as const;

@Injectable()
export class GetPizzaProductionConfigurationService {
  constructor(
    private readonly prisma:
      PrismaService,
  ) {}

  async execute(): Promise<GetPizzaProductionConfigurationResponseDto> {
    return this.prisma.configuracionProduccionPizza.upsert({
      where: {
        id: 1,
      },

      update: {},

      create: {
        id: 1,
      },

      select:
        pizzaProductionConfigurationSelect,
    });
  }
}