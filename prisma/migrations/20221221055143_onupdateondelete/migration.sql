-- DropForeignKey
ALTER TABLE `work_order` DROP FOREIGN KEY `work_order_id_file_fkey`;

-- DropForeignKey
ALTER TABLE `work_order` DROP FOREIGN KEY `work_order_id_part_fkey`;

-- DropForeignKey
ALTER TABLE `work_order_detail` DROP FOREIGN KEY `work_order_detail_work_order_id_fkey`;

-- AlterTable
ALTER TABLE `history_work_order` MODIFY `time` TIME NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AddForeignKey
ALTER TABLE `work_order` ADD CONSTRAINT `work_order_id_file_fkey` FOREIGN KEY (`id_file`) REFERENCES `history_work_order`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `work_order` ADD CONSTRAINT `work_order_id_part_fkey` FOREIGN KEY (`id_part`) REFERENCES `Part`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `work_order_detail` ADD CONSTRAINT `work_order_detail_work_order_id_fkey` FOREIGN KEY (`work_order_id`) REFERENCES `work_order`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
