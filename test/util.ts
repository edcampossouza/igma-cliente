import { PrismaService } from 'src/modules/prisma/prisma.service';

export async function resetDatabase(prisma: PrismaService) {
  await prisma.clienteModel.deleteMany({});
}
