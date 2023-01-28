-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_UserSocket" (
    "user_socket_id" TEXT NOT NULL PRIMARY KEY,
    "socket_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    CONSTRAINT "UserSocket_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_UserSocket" ("socket_id", "user_id", "user_socket_id") SELECT "socket_id", "user_id", "user_socket_id" FROM "UserSocket";
DROP TABLE "UserSocket";
ALTER TABLE "new_UserSocket" RENAME TO "UserSocket";
CREATE UNIQUE INDEX "UserSocket_user_id_key" ON "UserSocket"("user_id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
