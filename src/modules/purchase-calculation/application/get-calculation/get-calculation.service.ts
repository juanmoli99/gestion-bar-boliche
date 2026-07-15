import { Injectable } from '@nestjs/common';

import { GetCalculationUseCase } from './get-calculation.use-case';

@Injectable()
export class GetCalculationService {
  constructor(
    private readonly useCase: GetCalculationUseCase,
  ) {}

  execute(
    id: string,
  ) {
    return this.useCase.execute(
      id,
    );
  }
}