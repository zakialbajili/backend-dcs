-- CreateTable
CREATE TABLE `history_work_order` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name_file` CHAR(200) NOT NULL,
    `upload_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `time` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `work_order` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_file` INTEGER NOT NULL,
    `no_work_order` CHAR(200) NOT NULL,
    `supplier_id` INTEGER NOT NULL,
    `customer` CHAR(200) NOT NULL,
    `part_name` CHAR(200) NOT NULL,
    `part_number` CHAR(200) NOT NULL,
    `quantity_perbox` INTEGER NOT NULL,
    `total_order` INTEGER NOT NULL,
    `total_box` INTEGER NOT NULL,
    `prod_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `delivery` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `part_name` CHAR(200) NOT NULL,
    `quantity_perbox` INTEGER NOT NULL,
    `part_number` CHAR(200) NOT NULL,
    `no_work_order` INTEGER NOT NULL,
    `supplier_id` INTEGER NOT NULL,
    `customer` CHAR(200) NOT NULL,
    `total_order` INTEGER NOT NULL,
    `total_box` INTEGER NOT NULL,
    `prod_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `work_order` ADD CONSTRAINT `work_order_id_file_fkey` FOREIGN KEY (`id_file`) REFERENCES `history_work_order`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `work_order` ADD CONSTRAINT `work_order_supplier_id_fkey` FOREIGN KEY (`supplier_id`) REFERENCES `suppliers`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `delivery` ADD CONSTRAINT `delivery_no_work_order_fkey` FOREIGN KEY (`no_work_order`) REFERENCES `work_order`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `delivery` ADD CONSTRAINT `delivery_supplier_id_fkey` FOREIGN KEY (`supplier_id`) REFERENCES `suppliers`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
