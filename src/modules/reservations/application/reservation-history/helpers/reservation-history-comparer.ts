export interface ReservationHistoryChange {
  campo: string;
  valorAnterior: string | null;
  valorNuevo: string | null;
}

export class ReservationHistoryComparer {
  static compare(
    before: Record<string, unknown>,
    after: Record<string, unknown>,
  ): ReservationHistoryChange[] {

    const ignoredFields = new Set([
      'actualizadoEn',
      'creadoEn',
      'usuarioActualizadorId',
      'usuarioCreadorId',
    ]);

    const changes: ReservationHistoryChange[] = [];

    const keys = new Set([
      ...Object.keys(before),
      ...Object.keys(after),
    ]);

    for (const key of keys) {

      if (ignoredFields.has(key)) {
        continue;
      }

      const beforeValue = this.normalize(
        before[key],
      );

      const afterValue = this.normalize(
        after[key],
      );

      if (beforeValue === afterValue) {
        continue;
      }

      changes.push({
        campo: key,
        valorAnterior: beforeValue,
        valorNuevo: afterValue,
      });

    }

    return changes;
  }

  private static normalize(
    value: unknown,
  ): string | null {

    if (
      value === null ||
      value === undefined
    ) {
      return null;
    }

    if (value instanceof Date) {
      return value.toISOString();
    }

    return String(value);
  }
}