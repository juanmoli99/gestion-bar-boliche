export class ShoppingListItemResponseDto {
  itemId!: string;
  nombreItem!: string;
  unidadMedida!: string;
  abreviaturaUnidad!: string;
  unidadesPorPack!: number | null;
  cantidadNecesaria!: number;
  stockDisponible!: number;
  cantidadComprar!: number;
  packsComprar!: number | null;
}

export class ShoppingListDateItemResponseDto {
  itemId!: string;
  nombreItem!: string;
  cantidadNecesaria!: number;
}

export class ShoppingListDateResponseDto {
  fecha!: string;
  cantidadFiestas!: number;
  cantidadPersonas!: number;
  items!: ShoppingListDateItemResponseDto[];
}

export class CalculateShoppingListResponseDto {
  fechaDesde!: string;
  fechaHasta!: string;
  cantidadFiestas!: number;
  cantidadPersonas!: number;
  itemsComprar!: number;
  listaCompra!: ShoppingListItemResponseDto[];
  desglosePorFecha!: ShoppingListDateResponseDto[];
}