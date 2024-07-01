/*
  Warnings:

  - You are about to drop the column `TrainertId` on the `booking` table. All the data in the column will be lost.
  - Added the required column `age` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bookingDate` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `expiryDate` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sex` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `booking` DROP COLUMN `TrainertId`,
    ADD COLUMN `age` VARCHAR(191) NOT NULL,
    ADD COLUMN `bookingDate` DATETIME(3) NOT NULL,
    ADD COLUMN `expiryDate` DATETIME(3) NOT NULL,
    ADD COLUMN `name` VARCHAR(191) NOT NULL,
    ADD COLUMN `phone` VARCHAR(191) NOT NULL,
    ADD COLUMN `sex` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `image` VARCHAR(191) NOT NULL;
