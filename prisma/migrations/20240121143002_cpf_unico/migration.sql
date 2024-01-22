/*
  Warnings:

  - A unique constraint covering the columns `[cpf]` on the table `ClienteModel` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `ClienteModel_cpf_key` ON `ClienteModel`(`cpf`);
