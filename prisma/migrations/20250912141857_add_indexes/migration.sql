-- CreateIndex
CREATE INDEX `Wish_createdAt_idx` ON `Wish`(`createdAt`);

-- CreateIndex
CREATE INDEX `Wish_nickname_createdAt_idx` ON `Wish`(`nickname`, `createdAt`);
