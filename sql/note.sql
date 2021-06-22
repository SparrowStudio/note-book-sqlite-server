DROP TABLE IF EXISTS "main"."note";
CREATE TABLE "main"."note" (
  "id" INTEGER NOT NULL,
  "title" TEXT,
  "created_at" DATE,
  "updated_at" DATE,
  "content" TEXT,
  "del_token" integer NOT NULL DEFAULT 0,
  PRIMARY KEY ("id")
);