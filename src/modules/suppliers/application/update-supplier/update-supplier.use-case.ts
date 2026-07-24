import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { UpdateSupplierRepository } from './update-supplier.repository';
import { UpdateSupplierRequestDto } from './dto/update-supplier.request.dto';
import { UpdateSupplierResponseDto } from './dto/update-supplier.response.dto';

function normalizeOptionalField(
  value: string | null | undefined,
): string | null | undefined {
  if (value === undefined) {
    return undefined;
  }

  if (value === null) {
    return null;
  }

  const normalizedValue =
    value.trim();

  return normalizedValue || null;
}

@Injectable()
export class UpdateSupplierUseCase {
  constructor(
    private readonly repository: UpdateSupplierRepository,
  ) {}

  async execute(
    id: string,
    request: UpdateSupplierRequestDto,
  ): Promise<UpdateSupplierResponseDto> {
    const supplier =
      await this.repository.findById(id);

    if (!supplier) {
      throw new NotFoundException(
        'El proveedor no existe.',
      );
    }

    const cuit =
      request.cuit?.trim();

    if (cuit) {
      const exists =
        await this.repository.existsByCuit(
          cuit,
          id,
        );

      if (exists) {
        throw new ConflictException(
          'Ya existe un proveedor con ese CUIT.',
        );
      }
    }

    const normalizedEmail =
      normalizeOptionalField(
        request.email,
      );

    return this.repository.update(
      id,
      {
        razonSocial:
          request.razonSocial?.trim(),

        nombreComercial:
          normalizeOptionalField(
            request.nombreComercial,
          ),

        cuit,

        telefono:
          normalizeOptionalField(
            request.telefono,
          ),

        email:
          normalizedEmail?.toLowerCase() ??
          normalizedEmail,

        direccion:
          normalizeOptionalField(
            request.direccion,
          ),

        ciudad:
          normalizeOptionalField(
            request.ciudad,
          ),

        provincia:
          normalizeOptionalField(
            request.provincia,
          ),

        codigoPostal:
          normalizeOptionalField(
            request.codigoPostal,
          ),

        observaciones:
          normalizeOptionalField(
            request.observaciones,
          ),
      },
    );
  }
}