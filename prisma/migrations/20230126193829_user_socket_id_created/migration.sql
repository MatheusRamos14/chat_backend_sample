/*
  Warnings:

  - The primary key for the `UserSocket` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The required column `user_socket_id` was added to the `UserSocket` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_UserSocket" (
    "user_socket_id" TEXT NOT NULL PRIMARY KEY,
    "socket_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    CONSTRAINT "UserSocket_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_UserSocket" ("socket_id", "user_id") SELECT "socket_id", "user_id" FROM "UserSocket";
DROP TABLE "UserSocket";
ALTER TABLE "new_UserSocket" RENAME TO "UserSocket";
CREATE UNIQUE INDEX "UserSocket_socket_id_key" ON "UserSocket"("socket_id");
CREATE UNIQUE INDEX "UserSocket_user_id_key" ON "UserSocket"("user_id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
