-- AlterTable
ALTER TABLE `attendance` MODIFY `updatedAt` DATETIME(3) NULL,
    MODIFY `deletedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `employee` MODIFY `updatedAt` DATETIME(3) NULL,
    MODIFY `deletedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `leaverequest` MODIFY `updatedAt` DATETIME(3) NULL,
    MODIFY `deletedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `monthlypayroll` MODIFY `updatedAt` DATETIME(3) NULL,
    MODIFY `deletedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `position` MODIFY `updatedAt` DATETIME(3) NULL,
    MODIFY `deletedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `shift` MODIFY `updatedAt` DATETIME(3) NULL,
    MODIFY `deletedAt` DATETIME(3) NULL;
