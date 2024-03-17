/*
  Warnings:

  - You are about to drop the column `createdAt` on the `workout` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `workout` table. All the data in the column will be lost.
  - Added the required column `user_id` to the `Workout` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `workout` DROP FOREIGN KEY `Workout_userId_fkey`;

-- AlterTable
ALTER TABLE `workout` DROP COLUMN `createdAt`,
    DROP COLUMN `userId`,
    ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `user_id` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Workout` ADD CONSTRAINT `Workout_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
