export class UpdatePizzaProductionConfigurationItemResponseDto {
  id!: string;

  nombre!: string;
}

export class UpdatePizzaProductionConfigurationResponseDto {
  id!: number;

  itemPizzaElaboradaId!: string | null;

  creadoEn!: Date;

  actualizadoEn!: Date;

  itemPizzaElaborada!:
    UpdatePizzaProductionConfigurationItemResponseDto | null;
}