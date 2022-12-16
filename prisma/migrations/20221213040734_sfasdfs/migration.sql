/*
  Warnings:

  - You are about to drop the column `confirmation_date` on the `work_order_detail` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `work_order_detail_confirmation_user_fkey` ON `work_order_detail`;

-- AlterTable
ALTER TABLE `history_work_order` MODIFY `time` TIME NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `work_order_detail` DROP COLUMN `confirmation_date`,
    MODIFY `quantity_ng` INTEGER NOT NULL DEFAULT 0;
