-- AlterTable
ALTER TABLE `history_work_order` MODIFY `upload_date` DATE NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `time` TIME NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

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
    `quantity_ng` INTEGER NOT NULL,
    `confirmation` INTEGER NOT NULL DEFAULT 0,
    `confirmation_user` INTEGER NOT NULL DEFAULT 0,
    `confirmation_date` DATETIME(3) NOT NULL,
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
ALTER TABLE `file_work_order` ADD CONSTRAINT `file_work_order_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `auth_users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `work_order_detail` ADD CONSTRAINT `work_order_detail_confirmation_user_fkey` FOREIGN KEY (`confirmation_user`) REFERENCES `auth_users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `work_order_detail` ADD CONSTRAINT `work_order_detail_work_order_id_fkey` FOREIGN KEY (`work_order_id`) REFERENCES `work_order`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `production_scraps` ADD CONSTRAINT `production_scraps_wo_detail_id_fkey` FOREIGN KEY (`wo_detail_id`) REFERENCES `work_order_detail`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `production_scraps` ADD CONSTRAINT `production_scraps_scrap_id_fkey` FOREIGN KEY (`scrap_id`) REFERENCES `master_scrap`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
