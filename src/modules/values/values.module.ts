import { Module } from '@nestjs/common';

import { GetValuesController } from './application/get-values/get-values.controller';
import { GetValuesService } from './application/get-values/get-values.service';

import { UpdateValuesController } from './application/update-values/update-values.controller';
import { UpdateValuesService } from './application/update-values/update-values.service';

@Module({
  controllers: [
    GetValuesController,
    UpdateValuesController,
  ],
  providers: [
    GetValuesService,
    UpdateValuesService,
  ],
})
export class ValuesModule {}