import {
  TipoInventario,
} from '../../../../../generated/prisma/enums';

export class DinnerShoppingListItemResponseDto {
  itemId!: string;

  nombreItem!: string;

  proveedorId!: string | null;

  inventario!: TipoInventario;

  precioUnitario!: number;

  unidadMedida!: string;

  abreviaturaUnidad!: string;

  unidadesPorPack!: number | null;

  cantidadNecesaria!: number;

  stockDisponible!: number;

  cantidadComprar!: number;

  packsComprar!: number | null;
}

export class DinnerShoppingListDateItemResponseDto {
  itemId!: string;

  nombreItem!: string;

  cantidadNecesaria!: number;
}

export class DinnerShoppingListDateResponseDto {
  fecha!: string;

  cantidadCenas!: number;

  cantidadPersonas!: number;

  items!: DinnerShoppingListDateItemResponseDto[];
}

export class CalculateDinnerShoppingListResponseDto {
  fechaDesde!: string;

  fechaHasta!: string;

  cantidadCenas!: number;

  cantidadPersonas!: number;

  itemsComprar!: number;

  listaCompra!: DinnerShoppingListItemResponseDto[];

  desglosePorFecha!: DinnerShoppingListDateResponseDto[];
}