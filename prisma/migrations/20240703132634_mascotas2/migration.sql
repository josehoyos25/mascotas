/*
  Warnings:

  - Added the required column `municipio_id` to the `Mascota` table without a default value. This is not possible if the table is not empty.
  - Added the required column `propietario_id` to the `Mascota` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `mascota` ADD COLUMN `municipio_id` INTEGER NOT NULL,
    ADD COLUMN `propietario_id` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `Propietario` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(32) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Municipio` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `municipio` VARCHAR(50) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Mascota` ADD CONSTRAINT `Mascota_propietario_id_fkey` FOREIGN KEY (`propietario_id`) REFERENCES `Propietario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Mascota` ADD CONSTRAINT `Mascota_municipio_id_fkey` FOREIGN KEY (`municipio_id`) REFERENCES `Municipio`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
