import {
  ConflictException,
  Injectable,
} from '@nestjs/common';

import { CreateSupplierRepository } from './create-supplier.repository';
import { CreateSupplierRequestDto } from './dto/create-supplier.request.dto';
import { CreateSupplierResponseDto } from './dto/create-supplier.response.dto';

@Injectable()
export class CreateSupplierUseCase {
  constructor(
    private readonly repository: CreateSupplierRepository,
  ) {}

  async execute(
    request: CreateSupplierRequestDto,
  ): Promise<CreateSupplierResponseDto> {
    const exists = await this.repository.exists(
      request.cuit.trim(),
    );

    if (exists) {
      throw new ConflictException(
        'Ya existe un proveedor con ese CUIT.',
      );
    }

    return this.repository.create({
      razonSocial: request.razonSocial.trim(),
      nombreComercial: request.nombreComercial?.trim(),
      cuit: request.cuit.trim(),
      telefono: request.telefono?.trim(),
      email: request.email?.trim(),
      direccion: request.direccion?.trim(),
      ciudad: request.ciudad?.trim(),
      provincia: request.provincia?.trim(),
      codigoPostal: request.codigoPostal?.trim(),
      observaciones: request.observaciones?.trim(),
    });
  }
}