-- DropForeignKey
ALTER TABLE `part` DROP FOREIGN KEY `Part_material_id_fkey`;

-- DropForeignKey
ALTER TABLE `part` DROP FOREIGN KEY `Part_supplier_id_fkey`;

-- AlterTable
ALTER TABLE `history_work_order` MODIFY `time` TIME NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `part` MODIFY `supplier_id` INTEGER NULL,
    MODIFY `material_id` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Part` ADD CONSTRAINT `Part_supplier_id_fkey` FOREIGN KEY (`supplier_id`) REFERENCES `suppliers`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Part` ADD CONSTRAINT `Part_material_id_fkey` FOREIGN KEY (`material_id`) REFERENCES `materials`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
