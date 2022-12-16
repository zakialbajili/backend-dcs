/*
  Warnings:

  - You are about to drop the column `rack_id` on the `palletes` table. All the data in the column will be lost.
  - You are about to drop the `placement_palletes` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[number_travel_doc]` on the table `travel_docs` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `file_material_id` to the `material_receives` table without a default value. This is not possible if the table is not empty.
  - Added the required column `file_material_id` to the `travel_docs` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `palletes` DROP FOREIGN KEY `palletes_rack_id_fkey`;

-- DropForeignKey
ALTER TABLE `placement_palletes` DROP FOREIGN KEY `placement_palletes_material_receive_id_fkey`;

-- DropForeignKey
ALTER TABLE `placement_palletes` DROP FOREIGN KEY `placement_palletes_pallete_id_fkey`;

-- DropForeignKey
ALTER TABLE `placement_palletes` DROP FOREIGN KEY `placement_palletes_rack_id_fkey`;

-- AlterTable
ALTER TABLE `material_receives` ADD COLUMN `file_material_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `palletes` DROP COLUMN `rack_id`;

-- AlterTable
ALTER TABLE `travel_docs` ADD COLUMN `file_material_id` INTEGER NOT NULL;

-- DropTable
DROP TABLE `placement_palletes`;

-- CreateTable
CREATE TABLE `file_material_receive` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `filename` VARCHAR(200) NOT NULL,
    `original_filename` VARCHAR(200) NOT NULL,
    `file_mime` VARCHAR(200) NOT NULL,
    `file_path` VARCHAR(200) NOT NULL,
    `file_extension` VARCHAR(200) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `file_material_receive_filename_key`(`filename`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `placement_rack` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `material_receive_id` INTEGER NOT NULL,
    `rack_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `travel_docs_number_travel_doc_key` ON `travel_docs`(`number_travel_doc`);

-- AddForeignKey
ALTER TABLE `travel_docs` ADD CONSTRAINT `travel_docs_file_material_id_fkey` FOREIGN KEY (`file_material_id`) REFERENCES `file_material_receive`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `material_receives` ADD CONSTRAINT `material_receives_file_material_id_fkey` FOREIGN KEY (`file_material_id`) REFERENCES `file_material_receive`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `file_material_receive` ADD CONSTRAINT `file_material_receive_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `auth_users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `placement_rack` ADD CONSTRAINT `placement_rack_material_receive_id_fkey` FOREIGN KEY (`material_receive_id`) REFERENCES `material_receives`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `placement_rack` ADD CONSTRAINT `placement_rack_rack_id_fkey` FOREIGN KEY (`rack_id`) REFERENCES `racks`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
