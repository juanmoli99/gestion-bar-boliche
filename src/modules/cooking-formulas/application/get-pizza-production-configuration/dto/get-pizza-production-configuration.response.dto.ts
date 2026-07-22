export class GetPizzaProductionConfigurationItemResponseDto {
  id!: string;

  nombre!: string;
}

export class GetPizzaProductionConfigurationResponseDto {
  id!: number;

  itemPizzaElaboradaId!: string | null;

  itemPizzaSinTaccId!: string | null;

  creadoEn!: Date;

  actualizadoEn!: Date;

  itemPizzaElaborada!:
    GetPizzaProductionConfigurationItemResponseDto | null;

  itemPizzaSinTacc!:
    GetPizzaProductionConfigurationItemResponseDto | null;
}