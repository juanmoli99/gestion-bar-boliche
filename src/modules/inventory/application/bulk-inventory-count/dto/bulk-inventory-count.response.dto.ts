export class BulkInventoryCountItemResponseDto {
  stockId!: string;

  itemId!: string;

  cantidadAnterior!: number;

  cantidadContada!: number;

  diferencia!: number;

  cantidadActual!: number;

  actualizado!: boolean;
}

export class BulkInventoryCountResponseDto {
  totalItems!: number;

  itemsActualizados!: number;

  movimientosCreados!: number;

  items!: BulkInventoryCountItemResponseDto[];
}