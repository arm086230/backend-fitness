/*
  Warnings:

  - You are about to drop the column `cartItemsId` on the `cart` table. All the data in the column will be lost.
  - Added the required column `cartId` to the `CartItems` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `cart` DROP FOREIGN KEY `Cart_cartItemsId_fkey`;

-- AlterTable
ALTER TABLE `cart` DROP COLUMN `cartItemsId`;

-- AlterTable
ALTER TABLE `cartitems` ADD COLUMN `cartId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `CartItems` ADD CONSTRAINT `CartItems_cartId_fkey` FOREIGN KEY (`cartId`) REFERENCES `Cart`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
