-- AlterTable
ALTER TABLE "Subscription" ALTER COLUMN "endDate" SET DEFAULT (NOW() + INTERVAL '30 days');
