/*
  Warnings:

  - Made the column `supplier_id` on table `part` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `part` DROP FOREIGN KEY `Part_batch_material_id_fkey`;

-- DropForeignKey
ALTER TABLE `part` DROP FOREIGN KEY `Part_supplier_id_fkey`;

-- AlterTable
ALTER TABLE `history_work_order` MODIFY `time` TIME NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `part` MODIFY `supplier_id` INTEGER NOT NULL,
    MODIFY `batch_material_id` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Part` ADD CONSTRAINT `Part_supplier_id_fkey` FOREIGN KEY (`supplier_id`) REFERENCES `suppliers`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Part` ADD CONSTRAINT `Part_batch_material_id_fkey` FOREIGN KEY (`batch_material_id`) REFERENCES `batch_materials`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
