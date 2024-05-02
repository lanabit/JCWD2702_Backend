/*
  Warnings:

  - You are about to drop the column `photos` on the `employeeprofile` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `employeeprofile` DROP COLUMN `photos`;

-- CreateTable
CREATE TABLE `EmployeeImagesProfile` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `url` VARCHAR(191) NOT NULL,
    `employeeProfileId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `EmployeeImagesProfile` ADD CONSTRAINT `EmployeeImagesProfile_employeeProfileId_fkey` FOREIGN KEY (`employeeProfileId`) REFERENCES `EmployeeProfile`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
