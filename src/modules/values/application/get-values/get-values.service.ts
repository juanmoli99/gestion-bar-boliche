import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../../../core/database/prisma.service';

@Injectable()
export class GetValuesService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async execute() {
    let values =
      await this.prisma.valores.findUnique({
        where: { id: 1 },
      });

    if (!values) {
      values =
        await this.prisma.valores.create({
          data: {
            id: 1,
          },
        });
    }

    return values;
  }
}