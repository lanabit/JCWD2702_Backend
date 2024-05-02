/*
  Warnings:

  - A unique constraint covering the columns `[employeeUid]` on the table `EmployeeProfile` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `EmployeeProfile_employeeUid_key` ON `EmployeeProfile`(`employeeUid`);
