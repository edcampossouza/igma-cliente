import { ClienteModel } from '@prisma/client';

export class ClienteResponseDto {
  data: ClienteModel[];
  currentPage: number;
  itemsPerPage: number;
  totalPages: number;
  totalItems: number;
}
