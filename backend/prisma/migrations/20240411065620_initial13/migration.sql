/*
  Warnings:

  - You are about to drop the column `lastOtpRequest` on the `userauthentication` table. All the data in the column will be lost.
  - You are about to drop the column `otpRequestCount` on the `userauthentication` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `userauthentication` DROP COLUMN `lastOtpRequest`,
    DROP COLUMN `otpRequestCount`,
    ADD COLUMN `last_request` DATETIME(3) NULL,
    ADD COLUMN `request_count` INTEGER NOT NULL DEFAULT 0;
