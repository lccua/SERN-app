-- AlterTable
ALTER TABLE `user` ADD COLUMN `created_at` DATETIME(3) NULL,
    ADD COLUMN `expires_at` DATETIME(3) NULL,
    ADD COLUMN `otp` VARCHAR(191) NULL,
    ADD COLUMN `updated_at` DATETIME(3) NULL;
