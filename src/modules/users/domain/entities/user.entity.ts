export class UserEntity {
  constructor(
    public readonly id: string,
    public readonly nombreCompleto: string,
    public readonly usuario: string,
    public readonly email: string | null,
    public readonly rol: string,
    public readonly activo: boolean,
    public readonly creadoEn: Date,
    public readonly actualizadoEn: Date,
  ) {}
}