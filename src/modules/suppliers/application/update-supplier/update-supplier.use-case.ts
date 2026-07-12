import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { UpdateSupplierRepository } from './update-supplier.repository';
import { UpdateSupplierRequestDto } from './dto/update-supplier.request.dto';
import { UpdateSupplierResponseDto } from './dto/update-supplier.response.dto';

@Injectable()
export class UpdateSupplierUseCase {
  constructor(
    private readonly repository: UpdateSupplierRepository,
  ) {}

  async execute(
    id: string,
    request: UpdateSupplierRequestDto,
  ): Promise<UpdateSupplierResponseDto> {
    const supplier = await this.repository.findById(id);

    if (!supplier) {
      throw new NotFoundException(
        'El proveedor no existe.',
      );
    }

    const cuit = request.cuit?.trim();

    if (cuit) {
      const exists = await this.repository.existsByCuit(
        cuit,
        id,
      );

      if (exists) {
        throw new ConflictException(
          'Ya existe un proveedor con ese CUIT.',
        );
      }
    }

    return this.repository.update(id, {
      razonSocial: request.razonSocial?.trim(),
      nombreComercial: request.nombreComercial?.trim(),
      cuit,
      telefono: request.telefono?.trim(),
      email: request.email?.trim().toLowerCase(),
      direccion: request.direccion?.trim(),
      ciudad: request.ciudad?.trim(),
      provincia: request.provincia?.trim(),
      codigoPostal: request.codigoPostal?.trim(),
      observaciones: request.observaciones?.trim(),
    });
  }
}