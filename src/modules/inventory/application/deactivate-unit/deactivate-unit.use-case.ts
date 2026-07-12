import { DeactivateUnitRepository } from './deactivate-unit.repository';
import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

@Injectable()
export class DeactivateUnitUseCase {
  constructor(
    private readonly repository: DeactivateUnitRepository,
  ) {}

  async execute(id: string) {
    const unit = await this.repository.findById(id);

    if (!unit) {
      throw new NotFoundException(
        'La unidad de medida no existe.',
      );
    }

    return this.repository.deactivate(id);
  }
}