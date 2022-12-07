/*
  Warnings:

  - Added the required column `file` to the `history_work_order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `history_work_order` ADD COLUMN `file` VARCHAR(255) NOT NULL;
