/*
  Warnings:

  - You are about to drop the column `part_name` on the `work_order` table. All the data in the column will be lost.
  - You are about to drop the column `part_number` on the `work_order` table. All the data in the column will be lost.
  - Added the required column `id_part` to the `work_order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `history_work_order` MODIFY `time` TIME NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `work_order` DROP COLUMN `part_name`,
    DROP COLUMN `part_number`,
    ADD COLUMN `id_part` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `work_order` ADD CONSTRAINT `work_order_id_part_fkey` FOREIGN KEY (`id_part`) REFERENCES `Part`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
