/*
  Warnings:

  - Added the required column `employeeUid` to the `EmployeeProfile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `employeeprofile` ADD COLUMN `employeeUid` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `EmployeeProfile` ADD CONSTRAINT `EmployeeProfile_employeeUid_fkey` FOREIGN KEY (`employeeUid`) REFERENCES `Employee`(`uid`) ON DELETE RESTRICT ON UPDATE CASCADE;
