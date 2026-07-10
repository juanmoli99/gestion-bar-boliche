import { UserEntity } from '../entities/user.entity';

export interface UsersRepositoryInterface {
  crear(usuario: UserEntity): Promise<UserEntity>;

  obtenerPorId(id: string): Promise<UserEntity | null>;

  obtenerPorUsuario(usuario: string): Promise<UserEntity | null>;

  obtenerPorEmail(email: string): Promise<UserEntity | null>;

  listar(): Promise<UserEntity[]>;

  actualizar(usuario: UserEntity): Promise<UserEntity>;

  desactivar(id: string): Promise<void>;

  reactivar(id: string): Promise<void>;
}