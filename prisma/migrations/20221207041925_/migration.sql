/*
  Warnings:

  - You are about to alter the column `part_number` on the `delivery` table. The data in that column could be lost. The data in that column will be cast from `Char(200)` to `Int`.
  - You are about to drop the column `part_number` on the `work_order` table. All the data in the column will be lost.
  - Added the required column `deliv_number` to the `delivery` table without a default value. This is not possible if the table is not empty.
  - Added the required column `part_name` to the `Part` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `delivery` ADD COLUMN `deliv_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `deliv_number` VARCHAR(200) NOT NULL,
    MODIFY `part_number` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `part` ADD COLUMN `part_name` VARCHAR(200) NOT NULL;

-- AlterTable
ALTER TABLE `work_order` DROP COLUMN `part_number`;

-- AddForeignKey
ALTER TABLE `delivery` ADD CONSTRAINT `delivery_part_number_fkey` FOREIGN KEY (`part_number`) REFERENCES `Part`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
