import {
  IsUUID,
} from 'class-validator';

export class UpdatePizzaProductionConfigurationRequestDto {
  @IsUUID()
  itemPizzaElaboradaId!: string;

  @IsUUID()
  itemPizzaSinTaccId!: string;
}