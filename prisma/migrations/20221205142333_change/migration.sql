-- DropForeignKey
ALTER TABLE `material_receives` DROP FOREIGN KEY `material_receives_batch_material_id_fkey`;

-- DropForeignKey
ALTER TABLE `material_receives` DROP FOREIGN KEY `material_receives_material_id_fkey`;

-- AlterTable
ALTER TABLE `material_receives` MODIFY `material_id` INTEGER NULL,
    MODIFY `batch_material_id` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `material_receives` ADD CONSTRAINT `material_receives_material_id_fkey` FOREIGN KEY (`material_id`) REFERENCES `materials`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `material_receives` ADD CONSTRAINT `material_receives_batch_material_id_fkey` FOREIGN KEY (`batch_material_id`) REFERENCES `batch_materials`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
