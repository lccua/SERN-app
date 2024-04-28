/*
  Warnings:

  - You are about to drop the column `user_authtentication_id` on the `user` table. All the data in the column will be lost.
  - You are about to drop the `userauthentication` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `workout` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `user_verification_id` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `user` DROP FOREIGN KEY `User_user_authtentication_id_fkey`;

-- DropForeignKey
ALTER TABLE `workout` DROP FOREIGN KEY `Workout_user_id_fkey`;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `user_authtentication_id`,
    ADD COLUMN `user_verification_id` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `userauthentication`;

-- DropTable
DROP TABLE `workout`;

-- CreateTable
CREATE TABLE `user_verification` (
    `id` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `otp` VARCHAR(191) NULL,
    `expires_at` DATETIME(3) NULL,
    `request_count` INTEGER NOT NULL DEFAULT 0,
    `last_request` DATETIME(3) NULL,

    UNIQUE INDEX `user_verification_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `conversation` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `user_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `message` (
    `id` VARCHAR(191) NOT NULL,
    `content` VARCHAR(191) NOT NULL,
    `sent_at` DATETIME(3) NOT NULL,
    `is_future` BOOLEAN NOT NULL,
    `conversation_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `user` ADD CONSTRAINT `user_user_verification_id_fkey` FOREIGN KEY (`user_verification_id`) REFERENCES `user_verification`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `conversation` ADD CONSTRAINT `conversation_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `message` ADD CONSTRAINT `message_conversation_id_fkey` FOREIGN KEY (`conversation_id`) REFERENCES `conversation`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- RenameIndex
ALTER TABLE `user` RENAME INDEX `User_email_key` TO `user_email_key`;

-- RenameIndex
ALTER TABLE `user` RENAME INDEX `User_username_key` TO `user_username_key`;
