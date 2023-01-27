-- CreateTable
CREATE TABLE "UserSocket" (
    "socket_id" TEXT NOT NULL PRIMARY KEY,
    "user_id" TEXT NOT NULL,
    CONSTRAINT "UserSocket_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "UserSocket_socket_id_key" ON "UserSocket"("socket_id");

-- CreateIndex
CREATE UNIQUE INDEX "UserSocket_user_id_key" ON "UserSocket"("user_id");
