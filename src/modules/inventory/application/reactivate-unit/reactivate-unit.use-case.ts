import { ReactivateUnitRepository } from './reactivate-unit.repository';
import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

@Injectable()
export class ReactivateUnitUseCase {
  constructor(
    private readonly repository: ReactivateUnitRepository,
  ) {}

  async execute(id: string) {
    const unit = await this.repository.findById(id);

    if (!unit) {
      throw new NotFoundException(
        'La unidad de medida no existe.',
      );
    }

    return this.repository.reactivate(id);
  }
}