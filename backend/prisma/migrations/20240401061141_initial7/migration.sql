/*
  Warnings:

  - You are about to drop the column `expires_at` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `otp` on the `user` table. All the data in the column will be lost.
  - Added the required column `user_authtentication_id` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user` DROP COLUMN `expires_at`,
    DROP COLUMN `otp`,
    ADD COLUMN `user_authtentication_id` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `UserAuthentication` (
    `id` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `otp` VARCHAR(191) NULL,
    `expires_at` DATETIME(3) NULL,

    UNIQUE INDEX `UserAuthentication_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_user_authtentication_id_fkey` FOREIGN KEY (`user_authtentication_id`) REFERENCES `UserAuthentication`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
