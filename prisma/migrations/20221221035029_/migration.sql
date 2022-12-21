-- CreateTable
CREATE TABLE `auth_users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nisp` VARCHAR(25) NOT NULL,
    `password` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `auth_users_nisp_key`(`nisp`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `auth_roles` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(200) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `auth_roles_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `auth_user_roles` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `auth_user_id` INTEGER NOT NULL,
    `auth_role_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `suppliers` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(200) NOT NULL,
    `email` VARCHAR(200) NOT NULL,
    `phone` VARCHAR(13) NOT NULL,
    `address` TEXT NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `suppliers_email_key`(`email`),
    UNIQUE INDEX `suppliers_phone_key`(`phone`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

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
    `type` VARCHAR(200) NOT NULL,
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
    `file_material_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `travel_docs_number_travel_doc_key`(`number_travel_doc`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `material_receives` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `arrival_date` DATE NOT NULL,
    `type` VARCHAR(200) NOT NULL,
    `material_id` INTEGER NULL,
    `batch_material_id` INTEGER NULL,
    `travel_doc_id` INTEGER NOT NULL,
    `file_material_id` INTEGER NOT NULL,
    `weight` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

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

    UNIQUE INDEX `placement_rack_material_receive_id_key`(`material_receive_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Part` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `part_number` VARCHAR(200) NOT NULL,
    `part_name` VARCHAR(200) NOT NULL,
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
    `material_id` INTEGER NULL,
    `batch_material_id` INTEGER NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `history_work_order` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name_file` CHAR(200) NOT NULL,
    `upload_date` DATE NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `time` TIME NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `work_order` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_file` INTEGER NOT NULL,
    `no_work_order` CHAR(200) NOT NULL,
    `id_part` INTEGER NOT NULL,
    `customer` CHAR(200) NOT NULL,
    `prod_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `quantity_perbox` INTEGER NOT NULL,
    `total_order` INTEGER NOT NULL,
    `total_box` INTEGER NOT NULL,
    `supplier_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `delivery` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `part_number` INTEGER NOT NULL,
    `part_name` CHAR(200) NOT NULL,
    `total_order` INTEGER NOT NULL,
    `prod_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `no_work_order` INTEGER NOT NULL,
    `supplier_id` INTEGER NOT NULL,
    `quantity_perbox` INTEGER NOT NULL,
    `customer` CHAR(200) NOT NULL,
    `deliv_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `deliv_number` VARCHAR(200) NOT NULL,
    `total_box` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `file_work_order` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `filename` VARCHAR(200) NOT NULL,
    `file_mime` VARCHAR(200) NOT NULL,
    `file_path` VARCHAR(200) NOT NULL,
    `file_extension` VARCHAR(200) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `work_order_detail` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `work_order_id` INTEGER NOT NULL,
    `quantity` INTEGER NOT NULL,
    `quantity_ng` INTEGER NOT NULL DEFAULT 0,
    `confirmation` INTEGER NOT NULL DEFAULT 0,
    `confirmation_user` INTEGER NOT NULL DEFAULT 0,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `master_scrap` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(200) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `production_scraps` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `wo_detail_id` INTEGER NOT NULL,
    `scrap_id` INTEGER NOT NULL,
    `qty` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `auth_user_roles` ADD CONSTRAINT `auth_user_roles_auth_user_id_fkey` FOREIGN KEY (`auth_user_id`) REFERENCES `auth_users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `auth_user_roles` ADD CONSTRAINT `auth_user_roles_auth_role_id_fkey` FOREIGN KEY (`auth_role_id`) REFERENCES `auth_roles`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `materials` ADD CONSTRAINT `materials_supplier_id_fkey` FOREIGN KEY (`supplier_id`) REFERENCES `suppliers`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `batch_materials` ADD CONSTRAINT `batch_materials_supplier_id_fkey` FOREIGN KEY (`supplier_id`) REFERENCES `suppliers`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `racks` ADD CONSTRAINT `racks_supplier_id_fkey` FOREIGN KEY (`supplier_id`) REFERENCES `suppliers`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `palletes` ADD CONSTRAINT `palletes_supplier_id_fkey` FOREIGN KEY (`supplier_id`) REFERENCES `suppliers`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `travel_docs` ADD CONSTRAINT `travel_docs_supplier_id_fkey` FOREIGN KEY (`supplier_id`) REFERENCES `suppliers`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `travel_docs` ADD CONSTRAINT `travel_docs_auth_user_id_fkey` FOREIGN KEY (`auth_user_id`) REFERENCES `auth_users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `travel_docs` ADD CONSTRAINT `travel_docs_file_material_id_fkey` FOREIGN KEY (`file_material_id`) REFERENCES `file_material_receive`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `material_receives` ADD CONSTRAINT `material_receives_material_id_fkey` FOREIGN KEY (`material_id`) REFERENCES `materials`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `material_receives` ADD CONSTRAINT `material_receives_batch_material_id_fkey` FOREIGN KEY (`batch_material_id`) REFERENCES `batch_materials`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `material_receives` ADD CONSTRAINT `material_receives_travel_doc_id_fkey` FOREIGN KEY (`travel_doc_id`) REFERENCES `travel_docs`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `material_receives` ADD CONSTRAINT `material_receives_file_material_id_fkey` FOREIGN KEY (`file_material_id`) REFERENCES `file_material_receive`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `file_material_receive` ADD CONSTRAINT `file_material_receive_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `auth_users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `placement_rack` ADD CONSTRAINT `placement_rack_material_receive_id_fkey` FOREIGN KEY (`material_receive_id`) REFERENCES `material_receives`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `placement_rack` ADD CONSTRAINT `placement_rack_rack_id_fkey` FOREIGN KEY (`rack_id`) REFERENCES `racks`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Part` ADD CONSTRAINT `Part_supplier_id_fkey` FOREIGN KEY (`supplier_id`) REFERENCES `suppliers`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Part` ADD CONSTRAINT `Part_material_id_fkey` FOREIGN KEY (`material_id`) REFERENCES `materials`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Part` ADD CONSTRAINT `Part_batch_material_id_fkey` FOREIGN KEY (`batch_material_id`) REFERENCES `batch_materials`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `work_order` ADD CONSTRAINT `work_order_id_file_fkey` FOREIGN KEY (`id_file`) REFERENCES `history_work_order`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `work_order` ADD CONSTRAINT `work_order_id_part_fkey` FOREIGN KEY (`id_part`) REFERENCES `Part`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `work_order` ADD CONSTRAINT `work_order_supplier_id_fkey` FOREIGN KEY (`supplier_id`) REFERENCES `suppliers`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `delivery` ADD CONSTRAINT `delivery_part_number_fkey` FOREIGN KEY (`part_number`) REFERENCES `Part`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `delivery` ADD CONSTRAINT `delivery_no_work_order_fkey` FOREIGN KEY (`no_work_order`) REFERENCES `work_order`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `delivery` ADD CONSTRAINT `delivery_supplier_id_fkey` FOREIGN KEY (`supplier_id`) REFERENCES `suppliers`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `file_work_order` ADD CONSTRAINT `file_work_order_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `auth_users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `work_order_detail` ADD CONSTRAINT `work_order_detail_work_order_id_fkey` FOREIGN KEY (`work_order_id`) REFERENCES `work_order`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `production_scraps` ADD CONSTRAINT `production_scraps_wo_detail_id_fkey` FOREIGN KEY (`wo_detail_id`) REFERENCES `work_order_detail`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `production_scraps` ADD CONSTRAINT `production_scraps_scrap_id_fkey` FOREIGN KEY (`scrap_id`) REFERENCES `master_scrap`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
