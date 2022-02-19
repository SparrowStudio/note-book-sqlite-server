-- CreateTable
CREATE TABLE "block" (
    "id" TEXT NOT NULL,
    "space_id" TEXT NOT NULL,
    "version" REAL NOT NULL,
    "last_version" REAL,
    "type" TEXT NOT NULL,
    "properties" TEXT,
    "content" TEXT,
    "discussions" TEXT,
    "view_ids" TEXT,
    "collection_id" TEXT,
    "permissions" TEXT,
    "created_time" REAL,
    "last_edited_time" REAL,
    "copied_from" TEXT,
    "file_ids" TEXT,
    "ignore_block_count" INTEGER,
    "is_template" INTEGER,
    "parent_id" TEXT,
    "parent_table" TEXT,
    "alive" INTEGER NOT NULL,
    "moved" TEXT,
    "format" TEXT,
    "created_by" TEXT,
    "last_edited_by" TEXT,
    "created_by_table" TEXT,
    "created_by_id" TEXT,
    "last_edited_by_table" TEXT,
    "last_edited_by_id" TEXT,
    "content_classification" TEXT,
    "meta_user_id" TEXT NOT NULL,
    "meta_last_access_timestamp" REAL NOT NULL,
    "meta_role" TEXT,

    PRIMARY KEY ("id", "meta_user_id")
);

-- CreateTable
CREATE TABLE "collection" (
    "id" TEXT NOT NULL,
    "version" REAL NOT NULL,
    "last_version" REAL,
    "name" TEXT,
    "description" TEXT,
    "icon" TEXT,
    "cover" TEXT,
    "schema" TEXT,
    "format" TEXT,
    "parent_id" TEXT NOT NULL,
    "parent_table" TEXT NOT NULL,
    "alive" INTEGER NOT NULL,
    "file_ids" TEXT,
    "template_pages" TEXT,
    "copied_from" TEXT,
    "migrated" INTEGER,
    "space_id" TEXT NOT NULL,
    "deleted_schema" TEXT,
    "meta_user_id" TEXT NOT NULL,
    "meta_role" TEXT NOT NULL,

    PRIMARY KEY ("id", "meta_user_id")
);

-- CreateTable
CREATE TABLE "collection_view" (
    "id" TEXT NOT NULL,
    "version" REAL NOT NULL,
    "last_version" REAL,
    "type" TEXT NOT NULL,
    "name" TEXT,
    "icon" TEXT,
    "page_sort" TEXT,
    "parent_id" TEXT NOT NULL,
    "parent_table" TEXT NOT NULL,
    "alive" INTEGER NOT NULL,
    "format" TEXT,
    "query2" TEXT,
    "space_id" TEXT NOT NULL,
    "meta_user_id" TEXT NOT NULL,
    "meta_role" TEXT NOT NULL,

    PRIMARY KEY ("id", "meta_user_id")
);

-- CreateTable
CREATE TABLE "key_value_store" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "key" TEXT,
    "value" TEXT
);

-- CreateTable
CREATE TABLE "notion" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "key" ,
    "value" 
);

-- CreateTable
CREATE TABLE "notion_user" (
    "id" TEXT NOT NULL,
    "version" REAL NOT NULL,
    "last_version" REAL,
    "email" TEXT NOT NULL,
    "given_name" TEXT,
    "family_name" TEXT,
    "name" TEXT,
    "profile_photo" TEXT,
    "onboarding_completed" INTEGER,
    "mobile_onboarding_completed" INTEGER,
    "clipper_onboarding_completed" INTEGER,
    "reverify" INTEGER,
    "is_banned" INTEGER,
    "meta_user_id" TEXT NOT NULL,
    "meta_role" TEXT NOT NULL,

    PRIMARY KEY ("id", "meta_user_id")
);

-- CreateTable
CREATE TABLE "records" (
    "record_table" TEXT NOT NULL,
    "record_id" TEXT NOT NULL,
    "record_value" TEXT,
    "timestamp" DECIMAL,
    "parent_table" TEXT,
    "parent_id" TEXT,
    "importance" DECIMAL,
    "user_id" TEXT NOT NULL,
    "is_offline" BOOLEAN,
    "space_id" TEXT,

    PRIMARY KEY ("record_table", "record_id", "user_id")
);

-- CreateTable
CREATE TABLE "space" (
    "id" TEXT NOT NULL,
    "version" REAL NOT NULL,
    "last_version" REAL,
    "name" TEXT,
    "permissions" TEXT,
    "permission_groups" TEXT,
    "email_domains" TEXT,
    "pages" TEXT,
    "icon" TEXT,
    "disable_public_access" INTEGER,
    "disable_public_access_requests" INTEGER,
    "disable_guests" INTEGER,
    "disable_move_to_space" INTEGER,
    "disable_export" INTEGER,
    "disable_space_page_edits" INTEGER,
    "beta_enabled" INTEGER,
    "created_time" REAL,
    "last_edited_time" REAL,
    "deleted_by" TEXT,
    "created_by_table" TEXT,
    "created_by_id" TEXT,
    "last_edited_by_table" TEXT,
    "last_edited_by_id" TEXT,
    "admin_disable_public_access" INTEGER,
    "space_pages" TEXT,
    "plan_type" TEXT,
    "invite_link_enabled" INTEGER,
    "initial_use_cases" TEXT,
    "public_home_page" TEXT,
    "bot_settings" TEXT,
    "meta_user_id" TEXT NOT NULL,
    "meta_role" TEXT,

    PRIMARY KEY ("id", "meta_user_id")
);

-- CreateTable
CREATE TABLE "space_view" (
    "id" TEXT NOT NULL,
    "version" REAL NOT NULL,
    "last_version" REAL,
    "space_id" TEXT NOT NULL,
    "bookmarked_pages" TEXT,
    "shared_pages" TEXT,
    "visited_templates" TEXT,
    "sidebar_hidden_templates" TEXT,
    "notify_mobile" INTEGER NOT NULL,
    "notify_desktop" INTEGER NOT NULL,
    "notify_email" INTEGER NOT NULL,
    "notify_email_always" INTEGER,
    "created_getting_started" INTEGER,
    "parent_id" TEXT NOT NULL,
    "parent_table" TEXT NOT NULL,
    "alive" INTEGER NOT NULL,
    "created_onboarding_templates" INTEGER,
    "private_pages" TEXT,
    "joined" INTEGER,
    "joined_teams" TEXT,
    "meta_user_id" TEXT NOT NULL,
    "meta_role" TEXT,
    "settings" TEXT,

    PRIMARY KEY ("id", "meta_user_id")
);

-- CreateTable
CREATE TABLE "team" (
    "id" TEXT NOT NULL,
    "version" REAL NOT NULL,
    "last_version" REAL,
    "space_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "icon" TEXT,
    "created_time" REAL NOT NULL,
    "created_by_table" TEXT NOT NULL,
    "created_by_id" TEXT NOT NULL,
    "last_edited_time" REAL,
    "last_edited_by_table" TEXT,
    "last_edited_by_id" TEXT,
    "archived_by" TEXT,
    "team_pages" TEXT,
    "parent_id" TEXT NOT NULL,
    "parent_table" TEXT NOT NULL,
    "settings" TEXT,
    "is_default" INTEGER,
    "membership" TEXT,
    "permissions" TEXT,
    "meta_user_id" TEXT NOT NULL,
    "meta_role" TEXT,

    PRIMARY KEY ("id", "meta_user_id")
);

-- CreateTable
CREATE TABLE "transactions" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "user_id" TEXT,
    "space_id" TEXT,
    "operations" TEXT NOT NULL,
    "timestamp" REAL NOT NULL
);

-- CreateTable
CREATE TABLE "user_root" (
    "id" TEXT NOT NULL,
    "version" REAL NOT NULL,
    "space_views" TEXT,
    "left_spaces" TEXT,
    "space_view_pointers" TEXT,
    "deleted_email" TEXT,
    "last_version" REAL,
    "meta_user_id" TEXT NOT NULL,
    "meta_role" TEXT NOT NULL,

    PRIMARY KEY ("id", "meta_user_id")
);

-- CreateIndex
CREATE INDEX "lru_deletion_order" ON "block"("meta_last_access_timestamp");

-- CreateIndex
CREATE INDEX "block_parent_id" ON "block"("parent_id", "meta_user_id");

-- CreateIndex
Pragma writable_schema=1;
CREATE UNIQUE INDEX "sqlite_autoindex_key_value_store_1" ON "key_value_store"("key");
Pragma writable_schema=0;

-- CreateIndex
Pragma writable_schema=1;
CREATE UNIQUE INDEX "sqlite_autoindex_notion_1" ON "notion"("key");
Pragma writable_schema=0;

-- CreateIndex
CREATE INDEX "record_parent" ON "records"("parent_id", "user_id");

-- CreateIndex
CREATE INDEX "record_lru_deletion_order" ON "records"("is_offline", "importance", "timestamp");

-- CreateIndex
CREATE INDEX "transactions_user_id" ON "transactions"("user_id");
