import 'dotenv/config';
import * as bcrypt from 'bcrypt';
import { PrismaPg } from '@prisma/adapter-pg';

import { PrismaClient } from '../src/generated/prisma/client';
import { RolUsuario } from '../src/generated/prisma/enums';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('DATABASE_URL no está configurada.');
}

const prisma = new PrismaClient({
  adapter: new PrismaPg({
    connectionString,
  }),
});

async function main(): Promise<void> {
  const contrasenaHash = await bcrypt.hash('Admin1234', 12);

  await prisma.usuario.upsert({
    where: {
      usuario: 'admin',
    },
    update: {
      nombreCompleto: 'Administrador General',
      contrasenaHash,
      rol: RolUsuario.ADMINISTRADOR,
      activo: true,
    },
    create: {
      nombreCompleto: 'Administrador General',
      usuario: 'admin',
      contrasenaHash,
      rol: RolUsuario.ADMINISTRADOR,
      activo: true,
    },
  });

  console.log('Administrador creado correctamente.');
}

main()
  .catch((error: unknown) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });