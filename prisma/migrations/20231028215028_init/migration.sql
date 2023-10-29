-- CreateTable
CREATE TABLE "Records" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "server_id" TEXT NOT NULL,
    "discord_username" TEXT NOT NULL,
    "wallet_address" TEXT NOT NULL,
    "is_redirected" BOOLEAN NOT NULL,
    "is_verified" BOOLEAN NOT NULL
);
