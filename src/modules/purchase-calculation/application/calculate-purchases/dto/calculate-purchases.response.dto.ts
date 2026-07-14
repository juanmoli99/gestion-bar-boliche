export class CalculatePurchaseReservationItemResponseDto {
  itemId!: string;
  nombreItem!: string;
  cantidadNecesaria!: number;
}

export class CalculatePurchaseReservationResponseDto {
  reservaId!: string;
  nombreCliente!: string;
  fechaHora!: Date;
  cantidadPersonas!: number;
  formula!: string;
  numeroVersion!: number;
  items!: CalculatePurchaseReservationItemResponseDto[];
}

export class CalculatePurchaseDateItemResponseDto {
  itemId!: string;
  nombreItem!: string;
  cantidadNecesaria!: number;
}

export class CalculatePurchaseDateResponseDto {
  fecha!: string;
  cantidadPersonas!: number;
  cantidadFiestas!: number;
  items!: CalculatePurchaseDateItemResponseDto[];
}

export class CalculatePurchaseTotalItemResponseDto {
  itemId!: string;
  nombreItem!: string;
  cantidadNecesaria!: number;
}

export class CalculatePurchasesResponseDto {
  fechaDesde!: string;
  fechaHasta!: string;
  cantidadPersonasTotal!: number;
  cantidadFiestas!: number;
  reservas!: CalculatePurchaseReservationResponseDto[];
  desglosePorFecha!: CalculatePurchaseDateResponseDto[];
  totalesPorItem!: CalculatePurchaseTotalItemResponseDto[];
}