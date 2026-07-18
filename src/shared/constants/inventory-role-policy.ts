import { RolUsuario, TipoInventario } from '../../generated/prisma/enums';

export const INVENTORY_BY_ROLE: Partial<
  Record<RolUsuario, TipoInventario | null>
> = {
  [RolUsuario.ADMINISTRADOR]: null,
  [RolUsuario.OPERADOR]: null,

  [RolUsuario.BARRA]: TipoInventario.BEBIDAS,
  [RolUsuario.COCINA]: TipoInventario.COCINA,
  [RolUsuario.MOZO]: TipoInventario.VARIOS,
  [RolUsuario.LIMPIEZA]: TipoInventario.LIMPIEZA,
};

export function getAllowedInventory(
  rol: RolUsuario,
): TipoInventario | null {
  return INVENTORY_BY_ROLE[rol] ?? null;
}