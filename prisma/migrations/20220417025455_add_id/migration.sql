-- AlterTable
ALTER TABLE "japan" ALTER COLUMN "service_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "japan_pkey" PRIMARY KEY ("service_id");

-- AlterTable
ALTER TABLE "kumamoto_earthquake" ALTER COLUMN "service_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "kumamoto_earthquake_pkey" PRIMARY KEY ("service_id");

-- AlterTable
ALTER TABLE "results" ALTER COLUMN "result_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "results_pkey" PRIMARY KEY ("result_id");

-- AlterTable
ALTER TABLE "seido_use_count" ADD CONSTRAINT "seido_use_count_pkey" PRIMARY KEY ("service_id");

-- AlterTable
ALTER TABLE "shibuya_parenting" ALTER COLUMN "service_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "shibuya_parenting_pkey" PRIMARY KEY ("service_id");

-- AlterTable
ALTER TABLE "shibuya_preschool" ALTER COLUMN "service_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "shibuya_preschool_pkey" PRIMARY KEY ("service_id");

-- AlterTable
ALTER TABLE "users" ADD CONSTRAINT "users_pkey" PRIMARY KEY ("line_id");
