-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Records" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "server_id" TEXT NOT NULL,
    "discord_id" TEXT,
    "discord_username" TEXT,
    "wallet_address" TEXT,
    "is_redirected" BOOLEAN NOT NULL DEFAULT false,
    "is_verified" BOOLEAN NOT NULL DEFAULT false,
    "completed" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_Records" ("discord_id", "discord_username", "id", "is_redirected", "is_verified", "server_id", "wallet_address") SELECT "discord_id", "discord_username", "id", "is_redirected", "is_verified", "server_id", "wallet_address" FROM "Records";
DROP TABLE "Records";
ALTER TABLE "new_Records" RENAME TO "Records";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
