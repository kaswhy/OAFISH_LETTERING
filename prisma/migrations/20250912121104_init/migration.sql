-- CreateTable
CREATE TABLE `Wish` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `plantKey` ENUM('daisy', 'rose', 'mugung', 'sunflower', 'freesia', 'susun') NOT NULL,
    `nickname` VARCHAR(10) NOT NULL,
    `phoneNumber` VARCHAR(11) NOT NULL,
    `content` VARCHAR(200) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
