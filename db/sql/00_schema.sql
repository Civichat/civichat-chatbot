CREATE TABLE "apply_locations" (
  "service_id" text,
  "application_lcoation" text,
  PRIMARY KEY ("service_id", "application_lcoation")
);

CREATE TABLE "apply_postal_address" (
  "service_id" text,
  "postal_address" text,
  PRIMARY KEY ("service_id", "postal_address")
);

CREATE TABLE "documents" (
  "service_id" text,
  "document_name" text,
  "document_url" text,
  PRIMARY KEY ("service_id", "document_name")
);

CREATE TABLE "related_system" (
  "subject_service_id" text,
  "object_service_id" text,
  "relationship" text,
  PRIMARY KEY ("subject_service_id", "object_service_id")
);

CREATE TABLE "shibuya_parenting" (
  "id" serial PRIMARY KEY,
  "service_id" character varying(255) NOT NULL UNIQUE UNIQUE UNIQUE,
  "service_number" text,
  "origin_id" text,
  "alteration_flag" text,
  "provider" text,
  "prefecture_id" text,
  "city_id" text,
  "name" text,
  "abstract" text,
  "provisions" text,
  "target" text,
  "how_to_apply" text,
  "application_start_date" text,
  "application_close_date" text,
  "detail_url" text,
  "contact" text,
  "information_release_date" text,
  "tags" text,
  "theme" text,
  "category" text,
  "person_type" text,
  "entity_type" text,
  "keyword_type" text,
  "issue_type" text
);

CREATE TABLE "japan" (
  "id" serial PRIMARY KEY,
  "service_id" character varying(255) NOT NULL UNIQUE UNIQUE UNIQUE,
  "service_number" text,
  "origin_id" text,
  "alteration_flag" text,
  "provider" text,
  "prefecture_id" text,
  "city_id" text,
  "name" text,
  "abstract" text,
  "provisions" text,
  "target" text,
  "how_to_apply" text,
  "application_start_date" text,
  "application_close_date" text,
  "detail_url" text,
  "contact" text,
  "information_release_date" text,
  "tags" text,
  "theme" text,
  "category" text,
  "person_type" text,
  "entity_type" text,
  "keyword_type" text,
  "issue_type" text
);

CREATE TABLE "kumamoto_earthquake" (
  "id" serial PRIMARY KEY,
  "service_id" character varying(255) NOT NULL UNIQUE UNIQUE UNIQUE,
  "management_id" text,
  "name" text,
  "target" text,
  "sub_title" text,
  "priority" text,
  "start_release_date" text,
  "end_release_date" text,
  "is_release" text,
  "overview" text,
  "organization" text,
  "parent_system" text,
  "relationship_parent_system" text,
  "qualification" text,
  "purpose" text,
  "area" text,
  "support_content" text,
  "note" text,
  "how_to_use" text,
  "needs" text,
  "documents_url" text,
  "postal_address" text,
  "acceptable_dates" text,
  "acceptable_times" text,
  "apply_url" text,
  "start_application_date" text,
  "end_application_date" text,
  "contact" text,
  "detail_url" text,
  "administrative_service_category" text,
  "lifestage_category" text,
  "problem_category" text
);

CREATE TABLE "shibuya_preschool" (
  "id" serial PRIMARY KEY,
  "service_id" character varying(255) NOT NULL UNIQUE UNIQUE UNIQUE,
  "prefecture_id" text,
  "city_id" text,
  "area" text,
  "name" text,
  "target_age" text,
  "type_nursery_school" text,
  "administrator" text,
  "closed_days" text,
  "playground" text,
  "bringing_your_own_towel" text,
  "take_out_diapers" text,
  "parking" text,
  "lunch" text,
  "ibservation" text,
  "extended_hours_childcare" text,
  "allergy_friendly" text,
  "admission_available" text,
  "apply" text,
  "detail_url" text,
  "contact" text,
  "information_release_date" text,
  "availability_of_childcare_facilities_for_0" text,
  "availability_of_childcare_facilities_for_1" text,
  "availability_of_childcare_facilities_for_2" text,
  "availability_of_childcare_facilities_for_3" text,
  "availability_of_childcare_facilities_for_4" text,
  "availability_of_childcare_facilities_for_5" text,
  "location" text,
  "thisyear_admission_rate_for_0" text,
  "thisyear_admission_rate_for_1" text,
  "thisyear_admission_rate_for_2" text,
  "thisyear_admission_rate_for_3" text,
  "thisyear_admission_rate_for_4" text,
  "thisyear_admission_rate_for_5" text,
  "thisyear_admission_point_for_0" text,
  "thisyear_admission_point_for_1" text,
  "thisyear_admission_point_for_2" text,
  "thisyear_admission_point_for_3" text,
  "thisyear_admission_point_for_4" text,
  "thisyear_admission_point_for_5" text,
  "lastyear_admission_rate_for_0" text,
  "lastyear_admission_rate_for_1" text,
  "lastyear_admission_rate_for_2" text,
  "lastyear_admission_rate_for_3" text,
  "lastyear_admission_rate_for_4" text,
  "lastyear_admission_rate_for_5" text,
  "lastyear_admission_point_for_0" text,
  "lastyear_admission_point_for_1" text,
  "lastyear_admission_point_for_2" text,
  "lastyear_admission_point_for_3" text,
  "lastyear_admission_point_for_4" text,
  "lastyear_admission_point_for_5" text,
  "security" text,
  "baby_buggy" text,
  "ibservation_detail" text
);

CREATE TABLE "users" (
  "line_id" text,
  "created_at" text
);

CREATE TABLE "results" (
  "result_id" text,
  "result_body" text,
  "line_id" text,
  "src_table" text,
  "created_at" text
);

ALTER TABLE "apply_locations"
  ADD FOREIGN KEY ("service_id") REFERENCES "shibuya_parenting" ("service_id");

ALTER TABLE "apply_postal_address"
  ADD FOREIGN KEY ("service_id") REFERENCES "shibuya_parenting" ("service_id");

ALTER TABLE "documents"
  ADD FOREIGN KEY ("service_id") REFERENCES "shibuya_parenting" ("service_id");

ALTER TABLE "related_system"
  ADD FOREIGN KEY ("subject_service_id") REFERENCES "shibuya_parenting" ("service_id");

ALTER TABLE "related_system"
  ADD FOREIGN KEY ("object_service_id") REFERENCES "shibuya_parenting" ("service_id");

ALTER TABLE "apply_locations"
  ADD FOREIGN KEY ("service_id") REFERENCES "kumamoto_earthquake" ("service_id");

ALTER TABLE "apply_postal_address"
  ADD FOREIGN KEY ("service_id") REFERENCES "kumamoto_earthquake" ("service_id");

ALTER TABLE "documents"
  ADD FOREIGN KEY ("service_id") REFERENCES "kumamoto_earthquake" ("service_id");

ALTER TABLE "related_system"
  ADD FOREIGN KEY ("subject_service_id") REFERENCES "kumamoto_earthquake" ("service_id");

ALTER TABLE "related_system"
  ADD FOREIGN KEY ("object_service_id") REFERENCES "kumamoto_earthquake" ("service_id");

ALTER TABLE "apply_locations"
  ADD FOREIGN KEY ("service_id") REFERENCES "shibuya_parenting" ("service_id");

ALTER TABLE "apply_postal_address"
  ADD FOREIGN KEY ("service_id") REFERENCES "shibuya_parenting" ("service_id");

ALTER TABLE "documents"
  ADD FOREIGN KEY ("service_id") REFERENCES "shibuya_parenting" ("service_id");

ALTER TABLE "related_system"
  ADD FOREIGN KEY ("subject_service_id") REFERENCES "shibuya_parenting" ("service_id");

ALTER TABLE "related_system"
  ADD FOREIGN KEY ("object_service_id") REFERENCES "shibuya_parenting" ("service_id");

