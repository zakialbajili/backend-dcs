/*
  Warnings:

  - Added the required column `part_number` to the `work_order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `history_work_order` MODIFY `time` TIME NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `work_order` ADD COLUMN `part_number` CHAR(200) NOT NULL;
