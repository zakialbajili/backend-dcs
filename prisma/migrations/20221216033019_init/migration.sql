/*
  Warnings:

  - A unique constraint covering the columns `[material_receive_id]` on the table `placement_rack` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `type` to the `racks` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `history_work_order` MODIFY `time` TIME NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `racks` ADD COLUMN `type` VARCHAR(200) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `placement_rack_material_receive_id_key` ON `placement_rack`(`material_receive_id`);
