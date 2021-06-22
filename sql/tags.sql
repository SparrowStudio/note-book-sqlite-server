CREATE TABLE IF NOT EXISTS "main"."tags" (
  "id" INTEGER NOT NULL,
  "name" TEXT,
  "note_id" INTEGER,
  "created_at" DATE,
  "updated_at" DATE,
  PRIMARY KEY ("id"),
  CONSTRAINT "note_tags" UNIQUE ("note_id" ASC, "name" ASC)
);