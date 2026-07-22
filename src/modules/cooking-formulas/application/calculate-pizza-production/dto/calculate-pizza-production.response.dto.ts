export class CalculatePizzaProductionReservationResponseDto {
  reservaId!: string;
  nombreCliente!: string;
  fechaHora!: Date;
  cantidadPersonas!: number;
  cantidadPersonasNormales!: number;
  cantidadMenusSinTacc!: number;
  formulaCocinaId!: string;
  formulaCocina!: string;
  pizzasNormalesNecesarias!: number;
}

export class CalculatePizzaProductionFormulaResponseDto {
  formulaCocinaId!: string;
  formulaCocina!: string;
  cantidadPersonasNormales!: number;
  pizzasNormalesNecesarias!: number;
  stockPizzaElaboradaAsignado!: number;
  pizzasNormalesAProducir!: number;
}

export class CalculatePizzaProductionIngredientResponseDto {
  itemId!: string;
  nombreItem!: string;
  cantidadNecesaria!: number;
  stockDisponible!: number;
  cantidadAComprar!: number;
  unidadesPorPack!: number | null;
  cantidadPacks!: number | null;
}

export class CalculatePizzaProductionResponseDto {
  fechaDesde!: string;
  fechaHasta!: string;

  cantidadReservas!: number;
  cantidadPersonasTotal!: number;
  cantidadPersonasNormalesTotal!: number;
  cantidadMenusSinTaccTotal!: number;

  pizzasNormalesNecesarias!: number;
  stockPizzaElaboradaDisponible!: number;
  pizzasNormalesAProducir!: number;

  reservas!: CalculatePizzaProductionReservationResponseDto[];
  formulas!: CalculatePizzaProductionFormulaResponseDto[];
  ingredientes!: CalculatePizzaProductionIngredientResponseDto[];
}