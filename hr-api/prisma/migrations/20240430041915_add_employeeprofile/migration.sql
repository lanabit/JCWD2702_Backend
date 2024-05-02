-- CreateTable
CREATE TABLE `EmployeeProfile` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `birthDate` DATE NOT NULL,
    `address` VARCHAR(191) NOT NULL,
    `photos` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
