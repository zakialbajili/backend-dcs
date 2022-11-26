-- CreateTable
CREATE TABLE `materials` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `material_number` VARCHAR(200) NOT NULL,
    `material_name` VARCHAR(200) NOT NULL,
    `supplier_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `materials_material_number_key`(`material_number`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `batch_materials` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `batch_material_number` VARCHAR(200) NOT NULL,
    `batch_material_name` VARCHAR(200) NOT NULL,
    `type` VARCHAR(200) NOT NULL,
    `min_stock` INTEGER NOT NULL,
    `max_stock` INTEGER NOT NULL,
    `supplier_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `batch_materials_batch_material_number_key`(`batch_material_number`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `racks` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `rack_number` CHAR(200) NOT NULL,
    `rack_name` CHAR(200) NOT NULL,
    `address` CHAR(200) NOT NULL,
    `max_capacity` INTEGER NOT NULL,
    `supplier_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `racks_rack_number_key`(`rack_number`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `palletes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `pallete_number` CHAR(200) NOT NULL,
    `pallete_name` CHAR(200) NOT NULL,
    `address` CHAR(200) NOT NULL,
    `max_capacity` INTEGER NOT NULL,
    `supplier_id` INTEGER NOT NULL,
    `rack_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `palletes_pallete_number_key`(`pallete_number`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `travel_docs` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `number_travel_doc` VARCHAR(200) NOT NULL,
    `auth_user_id` INTEGER NOT NULL,
    `supplier_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `material_receives` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `arrival_date` DATE NOT NULL,
    `type` VARCHAR(200) NOT NULL,
    `material_id` INTEGER NOT NULL,
    `batch_material_id` INTEGER NOT NULL,
    `travel_doc_id` INTEGER NOT NULL,
    `weight` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `placement_palletes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `material_receive_id` INTEGER NOT NULL,
    `pallete_id` INTEGER NOT NULL,
    `rack_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Part` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `part_number` VARCHAR(200) NOT NULL,
    `die_cavity` INTEGER NOT NULL,
    `cycle_time` INTEGER NOT NULL,
    `target_pcs_per_shit` INTEGER NOT NULL,
    `part_weight` INTEGER NOT NULL,
    `runner` INTEGER NOT NULL,
    `dango` INTEGER NOT NULL,
    `min_stock` INTEGER NOT NULL,
    `max_stock` INTEGER NOT NULL,
    `quantity` INTEGER NOT NULL,
    `part_image` VARCHAR(191) NULL,
    `supplier_id` INTEGER NOT NULL,
    `material_id` INTEGER NOT NULL,
    `batch_material_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `materials` ADD CONSTRAINT `materials_supplier_id_fkey` FOREIGN KEY (`supplier_id`) REFERENCES `suppliers`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `batch_materials` ADD CONSTRAINT `batch_materials_supplier_id_fkey` FOREIGN KEY (`supplier_id`) REFERENCES `suppliers`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `racks` ADD CONSTRAINT `racks_supplier_id_fkey` FOREIGN KEY (`supplier_id`) REFERENCES `suppliers`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `palletes` ADD CONSTRAINT `palletes_supplier_id_fkey` FOREIGN KEY (`supplier_id`) REFERENCES `suppliers`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `palletes` ADD CONSTRAINT `palletes_rack_id_fkey` FOREIGN KEY (`rack_id`) REFERENCES `racks`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `travel_docs` ADD CONSTRAINT `travel_docs_supplier_id_fkey` FOREIGN KEY (`supplier_id`) REFERENCES `suppliers`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `travel_docs` ADD CONSTRAINT `travel_docs_auth_user_id_fkey` FOREIGN KEY (`auth_user_id`) REFERENCES `auth_users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `material_receives` ADD CONSTRAINT `material_receives_material_id_fkey` FOREIGN KEY (`material_id`) REFERENCES `materials`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `material_receives` ADD CONSTRAINT `material_receives_batch_material_id_fkey` FOREIGN KEY (`batch_material_id`) REFERENCES `batch_materials`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `material_receives` ADD CONSTRAINT `material_receives_travel_doc_id_fkey` FOREIGN KEY (`travel_doc_id`) REFERENCES `travel_docs`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `placement_palletes` ADD CONSTRAINT `placement_palletes_material_receive_id_fkey` FOREIGN KEY (`material_receive_id`) REFERENCES `material_receives`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `placement_palletes` ADD CONSTRAINT `placement_palletes_pallete_id_fkey` FOREIGN KEY (`pallete_id`) REFERENCES `palletes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `placement_palletes` ADD CONSTRAINT `placement_palletes_rack_id_fkey` FOREIGN KEY (`rack_id`) REFERENCES `racks`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Part` ADD CONSTRAINT `Part_supplier_id_fkey` FOREIGN KEY (`supplier_id`) REFERENCES `suppliers`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Part` ADD CONSTRAINT `Part_material_id_fkey` FOREIGN KEY (`material_id`) REFERENCES `materials`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Part` ADD CONSTRAINT `Part_batch_material_id_fkey` FOREIGN KEY (`batch_material_id`) REFERENCES `batch_materials`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
