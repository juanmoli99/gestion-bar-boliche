import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import {
  PrismaService,
} from '../../../../core/database/prisma.service';

import {
  TipoInventario,
} from '../../../../generated/prisma/enums';

import {
  UpdatePizzaProductionConfigurationRequestDto,
} from './dto/update-pizza-production-configuration.request.dto';

import {
  UpdatePizzaProductionConfigurationResponseDto,
} from './dto/update-pizza-production-configuration.response.dto';

const pizzaProductionConfigurationSelect = {
  id: true,
  itemPizzaElaboradaId: true,
  creadoEn: true,
  actualizadoEn: true,

  itemPizzaElaborada: {
    select: {
      id: true,
      nombre: true,
    },
  },
} as const;

@Injectable()
export class UpdatePizzaProductionConfigurationService {
  constructor(
    private readonly prisma:
      PrismaService,
  ) {}

  async execute(
    request:
      UpdatePizzaProductionConfigurationRequestDto,
  ): Promise<UpdatePizzaProductionConfigurationResponseDto> {
    const validKitchenItem =
      await this.prisma.item.findFirst({
        where: {
          id:
            request.itemPizzaElaboradaId,

          activo:
            true,

          stocks: {
            some: {
              inventario:
                TipoInventario.COCINA,
            },
          },
        },

        select: {
          id: true,
        },
      });

    if (!validKitchenItem) {
      throw new NotFoundException(
        'El ítem de pizza elaborada no existe, está inactivo o no pertenece al inventario de cocina.',
      );
    }

    return this.prisma
      .configuracionProduccionPizza
      .upsert({
        where: {
          id: 1,
        },

        update: {
          itemPizzaElaboradaId:
            request.itemPizzaElaboradaId,
        },

        create: {
          id: 1,

          itemPizzaElaboradaId:
            request.itemPizzaElaboradaId,
        },

        select:
          pizzaProductionConfigurationSelect,
      });
  }
}