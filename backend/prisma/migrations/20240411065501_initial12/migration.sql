-- AlterTable
ALTER TABLE `userauthentication` ADD COLUMN `lastOtpRequest` DATETIME(3) NULL,
    ADD COLUMN `otpRequestCount` INTEGER NOT NULL DEFAULT 0;
