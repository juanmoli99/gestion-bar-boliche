export interface CalculationReservationItem {
  itemId: string;

  nombreItem: string;

  cantidadPorPersona: number;

  cantidadNecesaria: number;
}

export interface CalculationReservation {
  reservaId: string;

  nombreCliente: string;

  fechaHora: Date;

  cantidadPersonas: number;

  formulaId: string;

  formula: string;

  versionId: string;

  numeroVersion: number;

  items: CalculationReservationItem[];
}

export interface CalculationDateItem {
  itemId: string;

  nombreItem: string;

  cantidadNecesaria: number;
}

export interface CalculationDate {
  fecha: string;

  cantidadPersonas: number;

  cantidadFiestas: number;

  items: CalculationDateItem[];
}

export interface CalculationItemTotal {
  itemId: string;

  nombreItem: string;

  cantidadNecesaria: number;
}

export interface CalculationResult {
  fechaDesde: Date;

  fechaHasta: Date;

  cantidadPersonasTotal: number;

  cantidadFiestas: number;

  reservas: CalculationReservation[];

  desglosePorFecha: CalculationDate[];

  totalesPorItem: CalculationItemTotal[];
}