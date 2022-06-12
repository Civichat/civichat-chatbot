-- CreateTable
CREATE TABLE "apply_locations" (
    "service_id" TEXT NOT NULL,
    "application_lcoation" TEXT NOT NULL,

    CONSTRAINT "apply_locations_pkey" PRIMARY KEY ("service_id","application_lcoation")
);

-- CreateTable
CREATE TABLE "apply_postal_address" (
    "service_id" TEXT NOT NULL,
    "postal_address" TEXT NOT NULL,

    CONSTRAINT "apply_postal_address_pkey" PRIMARY KEY ("service_id","postal_address")
);

-- CreateTable
CREATE TABLE "data_sources" (
    "id" SERIAL NOT NULL,
    "org_id" INTEGER NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "type" VARCHAR(255) NOT NULL,
    "encrypted_options" BYTEA NOT NULL,
    "queue_name" VARCHAR(255) NOT NULL,
    "scheduled_queue_name" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "data_sources_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "documents" (
    "service_id" TEXT NOT NULL,
    "document_name" TEXT NOT NULL,
    "document_url" TEXT,

    CONSTRAINT "documents_pkey" PRIMARY KEY ("service_id","document_name")
);

-- CreateTable
CREATE TABLE "japan" (
    "service_id" VARCHAR(255) NOT NULL,
    "service_number" TEXT,
    "origin_id" TEXT,
    "alteration_flag" TEXT,
    "provider" TEXT,
    "prefecture_id" TEXT,
    "city_id" TEXT,
    "name" TEXT,
    "abstract" TEXT,
    "provisions" TEXT,
    "target" TEXT,
    "how_to_apply" TEXT,
    "application_start_date" TEXT,
    "application_close_date" TEXT,
    "detail_url" TEXT,
    "contact" TEXT,
    "information_release_date" TEXT,
    "tags" TEXT,
    "theme" TEXT,
    "category" TEXT,
    "person_type" TEXT,
    "entity_type" TEXT,
    "keyword_type" TEXT,
    "issue_type" TEXT
);

-- CreateTable
CREATE TABLE "kumamoto_earthquake" (
    "service_id" VARCHAR(255) NOT NULL,
    "management_id" TEXT,
    "name" TEXT,
    "target" TEXT,
    "sub_title" TEXT,
    "priority" TEXT,
    "start_release_date" TEXT,
    "end_release_date" TEXT,
    "is_release" TEXT,
    "overview" TEXT,
    "organization" TEXT,
    "parent_system" TEXT,
    "relationship_parent_system" TEXT,
    "qualification" TEXT,
    "purpose" TEXT,
    "area" TEXT,
    "support_content" TEXT,
    "note" TEXT,
    "how_to_use" TEXT,
    "needs" TEXT,
    "documents_url" TEXT,
    "postal_address" TEXT,
    "acceptable_dates" TEXT,
    "acceptable_times" TEXT,
    "apply_url" TEXT,
    "start_application_date" TEXT,
    "end_application_date" TEXT,
    "contact" TEXT,
    "detail_url" TEXT,
    "administrative_service_category" TEXT,
    "lifestage_category" TEXT,
    "problem_category" TEXT
);

-- CreateTable
CREATE TABLE "organizations" (
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL,
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "slug" VARCHAR(255) NOT NULL,
    "settings" TEXT NOT NULL,

    CONSTRAINT "organizations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "related_system" (
    "subject_service_id" TEXT NOT NULL,
    "object_service_id" TEXT NOT NULL,
    "relationship" TEXT,

    CONSTRAINT "related_system_pkey" PRIMARY KEY ("subject_service_id","object_service_id")
);

-- CreateTable
CREATE TABLE "results" (
    "result_id" VARCHAR(255) NOT NULL,
    "result_body" TEXT NOT NULL,
    "line_id" TEXT NOT NULL,
    "src_table" TEXT NOT NULL,
    "created_at" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "seido_use_count" (
    "service_id" TEXT NOT NULL,
    "count" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "shibuya_parenting" (
    "service_id" VARCHAR(255) NOT NULL,
    "service_number" TEXT,
    "origin_id" TEXT,
    "alteration_flag" TEXT,
    "provider" TEXT,
    "prefecture_id" TEXT,
    "city_id" TEXT,
    "name" TEXT,
    "abstract" TEXT,
    "provisions" TEXT,
    "target" TEXT,
    "how_to_apply" TEXT,
    "application_start_date" TEXT,
    "application_close_date" TEXT,
    "detail_url" TEXT,
    "contact" TEXT,
    "information_release_date" TEXT,
    "tags" TEXT,
    "theme" TEXT,
    "category" TEXT,
    "person_type" TEXT,
    "entity_type" TEXT,
    "keyword_type" TEXT,
    "issue_type" TEXT
);

-- CreateTable
CREATE TABLE "shibuya_preschool" (
    "service_id" VARCHAR(255) NOT NULL,
    "prefecture_id" TEXT,
    "city_id" TEXT,
    "area" TEXT,
    "name" TEXT,
    "target_age" TEXT,
    "type_nursery_school" TEXT,
    "administrator" TEXT,
    "closed_days" TEXT,
    "playground" TEXT,
    "bringing_your_own_towel" TEXT,
    "take_out_diapers" TEXT,
    "parking" TEXT,
    "lunch" TEXT,
    "ibservation" TEXT,
    "extended_hours_childcare" TEXT,
    "allergy_friendly" TEXT,
    "admission_available" TEXT,
    "apply" TEXT,
    "detail_url" TEXT,
    "contact" TEXT,
    "information_release_date" TEXT,
    "availability_of_childcare_facilities_for_0" TEXT,
    "availability_of_childcare_facilities_for_1" TEXT,
    "availability_of_childcare_facilities_for_2" TEXT,
    "availability_of_childcare_facilities_for_3" TEXT,
    "availability_of_childcare_facilities_for_4" TEXT,
    "availability_of_childcare_facilities_for_5" TEXT,
    "location" TEXT,
    "thisyear_admission_rate_for_0" TEXT,
    "thisyear_admission_rate_for_1" TEXT,
    "thisyear_admission_rate_for_2" TEXT,
    "thisyear_admission_rate_for_3" TEXT,
    "thisyear_admission_rate_for_4" TEXT,
    "thisyear_admission_rate_for_5" TEXT,
    "thisyear_admission_point_for_0" TEXT,
    "thisyear_admission_point_for_1" TEXT,
    "thisyear_admission_point_for_2" TEXT,
    "thisyear_admission_point_for_3" TEXT,
    "thisyear_admission_point_for_4" TEXT,
    "thisyear_admission_point_for_5" TEXT,
    "lastyear_admission_rate_for_0" TEXT,
    "lastyear_admission_rate_for_1" TEXT,
    "lastyear_admission_rate_for_2" TEXT,
    "lastyear_admission_rate_for_3" TEXT,
    "lastyear_admission_rate_for_4" TEXT,
    "lastyear_admission_rate_for_5" TEXT,
    "lastyear_admission_point_for_0" TEXT,
    "lastyear_admission_point_for_1" TEXT,
    "lastyear_admission_point_for_2" TEXT,
    "lastyear_admission_point_for_3" TEXT,
    "lastyear_admission_point_for_4" TEXT,
    "lastyear_admission_point_for_5" TEXT,
    "security" TEXT,
    "baby_buggy" TEXT,
    "ibservation_detail" TEXT
);

-- CreateTable
CREATE TABLE "users" (
    "line_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "shibuya_preschool" INTEGER NOT NULL,
    "shibuya_parenting" INTEGER NOT NULL,
    "kumamoto_earthquake" INTEGER NOT NULL,
    "japan" INTEGER NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "favorite" TEXT NOT NULL
);

-- CreateIndex
CREATE INDEX "data_sources_org_id_name" ON "data_sources"("org_id", "name");

-- CreateIndex
CREATE UNIQUE INDEX "japan_service_id_key" ON "japan"("service_id");

-- CreateIndex
CREATE UNIQUE INDEX "kumamoto_earthquake_service_id_key" ON "kumamoto_earthquake"("service_id");

-- CreateIndex
CREATE UNIQUE INDEX "organizations_slug_key" ON "organizations"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "results_result_id_key" ON "results"("result_id");

-- CreateIndex
CREATE UNIQUE INDEX "seido_use_count_service_id_key" ON "seido_use_count"("service_id");

-- CreateIndex
CREATE UNIQUE INDEX "shibuya_parenting_service_id_key" ON "shibuya_parenting"("service_id");

-- CreateIndex
CREATE UNIQUE INDEX "shibuya_preschool_service_id_key" ON "shibuya_preschool"("service_id");

-- CreateIndex
CREATE UNIQUE INDEX "users_line_id_key" ON "users"("line_id");

-- AddForeignKey
ALTER TABLE "apply_locations" ADD CONSTRAINT "apply_locations_service_id_fkey1" FOREIGN KEY ("service_id") REFERENCES "kumamoto_earthquake"("service_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "apply_locations" ADD CONSTRAINT "apply_locations_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "shibuya_parenting"("service_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "apply_postal_address" ADD CONSTRAINT "apply_postal_address_service_id_fkey1" FOREIGN KEY ("service_id") REFERENCES "kumamoto_earthquake"("service_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "apply_postal_address" ADD CONSTRAINT "apply_postal_address_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "shibuya_parenting"("service_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "data_sources" ADD CONSTRAINT "data_sources_org_id_fkey" FOREIGN KEY ("org_id") REFERENCES "organizations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "documents" ADD CONSTRAINT "documents_service_id_fkey1" FOREIGN KEY ("service_id") REFERENCES "kumamoto_earthquake"("service_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "documents" ADD CONSTRAINT "documents_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "shibuya_parenting"("service_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "related_system" ADD CONSTRAINT "related_system_object_service_id_fkey1" FOREIGN KEY ("object_service_id") REFERENCES "kumamoto_earthquake"("service_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "related_system" ADD CONSTRAINT "related_system_subject_service_id_fkey1" FOREIGN KEY ("subject_service_id") REFERENCES "kumamoto_earthquake"("service_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "related_system" ADD CONSTRAINT "related_system_object_service_id_fkey" FOREIGN KEY ("object_service_id") REFERENCES "shibuya_parenting"("service_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "related_system" ADD CONSTRAINT "related_system_subject_service_id_fkey" FOREIGN KEY ("subject_service_id") REFERENCES "shibuya_parenting"("service_id") ON DELETE NO ACTION ON UPDATE NO ACTION;
