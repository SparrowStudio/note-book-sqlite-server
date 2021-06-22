DROP TABLE IF EXISTS "main"."tags_type";
CREATE TABLE "main"."tags_type" (
  "name" TEXT NOT NULL,
  "color" TEXT,
  "background" TEXT,
  "description" TEXT,
  "created_at" DATE,
  "updated_at" DATE,
  PRIMARY KEY ("name")
);