/*
  Warnings:

  - A unique constraint covering the columns `[connection_id]` on the table `Chat` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Chat_connection_id_key" ON "Chat"("connection_id");
