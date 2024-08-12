/*
  Warnings:

  - Added the required column `resumefile` to the `Resume` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `resume` ADD COLUMN `resumefile` VARCHAR(191) NOT NULL;
