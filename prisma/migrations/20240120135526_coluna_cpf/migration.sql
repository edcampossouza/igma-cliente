/*
  Warnings:

  - Added the required column `cpf` to the `ClienteModel` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `ClienteModel` ADD COLUMN `cpf` VARCHAR(11) NOT NULL;
