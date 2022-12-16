-- DropForeignKey
ALTER TABLE `work_order_detail` DROP FOREIGN KEY `work_order_detail_confirmation_user_fkey`;

-- AlterTable
ALTER TABLE `history_work_order` MODIFY `time` TIME NOT NULL DEFAULT CURRENT_TIMESTAMP(3);
