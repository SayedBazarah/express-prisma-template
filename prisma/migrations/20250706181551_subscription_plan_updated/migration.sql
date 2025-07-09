/*
  Warnings:

  - The `plan` column on the `Subscription` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "SubscriptionPlan" AS ENUM ('TRIAL', 'BASIC', 'PREMIUM');

-- AlterTable
ALTER TABLE "Subscription" DROP COLUMN "plan",
ADD COLUMN     "plan" "SubscriptionPlan" NOT NULL DEFAULT 'TRIAL',
ALTER COLUMN "startDate" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "endDate" SET DEFAULT (NOW() + INTERVAL '30 days');
